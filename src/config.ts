export const API_THROTTLE = 0.02
export const LOG_LEVEL: 'debug' | 'info' | 'error' = 'debug'

const KUCOIN_BASE_URL = "https://api.kucoin.com/api/v1";
const GATE_BASE_URL = "https://api.gateio.ws/api/v4";
const BINANCE_BASE_URL = "https://www.binance.com/bapi/composite/v1";
export const BINANCE_LISTING_URL = `${BINANCE_BASE_URL}/public/cms/article/catalog/list/query`;
export const KUCOIN_MARKET_HISTORY_URL = `${KUCOIN_BASE_URL}/market/histories`;
export const KUCOIN_KLINE_URL = `${KUCOIN_BASE_URL}/market/candles`
export const GATE_MARKET_HISTORY_URL = `${GATE_BASE_URL}/spot/trades`;

