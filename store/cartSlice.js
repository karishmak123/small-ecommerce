import { createSlice } from '@reduxjs/toolkit';

// Save cart to local storage
const saveCartToLocalStorage = (cartItems) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initial state is empty on the server
  },
  reducers: {
    addItem: (state, action) => {
      const { id, name, price, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ id, name, price, quantity });
      }

      saveCartToLocalStorage(state.items); // Save to localStorage
    },
    setCartItems: (state, action) => {
      state.items = action.payload; // Set the cart items after loading from localStorage
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveCartToLocalStorage(state.items); // Save to localStorage
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);

      if (item) {
        item.quantity = quantity;
      }

      saveCartToLocalStorage(state.items); // Save to localStorage
    },
  },
});

export const { addItem, setCartItems, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
