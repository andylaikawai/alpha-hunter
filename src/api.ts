import { binanceUrls, gateUrls, kuCoinUrls } from "./config.js";
import { log } from './util.js';
import axios from 'axios';

const fetch = async (url: string): Promise<any> => {
  try {
    return await axios.get(url)
  } catch (error) {
    log(`[API] Error: ${error}`, true)
  }
}

export const kuCoinApi = {
  getMarketHistory: (t1, t2 = "USDT") => {
    return fetch(kuCoinUrls.getMarketHistoryUrl(t1, t2))
  },
  getKline: (t1, t2, startAt, endAt) => {
    return fetch(kuCoinUrls.getKlineUrl(t1, t2, startAt, endAt))
  }
};

export const gateApi = {
  getMarketHistory: ({ t1, t2 = "USDT", from, to }) => {
    return fetch(gateUrls.getMarketHistoryUrl({ t1, t2, from, to }))
  },
};

export const binanceApi = {
  getListingAnnouncement: (): Promise<any> => {
    return fetch(binanceUrls.getListingAnnouncementUrl());
  }
};