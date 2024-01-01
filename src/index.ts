import express from 'express'
import { main } from "./main.js";
import logger from './logger.js';

const app = express();
const port = 3000;

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


app.listen(port, () => {
  logger.info(`Alpha hunter listening on port ${port}`);
  main()
});

export { app }