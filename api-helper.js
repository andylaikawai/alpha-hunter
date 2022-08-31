import {binanceUrls, ftxUrls, gateUrls, kuCoinUrls} from "./config.js";
import request from 'request'
import {log} from "./util.js";

const make_API_call = (url) => {
  return new Promise((resolve, reject) => {
    log(`[API] Fetching: ${url}`,);
    request(url, {json: true}, (err, res, body) => {
      if (err) {
        log(`[API] Error: ${err}`,);
        reject(err);
      }
      log(`[API] Response: ${JSON.stringify(res)}`,);
      resolve(res)
    });
  })
};

export const kuCoinApi = {
  getMarketHistory: (t1, t2 = "USDT") => {
    return make_API_call(kuCoinUrls.getMarketHistoryUrl(t1, t2))
  },
  getKline: (t1, t2, startAt, endAt) => {
    return make_API_call(kuCoinUrls.getKlineUrl(t1, t2, startAt, endAt))
  }
};

export const gateApi = {
  getMarketHistory: ({t1, t2 = "USDT", from, to}) => {
    return make_API_call(gateUrls.getMarketHistoryUrl({t1, t2, from, to}))
  },
};

export const ftxApi = {
  getMarketHistory: ({t1, t2 = "USDT", from, to}) => {
    return make_API_call(ftxUrls.getMarketHistoryUrl({t1, t2, from, to}))
  },
};

export const binanceApi = {
  getListingAnnouncement: () => {
    return make_API_call(binanceUrls.getListingAnnouncementUrl());
  }
};