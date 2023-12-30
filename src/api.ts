import { binanceUrls, DEBUG_MODE, gateUrls, kuCoinUrls } from "./config.js";
import { ZenRows } from 'zenrows'
import { log } from './util.js';
import axios from 'axios';

const client = new ZenRows("d5e8e87cc157e5f312ba2266642c0d38061f4abd");

const fetch = async (url: string, useZenRows = false): Promise<any> => {
  // log(`[API] Fetching: ${url}`,);
  if (useZenRows) {
    return fetchWithZenRows(url)
  } else {
    return fetchBasic(url)
  }
}
const fetchWithZenRows = async (url: string): Promise<any> => {
  try {
    const { data } = await client.get(url, {});
    return data
  } catch (error: any) {
    log(`[API] Error. Message: ${error.message}`, true)
    if (error.response) {
      log(`[API] Error. Response data: ${error.response.data}`, true)
    }
  }
}

const fetchBasic = async (url: string): Promise<any> => {
  try {
    return await axios.get(url)
  } catch (error) {
    log(`[API] Error: ${error}`, true)
  }
  // log(`[Heartbeat] Error. Status code: ${res.statusCode}`, true)
};

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
    return fetch(binanceUrls.getListingAnnouncementUrl(), !DEBUG_MODE);
  }
};