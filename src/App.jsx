import React, { useState, useEffect } from 'react';
import CardList from './components/CardList';

const sortByRank = (a, b) => {
  if (a.rank < b.rank) { return -1; }
  if (a.rank > b.rank) { return 1; }
  return 0;
};

const convertCoins = (data) => {
  const coins = Object.keys(data).map((id) => {
    const coin = data[id];
    const usdQuote = coin.quotes.USD;

    return {
      id: coin.id,
      symbol: coin.symbol,
      title: coin.website_slug,
      price: usdQuote.price,
      hourlyChange: usdQuote.percent_change_1h,
      dailyChange: usdQuote.percent_change_24h,
      weeklychange: usdQuote.percent_change_7d,
    };
  });
  return coins.sort(sortByRank);
};


function App() {
  const [coins, setCoins] = useState([]);
  const [index, setIndex] = useState(0);
  const [lastRefresh, setLastRefresh] = useState(null);

  useEffect(() => {
    fetch('https://api.coinmarketcap.com/v2/ticker/')
      .then(response => (response.json()))
      .then((responseJson) => {
        const { data } = responseJson;
        setCoins(convertCoins(data));
      });
  }, [lastRefresh]);

  useEffect(() => {
    const nextIndex = (index + 10 + 100) % 100;
    setTimeout(() => setIndex(nextIndex), 2000);

    if (Date.now() - lastRefresh > 60000) {
      setLastRefresh(Date.now());
    }
  });

  const coinList = coins.slice(index, index + 10);

  return (
    <React.Fragment>
      <h1>Coinmarket Cap</h1>
      <CardList coins={coinList} />
    </React.Fragment>
  );
}

export default App;
