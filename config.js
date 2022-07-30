const KUCOIN_BASE_URL = "https://api.kucoin.com/api/v1";
const GATE_BASE_URL = "https://api.gateio.ws/api/v4";

export const kuCoinUrls = {
  getMarketHistoryUrl: (ticker1, ticker2) => `${KUCOIN_BASE_URL}/market/histories?symbol=${ticker1}-${ticker2}`,
  getKlineUrl: (ticker1, ticker2, startAt, endAt) => `${KUCOIN_BASE_URL}/market/candles?type=1min&symbol=${ticker1}-${ticker2}&startAt=${startAt}&endAt=${endAt}`
};

export const gateUrls = {
  getMarketHistoryUrl: ({ticker1, ticker2, from, to}) => {
    const params = `currency_pair=${ticker1}_${ticker2}&from=${from}&to=${to}`;
    return `${GATE_BASE_URL}/spot/trades?${params}`;
  }
};
