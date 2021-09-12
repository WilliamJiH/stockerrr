import React, { useState, useRef } from 'react';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import './Stock.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react/cjs/react.development';

const Stock = ({ stockName, currentPrice, dif, difInPercent, removeStock }) => {
  var difference = dif;
  var differencePercent = difInPercent.toFixed(2) + '%';
  if (dif > 0) {
    difference = '+' + dif;
    differencePercent = '+' + difInPercent.toFixed(2) + '%';
  }

  const [show, setShow] = useState(false);
  const isMounted = useRef(false);

  const onBtnHandler = () => {
    if (isMounted.current) {
      setShow(true);
    }
  };

  const offBtnHandler = () => {
    setTimeout(() => {
      if (show && isMounted.current) {
        setShow(false);
      }
    }, 2000);
  };

  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  });

  return (
    <div className='stock-big-container'>
      <div
        className='stock-container'
        onMouseEnter={onBtnHandler}
        onMouseOut={offBtnHandler}
        style={{
          transform: show ? 'translate(-1%, -0%)' : 'translate(+0%, -0%)',
          transitionDuration: '500ms',
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
          <button className='remove-btn' onClick={removeStock}>
            <FontAwesomeIcon icon={faMinusCircle} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Stock;
