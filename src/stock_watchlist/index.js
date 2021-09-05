import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Searchbar from '../components/Searchbar';
import Stock from '../components/Stock';
import './stocklist.css';

const StockList = () => {
  const [stockName, setStockName] = useState('');
  const [stocks, setStocks] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (stockName) {
      console.log(stockName);
      getStockPrice(stockName);
      setStockName('');
    }
  };

  const getStockPrice = (stockName) => {
    axios
      .get(
        'https://finnhub.io/api/v1/quote?symbol=' +
          stockName +
          '&token=c4qdj42ad3icc97rgt80'
      )
      .then((response) => {
        console.log(response);
        const newStockData = {
          id: stockName,
          currentPrice: response.data.c,
          difPrice: response.data.d,
          difInPercentPrice: response.data.dp,
        };
        setStocks([...stocks, newStockData]);
        console.log(stocks);
      });
  };

  useEffect(() => {
    if (stockName) {
      getStockPrice(stockName);
      console.log(stocks);
    }
  }, []);

  return (
    <>
      <div className='container'>
        <div className='head-wrapper'>
          <strong>My Stock Watchlist</strong>
          <div>Updated at</div>
        </div>
        <Searchbar
          name='stockSearchBar'
          placeHolder='Search for stock symbol'
          handleSubmit={handleSubmit}
          inputValue={stockName}
          onChange={(e) => setStockName(e.target.value)}
        />
        {stocks.map((newStock, index) => {
          const { id, stockName, stockPrice, dif, difInPercent } = newStock;
          return (
            <div key={id}>
              <Stock
                stockName={stockName}
                stockPrice={stockPrice}
                dif={dif}
                difInPercent={difInPercent}
              />
            </div>
          );
        })}
        <Stock
          stockName={'AAPL'}
          currentPrice={154.3}
          dif={0.65}
          difInPercent={0.423}
        />
      </div>
    </>
  );
};

export default StockList;
