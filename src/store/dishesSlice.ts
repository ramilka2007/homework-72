import { Dish } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchDishes } from './dishesThunk';

interface DishesState {
  dishes: Dish[];
  fetchLoading: boolean;
}

const initialState: DishesState = {
  dishes: [],
  fetchLoading: false,
};

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDishes.pending, (state: DishesState) => {
        state.fetchLoading = true;
      })
      .addCase(
        fetchDishes.fulfilled,
        (state: DishesState, { payload: dishes }) => {
          state.fetchLoading = false;
          state.dishes = dishes;
        },
      )
      .addCase(fetchDishes.rejected, (state: DishesState) => {
        state.fetchLoading = false;
      });
  },

  selectors: {
    selectDishes: (state) => state.dishes,
  },
});

export const dishesReducer = dishesSlice.reducer;
export const { selectDishes } = dishesSlice.selectors;
