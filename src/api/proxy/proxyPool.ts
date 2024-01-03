import { PROXY_INVENTORY } from './proxyInventory.js';
import logger from '../../logger.js';
import axios from 'axios';

/**
 * Proxy will be blocked if there are 5 consecutive failure
 */
class Proxy {
  private INITIAL_PRIORITY = 0
  private PRIORITY_THRESHOLD = -5

  private _successCount = 0
  private _failCount = 0

  private _priority: number
  inUse: boolean = false
  host: string
  port: number

  constructor(host: string, port: number) {
    this.host = host
    this.port = port
    this._priority = this.INITIAL_PRIORITY
  }

  rankUp() {
    this._priority += 1
    this._successCount += 1
  }

  rankDown() {
    this._priority -= 1
    this._failCount += 1
    if (this.isBlocked()) {
      logger.debug(`[Proxy] Blocked proxy ${this.host}. Success count: ${this._successCount}. Failed count: ${this._failCount}`, true)
    }
  }

  isBlocked(): boolean {
    return this._priority <= this.PRIORITY_THRESHOLD // 5 consecutive failure
      && (this._successCount === 0 || this._successCount / this._failCount <= .2) // less than 10% successful rate
  }

  async fetch(url: string) {
    const startTime = performance.now();
    this.inUse = true
    try {
      logger.debug(`[Proxy] Sending request with proxy ${this.host}:${this.port}`, true)
      const proxyConfig = {
        host: this.host,
        port: this.port,
        protocol: 'http'
      }
      const response = await axios.get(url, { headers, proxy: proxyConfig })
      if (response?.data) {
        this.rankUp()
      } else {
        this.rankDown()
      }

      const endTime = performance.now();
      logger.debug(`[Proxy] Response received in ${endTime - startTime}ms.`)
      return response
    } catch (error) {
      const endTime = performance.now();
      logger.debug(`[Proxy] Error received in ${endTime - startTime}ms. ${error}`)
      this.rankDown()
    } finally {
      this.inUse = false

    }
  }
}

const headers = {
  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
  "Accept-Encoding": "gzip, deflate, br",
  "Accept-Language": "en-US,en;q=0.9,zh-TW;q=0.8,zh;q=0.7,zh-CN;q=0.6",
  "Cache-Control": "no-cache",
  "Dnt": "1",
  "Sec-Ch-Ua": `"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"`,
  "Sec-Ch-Ua-Mobile": "?0",
  "Sec-Ch-Ua-Platform": "macOS",
  "Sec-Fetch-Dest": "empty",
  "Sec-Fetch-Mode": "cors",
  "Sec-Fetch-Site": "same-origin",
  "Clienttype": "web"
}

type ProxyHealth = {
  inUse: number,
  blocked: number,
  idle: number
}

class ProxyPool {
  private MIN_THROTTLE_SPEED = 1
  private _pool: Array<Proxy> = PROXY_INVENTORY.map(proxy => new Proxy(proxy.host, proxy.port))
  private _currentIndex: number = 0

  private rotateProxies() {
    // Rotate the array such that the first element is moved to the end.
    this._pool.push(this._pool.shift() as Proxy);
  }

  private useProxy(): Proxy | null {
    const startIndex = this._currentIndex;
    do {
      const currentProxy = this._pool[this._currentIndex];
      this.rotateProxies();
      if (currentProxy.isBlocked() || currentProxy.inUse) {
        // try the next one.
        this._currentIndex = (this._currentIndex + 1) % this._pool.length;
      } else {
        return currentProxy;
      }
    } while (this._currentIndex !== startIndex); // Avoid infinite loop

    // checked all proxies and none are valid, return null.
    logger.debug(`Proxy pool exhausted. Health: ${JSON.stringify(this.health())}`)
    return null;
  }

  private idleProxyPool() {
    return this._pool.filter(proxy => !proxy.inUse && !proxy.isBlocked())
  }

  async fetch(url: string): Promise<any> {
    const proxy = this.useProxy()

    if (!proxy) {
      return null
    }
    return proxy.fetch(url)
  }


  health(): ProxyHealth {
    return {
      inUse: this._pool.filter(proxy => proxy.inUse).length,
      blocked: this._pool.filter(proxy => proxy.isBlocked()).length,
      idle: this.idleProxyPool().length
    }
  }

  throttleSpeed(): number {
    if (this.idleProxyPool().length === 0) {
      return this.MIN_THROTTLE_SPEED
    }
    return Math.min(this.MIN_THROTTLE_SPEED, 10 / this.idleProxyPool().length)
  }
}

const proxyPool = new ProxyPool()

export default proxyPool