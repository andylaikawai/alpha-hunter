import { binanceApi } from "./api.js";
import { log } from "./util.js";

export const newBinanceListing = () => {
  binanceApi.getListingAnnouncement()
    .then(response => {
      if (response.statusCode === 200) {
        log(`[Heartbeat] Succeed`, true)
        const latestArticle = response.body.data.articles[0];
        getListingCoinFromArticle(latestArticle)
      } else {
        log(`[Heartbeat] Error. Response code: ${response.statusCode}`, true)
      }
    });
}


let lastArticleCode = null
/**
 * Given the latestArticle fetched from Binance, determine if it is a new coin listing
 *
 * @param latestArticle
 */
const getListingCoinFromArticle = (latestArticle) => {
  if (lastArticleCode !== latestArticle.code) {
    log(`New announcement found: ${latestArticle.title}`, true);
    lastArticleCode = latestArticle.code;

    const coinMatched = latestArticle.title.match(/\(([^)]+)/);
    const listingKeyword = "Will List";
    const isNewCoinListing = latestArticle.title.includes(listingKeyword)

    if (isNewCoinListing && coinMatched) {
      const coin = coinMatched[0].replace('(', '');
      log(`New listing coin found: ${coin}`, true);

      // TODO NOW YOU CAN BUY!
    } else {
      log(`Not a coin listing announcement`, true)
    }
  }
};