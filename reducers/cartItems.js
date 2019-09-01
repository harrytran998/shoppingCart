const cartItems = (state = [], action) => {
  let items = [...state];
  let item = action.payload;
  switch (action.type) {
    case 'ADD_TO_CART':
      if (typeof item.number === 'undefined' || item.number === 0) {
        item.number = 1;
        item.isPaySelect = false;
        item.isEditMode = false;
        items.push(item);
      } else if (item.number > 0) {
        item.number += 1;
      }
      return items;
    case 'REMOVE_FROM_CART':
      item.number = 0;
      item.isPaySelect = true;
      return state.filter(cartItem => cartItem.id !== item.id);
    case 'REMOVE_ONE_ITEM':
      if (item.number === 0) {
        return;
      } else if (item.number === 1) {
        item.number = 0;
        item.isPaySelect = false;
        return state.filter(cartItem => cartItem.id !== item.id);
      } else {
        for (var i in items) {
          if (items[i].id === item.id) {
            items[i].number -= 1;
            break; //Stop this loop, we found it!
          }
        }
      }
      return items;
    case 'SELECT_TO_PAY':
      for (var i in items) {
        if (items[i].id === item.id) {
          items[i].isPaySelect = true;
          break; //Stop this loop, we found it!
        }
      }
      return items;
    case 'CANCEL_TO_PAY':
      for (var i in items) {
        if (items[i].id === item.id) {
          items[i].isPaySelect = false;
          break; //Stop this loop, we found it!
        }
      }
      return items;
    case 'EDIT_MODE':
      for (var i in items) {
        items[i].isEditMode = true;
      }
      return items;
    case 'CANCEL_EDIT_MODE':
      for (var i in items) {
        items[i].isEditMode = false;
      }
      return items;
  }
  return items;
};

export default cartItems;
