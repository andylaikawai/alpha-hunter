import {
  BINANCE_LISTING_URL,
  GATE_MARKET_HISTORY_URL,
  KUCOIN_KLINE_URL,
  KUCOIN_MARKET_HISTORY_URL,
} from "../config.js";
import proxyPool from './proxy/proxyPool.js';

const binanceUrls = {
  getBinanceListingAnnouncementUrl: () => {
    const queries = ["catalogId=48", "pageNo=1", `pageSize=1`];
    const params = queries.join("&")

    return `${BINANCE_LISTING_URL}?${params}`;
  }
}

const kuCoinUrls = {
  getMarketHistoryUrl: (t1, t2) => `${KUCOIN_MARKET_HISTORY_URL}?symbol=${t1}-${t2}`,
  getKlineUrl: (t1, t2, startAt, endAt) => `${KUCOIN_KLINE_URL}?type=1min&symbol=${t1}-${t2}&startAt=${startAt}&endAt=${endAt}`
};

const gateUrls = {
  getMarketHistoryUrl: ({ t1, t2, from, to }) => {
    const params = `currency_pair=${t1}_${t2}&from=${from}&to=${to}`;
    return `${GATE_MARKET_HISTORY_URL}?${params}`;
  }
};

export const kuCoinApi = {
  getMarketHistory: (t1, t2 = "USDT") => {
    return proxyPool.fetch(kuCoinUrls.getMarketHistoryUrl(t1, t2))
  },
  getKline: (t1, t2, startAt, endAt) => {
    return proxyPool.fetch(kuCoinUrls.getKlineUrl(t1, t2, startAt, endAt))
  }
};

export const gateApi = {
  getMarketHistory: ({ t1, t2 = "USDT", from, to }) => {
    return proxyPool.fetch(gateUrls.getMarketHistoryUrl({ t1, t2, from, to }))
  },
};

export const binanceApi = {
  getListingAnnouncement: (): Promise<any> => {
    return proxyPool.fetch(binanceUrls.getBinanceListingAnnouncementUrl());
  }
};
