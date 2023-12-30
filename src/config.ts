export const API_THROTTLE = 0.02

const KUCOIN_BASE_URL = "https://api.kucoin.com/api/v1";
const GATE_BASE_URL = "https://api.gateio.ws/api/v4";
const FTX_BASE_URL = "https://ftx.com/api";
const BINANCE_BASE_URL = "https://www.binance.com/bapi/composite/v1";
const BINANCE_LISTING_URL = `${BINANCE_BASE_URL}/public/cms/article/catalog/list/query`;

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
  getListingAnnouncementUrl: (): string => {
    const queries = ["catalogId=48", "pageNo=1", `pageSize=1`];
    const params = queries.join("&")

    return `${BINANCE_LISTING_URL}?${params}`;
  }
};

