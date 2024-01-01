import { binanceApi } from './api/api.js';
import logger from './logger.js';


export const newBinanceListing = async () => {
  const response = await binanceApi.getListingAnnouncement()
  if (response?.status === 200 && response?.data?.data) {
    logger.info(`[Heartbeat] Succeed`, true)
    const latestArticle = response.data.data.articles[0];
    getListingCoinFromArticle(latestArticle)
  } else if (response?.data) {
    logger.debug(`[Heartbeat] Invalid response: ${JSON.stringify(response.data)}`, true)
  }
}


let lastArticleCode: string | null = null

interface IArticle {
  code: string,
  title: string
}

/**
 * Given the latestArticle fetched from Binance, determine if it is a new coin listing
 *
 * @param latestArticle
 */
const getListingCoinFromArticle = (latestArticle: IArticle): void => {
  if (lastArticleCode !== latestArticle.code) {
    logger.info(`[Alert] New announcement found: ${latestArticle.title}`, true);
    lastArticleCode = latestArticle.code;

    const coinMatched = latestArticle.title.match(/\(([^)]+)/);
    const listingKeyword = "Will List";
    const isNewCoinListing = latestArticle.title.includes(listingKeyword)

    if (isNewCoinListing && coinMatched) {
      const coin = coinMatched[0].replace('(', '');
      logger.info(`[Alert] New listing coin found: ${coin}`, true);

      // TODO NOW YOU CAN BUY!
    } else {
      logger.info(`[Alert] Not a coin listing announcement`, true)
    }
  }
};