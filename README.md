# First Light

First Light is a real-time Crypto market-moving news aggregator and ChatGPT4-Driven
trading
decision bot.

## Why real-time news?

It is very hard to _predict_ the market consistently except for a few
like Warren Buffet. 85% of money managers can’t outperform their respective benchmark
index funds like S&P500.

<details> 

<summary>

_(Why?)_

</summary>
 Because the market is what is called a "level two" chaotic system.

> - _Level one chaos is chaos that does not react to predictions about it (e.g.
    weather)... Though it is influenced by a myriad of factors, we can build computer
    models that
    take more and more of them into consideration, and produce better and better weather
    forecasts._
> - _Level two chaos is chaos that reacts to predictions about it and therefore can never
    be predicted accurately (e.g. markets)... What will happen if we develop a computer
    program that forecasts with 100 percent accuracy the price of oil tomorrow? The price
    of oil will immediately react to the forecast, which would consequently fail to
    materialise_
>
> [Adapted from Yuval Noah Harari’s ‘Sapiens’, p.267f]
</details>

However, it is a lot easier to _react_ to the market. We will need 2 things:

First, we need to be _early enough_ to be aware of the event occurrence. Take a typical
M&A news as an example, the chain of information pass like this:

1. Insider (people who do the M&A deal )
2. People who are close to the Insider (i.e. their relatives)
3. Private authorized channels (e.g. government officials or stock exchange)
4. Private unauthorized channels (Hacker basically)

(Now the event is supposed to be public, like a M&A announcement in a press conference)

5. Proprietary news Channels (e.g. Bloomberg Terminal which we can't easily access)
6. Public news channels (e.g. Social media like Twitter, traditional media like
   Cointelegraph)

It is considered _early enough_ if beat 99% of the public at step 6 which is a relatively
easier to solve. Since all public news channels are online channels, this is a solvable
computational problem. Specifically, it is a competition of web scrappers so we need to be
an expert in this area.

Second, we need to react _fast_ enough and _accurate_ enough to the event.

## Why Crypto?

We need a less competitive yet highly liquid market. (TODO)

## Why ChatGPT?

Because it is more important to react fast enough than right enough. It doesn't take a
genius to understand what a below-expectation CPI means for the Bitcoin price (TODO give
sample prompt and resposne). However, it takes a mathematically strong, unbiased,
principled trader to be place a correct order on the correct asset with a correct risk
exposure. It is reasonable to expect ChatGPT4 to be able to beat the majority of new
traders in these areas.

(TODO)

## What is "First Light"

## Technologies:

- NodeJS
- Typescript + ts-node (esm)
- Jest

## TODO List:

1. Proxy health endpoint
2. Deploy to cloud
3. Evaluate scrapper performance
4. Trade in CEX

AI Trader:
1. Subscribe to news source (e.g. Tree news)
2. Feed real-time news to AI
3. AI make trading decision
4. Execute trade in CEX

