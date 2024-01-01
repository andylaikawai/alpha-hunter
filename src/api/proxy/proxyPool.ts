import { PROXY_INVENTORY } from './proxyInventory.js';
import logger from '../../logger.js';

/**
 * Proxy will be blocked if there are 5 consecutive failure
 */
export class Proxy {
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
    return this._priority <= this.PRIORITY_THRESHOLD
  }
}

export class ProxyPool {
  private _pool: Array<Proxy> = PROXY_INVENTORY.map(proxy => new Proxy(proxy.host, proxy.port))

  rotateProxy(): Proxy {
    const proxy = this._pool.shift()!;
    this._pool.push(proxy);
    return proxy;
  }
}
