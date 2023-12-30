import { binanceUrls, DEBUG_MODE, ftxUrls, gateUrls, kuCoinUrls } from "./config.js";
import { ZenRows } from 'zenrows'
import request from "request";
import { log } from './util.js';

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
    const {data} = await client.get(url, {});
    return data.data
  } catch (error: any) {
    log(`[Heartbeat] Error. Message: ${error.message}`, true)
    if (error.response) {
      log(`[Heartbeat] Error. Response data: ${error.response.data}`, true)
    }
  }
}

const fetchBasic = (url: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    request(url, {json: true}, (err, res) => {
      if (err) {
        log(`[Heartbeat] Error: ${err}`, true)
        reject(err);
      } else if (res.statusCode !== 200) {
        log(`[Heartbeat] Error. Status code: ${res.statusCode}`, true)
      } else {
        resolve(res.body.data)
      }
    });
  })
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
  getMarketHistory: ({t1, t2 = "USDT", from, to}) => {
    return fetch(gateUrls.getMarketHistoryUrl({t1, t2, from, to}))
  },
};

export const binanceApi = {
  getListingAnnouncement: (): Promise<any> => {
    return fetch(binanceUrls.getListingAnnouncementUrl(), !DEBUG_MODE);
  }
};