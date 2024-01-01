import app from './app.js';
import logger from './logger.js';
import { scrapeNewBinanceListingCoinLoop } from './api/services/scrapperService.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Alpha hunter listening on port ${PORT}`);
  scrapeNewBinanceListingCoinLoop()
});