import {binanceUrls, ftxUrls, gateUrls, kuCoinUrls} from "./config.js";
import request from 'request'
import {log, logFile} from "./util.js";

const fetchFromUrl = (url) => {
  return new Promise((resolve, reject) => {
    log(`[API] Fetching: ${url}`,);
    request(url, {json: true}, (err, res, body) => {
      if (err) {
        // log(`[API] Error: ${err}`, true);
        reject(err);
      } else {
        // log(`[API] Response: ${JSON.stringify(res)}`, true);
        resolve(res)
      }
    });
  })
};

export const kuCoinApi = {
  getMarketHistory: (t1, t2 = "USDT") => {
    return fetchFromUrl(kuCoinUrls.getMarketHistoryUrl(t1, t2))
  },
  getKline: (t1, t2, startAt, endAt) => {
    return fetchFromUrl(kuCoinUrls.getKlineUrl(t1, t2, startAt, endAt))
  }
};

export const gateApi = {
  getMarketHistory: ({t1, t2 = "USDT", from, to}) => {
    return fetchFromUrl(gateUrls.getMarketHistoryUrl({t1, t2, from, to}))
  },
};

export const ftxApi = {
  getMarketHistory: ({t1, t2 = "USDT", from, to}) => {
    return fetchFromUrl(ftxUrls.getMarketHistoryUrl({t1, t2, from, to}))
  },
};

export const binanceApi = {
  getListingAnnouncement: () => {
    return fetchFromUrl(binanceUrls.getListingAnnouncementUrl());
  }
};