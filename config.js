import {randomStr, randomIntFromInterval, shuffleArray} from "./util.js";

const KUCOIN_BASE_URL = "https://api.kucoin.com/api/v1";
const GATE_BASE_URL = "https://api.gateio.ws/api/v4";
const FTX_BASE_URL = "https://ftx.com/api";
const BINANCE_BASE_URL = "https://www.binance.com/gateway-api/v1";

export const kuCoinUrls = {
  getMarketHistoryUrl: (t1, t2) => `${KUCOIN_BASE_URL}/market/histories?symbol=${t1}-${t2}`,
  getKlineUrl: (t1, t2, startAt, endAt) => `${KUCOIN_BASE_URL}/market/candles?type=1min&symbol=${t1}-${t2}&startAt=${startAt}&endAt=${endAt}`
};

export const gateUrls = {
  getMarketHistoryUrl: ({t1, t2, from, to}) => {
    const params = `currency_pair=${t1}_${t2}&from=${from}&to=${to}`;
    return `${GATE_BASE_URL}/spot/trades?${params}`;
  }
};

export const ftxUrls = {
  getMarketHistoryUrl: ({t1, t2, from, to}) => {
    const params = `start_time=${from}&end_time=${to}`;
    return `${FTX_BASE_URL}/markets/${t1}/${t2}/trades?${params}`
  }
};

export const binanceUrls = {
  getListingAnnouncementUrl: () => {
    const randPageSize = randomIntFromInterval(1, 10);
    const randInt = Math.ceil(Math.random() * 99999999999999999999);
    const randStrLength = randomIntFromInterval(10, 20);
    const randStr = randomStr(randStrLength);
    const epochTime = Math.round(Date.now() / 1000);
    const queries = ["type=1", "catalogId=48", "pageNo=1", `pageSize=${randPageSize}`, `rnd=${epochTime}`, `${randStr}=${randInt}`];
    shuffleArray(queries);
    const params = `${queries[0]}&${queries[1]}&${queries[2]}&${queries[3]}&${queries[4]}&${queries[5]}`;

    return `${BINANCE_BASE_URL}/public/cms/article/list/query?${params}`;
  }
};

