import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';
import { ApiAllOrders, OrderDish } from '../types';

export const makeOrder = createAsyncThunk<void, OrderDish>(
  'orders/add-order',
  async (cart) => {
    await axiosApi.post(`orders.json`, cart);
  },
);

export const getOrders = createAsyncThunk<ApiAllOrders, void>(
  'orders/get-order',
  async (): Promise<ApiAllOrders> => {
    const response = await axiosApi.get(`orders.json`);
    return response.data ?? [];
  },
);

export const orderCompleted = createAsyncThunk<void, string>(
  'orders/completeOrder',
  async (orderId) => {
    await axiosApi.delete('/orders/' + orderId + '.json');
  },
);
