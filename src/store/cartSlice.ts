import { Dish, OrderDish} from '../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  order: OrderDish;
  totalPrice: number;
}

const initialState: CartState = {
  order: {},
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addDishToOrders: (state, { payload: dish }: PayloadAction<Dish>) => {
      let copyOrder = {...state.order}
      if (dish.id) {
        if (copyOrder[dish.id] === undefined) {
          copyOrder[dish.id] = 1;
          state.totalPrice += dish.price;
        } else {
          copyOrder[dish.id] = copyOrder[dish.id] + 1;
          state.totalPrice += dish.price;
        }
        state.order = copyOrder;
      }
    },
    deleteDishFromCard: (state, {payload: dish}: PayloadAction<Dish>) => {
      let copyOrder = {...state.order}
      if (dish.id) {
        if (copyOrder[dish.id] === 0) {
          delete copyOrder[dish.id];
        } else {
          copyOrder[dish.id] = copyOrder[dish.id] - 1;
          state.totalPrice -= dish.price

          if (copyOrder[dish.id] === 0) {
            delete copyOrder[dish.id];
          }
        }
        state.order = copyOrder;
      }
    },
    clearOrder: (state) => {
      state.order = {};
      state.totalPrice = 0;
    }
  },
  selectors: {
    selectCartDishes: (state) => state.order,
  },
});

export const cartReducer = cartSlice.reducer;

export const { addDishToOrders, deleteDishFromCard, clearOrder } = cartSlice.actions;

export const { selectCartDishes } = cartSlice.selectors;
