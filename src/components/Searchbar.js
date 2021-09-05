import React from 'react';
import './Searchbar.css';

const Searchbar = ({
  name,
  placeHolder,
  handleSubmit,
  inputValue,
  onChange,
}) => {
  return (
    <form className='form'>
      <input
        type='text'
        autoFocus
        id={name}
        name={name}
        placeholder={placeHolder}
        value={inputValue}
        onChange={onChange}
      />
      <button type='submit' onClick={handleSubmit}>
        Add
      </button>
    </form>
  );
};

export default Searchbar;
