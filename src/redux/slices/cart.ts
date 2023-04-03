import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import _ from "lodash";
import { RootState } from "../store";

type InitialStateType = {
  cartItems: Product[];
};

type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  qty: number;
};

const initialState: InitialStateType = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const cloneCartItems = _.cloneDeep(state.cartItems);
      const cartIndex = cloneCartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (cartIndex > -1) {
        cloneCartItems[cartIndex].qty += 1;
      } else {
        cloneCartItems.push(action.payload);
      }
      return { cartItems: cloneCartItems };
    },
    removeFromCart: (state, action) => {
      const cloneCartItems = _.cloneDeep(state.cartItems);
      const filter = cloneCartItems.filter(
        (item) => item.id !== action.payload
      );
      return { cartItems: filter };
    },
    increaseQty: (state, action) => {
      const cloneCartItems = _.cloneDeep(state.cartItems);
      const cartIndex = cloneCartItems.findIndex(
        (item) => item.id === action.payload
      );
      cloneCartItems[cartIndex].qty += 1;
      return { cartItems: cloneCartItems };
    },
    decreaseQty: (state, action) => {
      const cloneCartItems = _.cloneDeep(state.cartItems);
      const cartIndex = cloneCartItems.findIndex(
        (item) => item.id === action.payload
      );
      if (cloneCartItems[cartIndex].qty === 1) {
        const filter = cloneCartItems.filter(
          (item) => item.id !== action.payload
        );
        return { cartItems: filter };
      } else {
        cloneCartItems[cartIndex].qty -= 1;
        return { cartItems: cloneCartItems };
      }
    },
    clearAllCart: (state) => {
      return { cartItems: [] };
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearAllCart,
} = cartSlice.actions;
const { reducer } = cartSlice;
export const cartSelector = (store: RootState) => store.cartReducer;
export default reducer;
