import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Searchbar from '../components/Searchbar/Searchbar';
import Stock from '../components/Stock/Stock';
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
      .then((resp) => {
        console.log(resp);
        const response = resp.data;
        const newStockData = {
          id: stockName,
          currentPrice: response.c,
          difPrice: response.d,
          difInPercentPrice: response.dp,
        };
        if (response.c && response.d && response.dp) {
          setStocks([...stocks, newStockData]);
        }
      });
  };

  const MINUTE_MS = 60000;

  useEffect(() => {
    // const interval = setInterval(() => {
    //   stocks.map((everyStock) => {
    //     getStockPrice(everyStock.id);
    //   });
    // }, MINUTE_MS);
    // return () => clearInterval(interval);
  }, [stocks]);

  const removeStockHandler = (stockName) => {
    setStocks((stocks) => stocks.filter((stock) => stock.id !== stockName));
  };

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
          const { id, currentPrice, difPrice, difInPercentPrice } = newStock;
          return (
            <div key={id}>
              <Stock
                stockName={id}
                currentPrice={currentPrice}
                dif={difPrice}
                difInPercent={difInPercentPrice}
                removeStock={() => removeStockHandler(stockName)}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default StockList;
