import express from 'express'
import { main } from "./main.js";
import { log } from "./util.js";
import { binanceApi } from './api.js';

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

app.get('/fetch-listing', (req, res) => {
  binanceApi.getListingAnnouncement();
});

app.listen(port, () => {
  log(`Alpha hunter listening on port ${port}`);
  main()
});