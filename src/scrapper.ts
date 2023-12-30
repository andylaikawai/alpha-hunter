import { binanceApi } from './api.js';
import { log } from './util.js';


export const newBinanceListing = (): void => {
  binanceApi.getListingAnnouncement()
    .then(response => {
      if (response) {
        log(`[Heartbeat] Succeed`, true)
        const latestArticle = response.articles[0];
        getListingCoinFromArticle(latestArticle)
      } else {
      }
    });
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
    log(`[Alert] New announcement found: ${latestArticle.title}`, true);
    lastArticleCode = latestArticle.code;

    const coinMatched = latestArticle.title.match(/\(([^)]+)/);
    const listingKeyword = "Will List";
    const isNewCoinListing = latestArticle.title.includes(listingKeyword)

    if (isNewCoinListing && coinMatched) {
      const coin = coinMatched[0].replace('(', '');
      log(`[Alert] New listing coin found: ${coin}`, true);

      // TODO NOW YOU CAN BUY!
    } else {
      log(`[Alert] Not a coin listing announcement`, true)
    }
  }
};