const cartItems = (state = [], { type, payload }) => {
  let items = [...state];
  let { id, number, isPaySelect, isEditMode } = payload;
  switch (type) {
    case 'ADD_TO_CART':
      if (typeof number === 'undefined' || number === 0) {
        number = 1;
        isPaySelect = false;
        isEditMode = false;
        items.push({ id, number, isPaySelect, isEditMode });
      } else if (number > 0) {
        number += 1;
      }
      return items;
    case 'REMOVE_FROM_CART':
      number = 0;
      isPaySelect = true;
      return state.filter(cartItem => cartItem.id !== id);
    case 'REMOVE_ONE_ITEM':
      if (number === 0) {
        return;
      } else if (number === 1) {
        number = 0;
        isPaySelect = false;
        return state.filter(cartItem => cartItem.id !== id);
      } else {
        for (let i in items) {
          if (items[i].id === id) {
            items[i].number -= 1;
            break; //Stop this loop, we found it!
          }
        }
      }
      return items;
    case 'SELECT_TO_PAY':
      for (let i in items) {
        if (items[i].id === id) {
          items[i].isPaySelect = true;
          break; //Stop this loop, we found it!
        }
      }
      return items;
    case 'CANCEL_TO_PAY':
      for (let i in items) {
        if (items[i].id === id) {
          items[i].isPaySelect = false;
          break; //Stop this loop, we found it!
        }
      }
      return items;
    case 'EDIT_MODE':
      for (let i in items) {
        items[i].isEditMode = true;
      }
      return items;
    case 'CANCEL_EDIT_MODE':
      for (let i in items) {
        items[i].isEditMode = false;
      }
      return items;
  }
  return items;
};

export default cartItems;
