export const reducer = (state, action) => {
  if (action.type === 'SYMBOL_EXISTS') {
    return { isModalOpen: true, modalContent: 'Stock symbol already exists!' };
  }
  if (action.type === 'SYMBOL_EMPTY') {
    return { isModalOpen: true, modalContent: 'Stock symbol is empty!' };
  }
  if (action.type === 'CLOSE_MODAL') {
    return { isModalOpen: false };
  }
  throw new Error('No matching action type');
};
