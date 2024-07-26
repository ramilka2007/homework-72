import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import { OrderDish} from "../types";

export const makeOrder = createAsyncThunk<void, OrderDish>(
    'orders/add-order',
    async (cart) => {
        await axiosApi.post(`orders.json`, cart);
    });