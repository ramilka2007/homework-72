import { ApiDish, Dish } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchDishes, fetchOneDish } from './dishesThunk';

interface DishesState {
  dishes: Dish[];
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  oneDish: null | ApiDish;
}

const initialState: DishesState = {
  dishes: [],
  fetchLoading: false,
  fetchOneLoading: false,
  oneDish: null,
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

    builder
      .addCase(fetchOneDish.pending, (state: DishesState) => {
        state.oneDish = null;
        state.fetchOneLoading = true;
      })
      .addCase(
        fetchOneDish.fulfilled,
        (state: DishesState, { payload: apiDish }) => {
          state.oneDish = apiDish;
          state.fetchOneLoading = false;
        },
      )
      .addCase(fetchOneDish.rejected, (state: DishesState) => {
        state.fetchOneLoading = false;
      });
  },

  selectors: {
    selectDishes: (state) => state.dishes,
    selectOneDish: (state) => state.oneDish,
  },
});

export const dishesReducer = dishesSlice.reducer;
export const { selectDishes, selectOneDish } = dishesSlice.selectors;
