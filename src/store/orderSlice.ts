import { ApiAllOrders, Dish, OrderDish } from '../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getOrders, makeOrder, orderCompleted } from './orderThunk';

interface OrderState {
  order: OrderDish;
  totalPrice: number;
  orders: ApiAllOrders[];
  makingOrder: boolean;
  fetchingOrders: boolean;
  completingOrder: false | string;
}

const initialState: OrderState = {
  order: {},
  totalPrice: 0,
  orders: [],
  makingOrder: false,
  fetchingOrders: false,
  completingOrder: false,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addDishToOrders: (state, { payload: dish }: PayloadAction<Dish>) => {
      let copyOrder = { ...state.order };
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
    deleteDishFromCard: (state, { payload: dish }: PayloadAction<Dish>) => {
      let copyOrder = { ...state.order };
      if (dish.id) {
        if (copyOrder[dish.id] === 0) {
          delete copyOrder[dish.id];
        } else {
          copyOrder[dish.id] = copyOrder[dish.id] - 1;
          state.totalPrice -= dish.price;

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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeOrder.pending, (state: OrderState) => {
        state.makingOrder = true;
      })
      .addCase(makeOrder.fulfilled, (state: OrderState) => {
        state.makingOrder = false;
      })
      .addCase(makeOrder.rejected, (state: OrderState) => {
        state.makingOrder = false;
      });

    builder
      .addCase(getOrders.pending, (state: OrderState) => {
        state.fetchingOrders = true;
      })
      .addCase(
        getOrders.fulfilled,
        (
          state: OrderState,
          { payload: action }: PayloadAction<ApiAllOrders>,
        ) => {
          const customerOrder = action;
          const AllCustomersOrders: ApiAllOrders[{}] = [];

          if (customerOrder) {
            for (const [key, value] of Object.entries(customerOrder)) {
              let order = {
                id: key,
                order: value,
              };
              AllCustomersOrders.push(order);
            }
          }

          state.orders = AllCustomersOrders;
          state.fetchingOrders = false;
        },
      )
      .addCase(getOrders.rejected, (state: OrderState) => {
        state.fetchingOrders = false;
      });

    builder
      .addCase(
        orderCompleted.pending,
        (state: OrderState, { meta: { arg: orderId } }) => {
          state.completingOrder = orderId;
        },
      )
      .addCase(orderCompleted.fulfilled, (state: OrderState) => {
        state.completingOrder = false;
      })
      .addCase(orderCompleted.rejected, (state: OrderState) => {
        state.completingOrder = false;
      });
  },
  selectors: {
    selectOrders: (state) => state.order,
    selectTotalPrice: (state) => state.totalPrice,
    selectAllOrders: (state) => state.orders,
    selectMakingOrderLoading: (state) => state.makingOrder,
    selectFetchingOrders: (state) => state.fetchingOrders,
    selectCompletingOrderLoading: (state) => state.completingOrder,
  },
});

export const ordersReducer = orderSlice.reducer;

export const { addDishToOrders, deleteDishFromCard, clearOrder } =
  orderSlice.actions;

export const {
  selectOrders,
  selectCompletingOrderLoading,
  selectMakingOrderLoading,
  selectFetchingOrders,
  selectAllOrders,
  selectTotalPrice,
} = orderSlice.selectors;
