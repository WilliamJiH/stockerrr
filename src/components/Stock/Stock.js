import React, { useState } from 'react';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import './Stock.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Stock = ({ stockName, currentPrice, dif, difInPercent }) => {
  var difference = dif;
  var differencePercent = (difInPercent * 100).toFixed(2) + '%';
  if (dif > 0) {
    difference = '+' + dif;
    differencePercent = '+' + (difInPercent * 100).toFixed(2) + '%';
  }

  const [show, setShow] = useState(false);

  const showRemoveBtn = () => {
    setShow(!show);
  };

  return (
    <div className='stock-big-container'>
      <div
        className='stock-container'
        onMouseOver={showRemoveBtn}
        style={{
          transform: show ? 'translate(-10%, -0%)' : 'translate(+0%, -0%)',
        }}
      >
        <div className='stock-left-container'>{stockName}</div>
        <div className='stock-right-container'>
          <div className='currentPrice'>{currentPrice}</div>
          <div
            className='priceChange'
            style={{ color: dif > 0 ? 'green' : 'red' }}
          >
            {difference} ({differencePercent})
          </div>
        </div>
      </div>
      <div>
        {show && (
          <button className='remove-btn'>
            <FontAwesomeIcon icon={faMinusCircle} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Stock;
