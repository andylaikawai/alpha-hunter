import { Router } from 'express';
import { getLatestBinanceArticle } from '../controllers/scrapperController.js';

const router = Router();

router.get('/', getLatestBinanceArticle);

// TODO
// app.get('/download', (req, res) => {
//   gateApi.getMarketHistory({t1: "BTC", t2: "USDT"})
//     .then(response => {
//       res.json(response)
//     })
//     .catch(error => {
//       res.send(error)
//     });
// });


export default router;