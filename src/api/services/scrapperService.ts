import { binanceApi } from '../api.js';
import logger from '../../logger.js';
import { Article } from '../types/types.js';
import { API_THROTTLE } from '../../config.js';


/***
 * Hit binance listing announcement. Loop indefinitely per timeout in seconds
 *
 * @param timeout
 */
export const scrapeNewBinanceListingCoinLoop = (timeout = API_THROTTLE) => {
  const timeoutInMillisecond = timeout * 1000;
  scrapeNewBinanceListingCoin()
  setTimeout(scrapeNewBinanceListingCoinLoop, timeoutInMillisecond)
};

export const scrapeNewBinanceListingCoin = async (): Promise<string | null> => {
  const latestArticle = await scrapeNewBinanceListingArticle()
  if (latestArticle) {
    return parseListingCoin(latestArticle)
  }
  return null
}

let lastArticleCode: string | null = null
export const scrapeNewBinanceListingArticle = async (): Promise<Article | null> => {
  const latestArticle = await scrapeLatestBinanceListingArticle()
  if (latestArticle && lastArticleCode !== latestArticle.code) {
    logger.info(`[Alert] New announcement found: ${latestArticle.title}`, true);
    lastArticleCode = latestArticle.code;
    return latestArticle
  }
  return null
}

export const scrapeLatestBinanceListingArticle = async (): Promise<Article | null> => {
  const response = await binanceApi.getListingAnnouncement()
  if (response?.status === 200 && response?.data?.data) {
    const latestArticle: Article = response.data.data.articles[0];
    logger.info(`[Scrapper] Latest Binance article: ${latestArticle.title}`, true)
    return latestArticle
  } else if (response?.data) {
    logger.debug(`[Scrapper] Invalid response: ${JSON.stringify(response.data)}`, true)
  }
  return null
}


/**
 * Given the latestArticle fetched from Binance, determine if it is a new coin listing
 *
 * @param latestArticle
 */
const parseListingCoin = (latestArticle: Article): string | null => {
  const coinMatched = latestArticle.title.match(/\(([^)]+)/);
  const listingKeyword = "Will List";
  const isNewCoinListing = latestArticle.title.includes(listingKeyword)

  if (isNewCoinListing && coinMatched) {
    const coin = coinMatched[0].replace('(', '');
    logger.info(`[Alert] New listing coin found: ${coin}`, true);
    return coin
    // TODO NOW YOU CAN BUY!
  } else {
    logger.info(`[Alert] Not a coin listing announcement`, true)
    return null
  }
};