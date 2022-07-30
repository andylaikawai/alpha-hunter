import {gateApi} from "./api-helper.js";
import express from 'express'

const app = express();
const port = 3000;


app.get('/market', (req, res) => {
  gateApi.getMarketHistory({
    ticker1: "LDO",
    ticker2: "USDT",
    from: "1652079360",
    to: "1652079480"
  })
    .then(response => {
      res.json(response)
    })
    .catch(error => {
      res.send(error)
    });
});

// https://download.gatedata.org/spot/candlesticks/202205/LDO_USDT-202205.csv.gz
app.get('/download', (req, res) => {
  gateApi.getMarketHistory({

  })
    .then(response => {
      res.json(response)
    })
    .catch(error => {
      res.send(error)
    });
});


app.listen(port, () => {
  console.log(`Alpha hunter listening on port ${port}`)
});