import {kuCoinUrls, gateUrls} from "./config.js";
import request from 'request'

const make_API_call = (url) => {
  return new Promise((resolve, reject) => {
    request(url, {json: true}, (err, res, body) => {
      if (err) reject(err);
      resolve(body)
    });
  })
};

export const kuCoinApi = {
  getMarketHistory: (ticker1, ticker2 = "USDT") => {
    return make_API_call(kuCoinUrls.getMarketHistoryUrl(ticker1, ticker2))
  },
  getKline: (ticker1, ticker2, startAt, endAt) => {
    return make_API_call(kuCoinUrls.getKlineUrl(ticker1, ticker2, startAt, endAt))
  }
};

export const gateApi = {
  getMarketHistory: ({ticker1, ticker2 = "USDT", from, to}) => {
    return make_API_call(gateUrls.getMarketHistoryUrl({ticker1, ticker2, from, to}))
  },
};