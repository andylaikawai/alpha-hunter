import { binanceApi, ftxApi, gateApi } from "./api.js";
import express from 'express'
import { main } from "./main.js";
import { log } from "./util.js";

const app = express();
const port = 3000;


app.get('/market', (req, res) => {
  ftxApi.getMarketHistory({
    t1: "MOB",
    t2: "USDT",
    from: "1651211870",
    to: "1651211930"
  })
    .then(response => {
      res.json(response)
    })
    .catch(error => {
      res.send(error)
    });
});

app.get('/download', (req, res) => {
  gateApi.getMarketHistory({})
    .then(response => {
      res.json(response)
    })
    .catch(error => {
      res.send(error)
    });
});

app.get('/fetch-listing', (req, res) => {
  binanceApi.getListingAnnouncement();
});

app.listen(port, () => {
  log(`Alpha hunter listening on port ${port}`);
  main()
});