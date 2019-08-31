const cartItems = (state = [], action) => {
  let items = [...state];
  let item = action.payload;
  switch (action.type) {
    case 'ADD_TO_CART':
      if (typeof item.number === 'undefined') {
        item.number = 1;
        item.isPaySelect = false;
        items.push(item);
      } else if (item.number > 0) {
        item.number += 1;
      }
      return items;
    case 'REMOVE_FROM_CART':
      return state.filter(cartItem => cartItem.id !== action.payload.id);
  }
  return state;
};

export default cartItems;
