import React from 'react';

const Stock = ({ stockName, currentPrice, dif, difInPercent }) => {
  return (
    <div>
      <div>{stockName}</div>
      <div>
        <div>{currentPrice}</div>
        <div>{dif}</div>
        <div>{difInPercent}</div>
      </div>
    </div>
  );
};

export default Stock;
