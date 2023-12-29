import { newBinanceListing } from "./scrapper.js";
import { API_THROTTLE } from "./config.js";

export const main = () => {
  fetchListing();
};


/***
 * Hit binance listing announcement. Loop indefinitely per timeout in seconds
 *
 * @param timeout
 */
const fetchListing = (timeout = API_THROTTLE) => {
  const timeoutInMillisecond = timeout * 1000;
  newBinanceListing()
  setTimeout(fetchListing, timeoutInMillisecond)
};


