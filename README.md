# First Light

First List is a real-time Crypto market-moving news aggregator and ChatGPT4-Driven trading
decision bot.

## Why real-time news?

Here is the thesis. It is very hard to predict the market consistently except for a few
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

However, it is a lot easier to react to the market. You will need 2 things:

First, you need to be early enough to be aware of the event occurrence. Take a typical
M&A news as an example, the chain of information pass like this:

1. Insider (people who do the M&A deal )
2. People who are close to the Insider (i.e. their relatives)
3. Private authorized channels (e.g. government officials or stock exchange)
4. Private unauthorized channels (Hacker basically)

(Now the event is supposed to be public, like a M&A announcement in a press conference)

5. Proprietary news Channels (e.g. Bloomberg Terminal which you can't easily access)
6. Public new channels (e.g. idk like Yahoo news?)

(TODO...)

## Why Crypto?

## Why ChatGPT?

In the fast-paced world of cryptocurrency trading, timely information and strategic
decision-making are pivotal to success. My project serves as a cutting-edge tool that
addresses both aspects through two core components:

Real-Time News Scraping Engine: Leveraging modern web scraping technologies, this system
continuously monitors and aggregates headlines from a wide array of reputable financial
news sources. It is specifically tailored to detect news that could potentially influence
cryptocurrency markets, ensuring traders receive the latest market-moving information as
it happens.

AI-Generated Trading Insights: At the heart of the decision-making process is an
Artificial General Intelligence (AGI) model, similar to OpenAI's ChatGPT. This model
processes the real-time data collected by the scraping engine and evaluates its potential
impact on the crypto market. With its advanced natural language understanding
capabilities, the AGI generates actionable trading insights, empowering traders to make
informed decisions swiftly and efficiently.

By integrating these two innovative components, the system offers a robust platform for
crypto traders who seek to capitalize on market opportunities by staying ahead of news
trends and utilizing AI-augmented analysis for trading decisions.

Task List:

1. Proper logging
2. Proxy health endpoint
3. Deploy to cloud
4. Evaluate performance
5. Trade in CEX

AI Trader:

1. Subscribe to news source (e.g. Tree news)
2. Feed real-time news to AI
3. AI make trading decision and back test performance / model-tuning
4. Execute trade

Technologies:

- NodeJS
- Typescript + ts-node (esm)
- Jest