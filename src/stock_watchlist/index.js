import axios from 'axios';
import React, { useState, useEffect, useReducer } from 'react';
import Searchbar from '../components/Searchbar/Searchbar';
import Stock from '../components/Stock/Stock';
import { reducer } from './reducer';
import Modal from '../components/Modal/Modal';
import './stocklist.css';

const defaultState = {
  isModalOpen: false,
  modalContent: '',
};

const StockList = () => {
  const [stockName, setStockName] = useState('');
  const [stocks, setStocks] = useState([]);
  const [stockNames, setStockNames] = useState([]);
  const [isMounted, setIsMounted] = useState(true);
  const [state, dispatch] = useReducer(reducer, defaultState);

  const date = new Date();
  var currentTime = date.getHours() + ':' + date.getMinutes();
  const [time, setTime] = useState(currentTime);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (stockName && !stockNames.includes(stockName)) {
      getStockPrice(stockName);
      setStockName('');
    } else if (stockName && stockNames.includes(stockName)) {
      dispatch({ type: 'SYMBOL_EXISTS' });
      setStockName('');
    } else {
      dispatch({ type: 'SYMBOL_EMPTY' });
    }
  };

  const getStockPrice = async (stockName) => {
    await axios
      .get(
        'https://finnhub.io/api/v1/quote?symbol=' +
          stockName +
          '&token=c4qdj42ad3icc97rgt80'
      )
      .then((resp) => {
        const response = resp.data;
        const newStockData = {
          id: stockName,
          currentPrice: response.c,
          difPrice: response.d,
          difInPercentPrice: response.dp,
        };
        if (response.c && response.d && response.dp) {
          setStocks([...stocks, newStockData]);
          setStockNames([...stockNames, stockName]);
        }
      });
  };

  const getStockPriceUpdate = async (stockName) => {
    await axios
      .get(
        'https://finnhub.io/api/v1/quote?symbol=' +
          stockName +
          '&token=c4qdj42ad3icc97rgt80'
      )
      .then((resp) => {
        const response = resp.data;
        const newStockData = {
          id: stockName,
          currentPrice: response.c,
          difPrice: response.d,
          difInPercentPrice: response.dp,
        };
        console.log(newStockData);
        return newStockData;
      });
  };

  const removeStockHandler = (id) => {
    setStocks((stocks) => stocks.filter((stock) => stock.id !== id));
    setStockNames(stockNames.filter((stockName) => stockName !== id));
    setIsMounted(false);
    setIsMounted(true);
  };

  const MINUTE_MS = 60000;

  useEffect(() => {
    const interval = setInterval(() => {
      const data = stockNames.map((stockName) =>
        getStockPriceUpdate(stockName)
      );
      setStocks(data);
      setTime(currentTime);
    }, MINUTE_MS);
    return () => clearInterval(interval);
  });

  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  return (
    <>
      <div className='container'>
        <div className='head-wrapper'>
          <strong>My Stock Watchlist</strong>
          <div>Updated at {time}</div>
        </div>
        <Searchbar
          name='stockSearchBar'
          placeHolder='Search for stock symbol'
          handleSubmit={handleSubmit}
          inputValue={stockName}
          onChange={(e) => setStockName(e.target.value)}
        />
        {state.isModalOpen && (
          <Modal closeModal={closeModal} modalContent={state.modalContent} />
        )}
        {stocks.map((newStock) => {
          const { id, currentPrice, difPrice, difInPercentPrice } = newStock;
          return (
            <div key={id}>
              <Stock
                stockName={id}
                currentPrice={currentPrice}
                dif={difPrice}
                difInPercent={difInPercentPrice}
                removeStock={() => removeStockHandler(id)}
                isMounted={isMounted}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default StockList;
