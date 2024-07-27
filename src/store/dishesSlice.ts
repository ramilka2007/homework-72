import { ApiDish, Dish } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import {
  createDish,
  deleteDish,
  fetchDishes,
  fetchOneDish,
  updateDish,
} from './dishesThunk';

interface DishesState {
  dishes: Dish[];
  fetchLoading: boolean;
  deleteLoading: false | string;
  createLoading: boolean;
  updateLoading: boolean;
  fetchOneLoading: boolean;
  oneDish: null | ApiDish;
}

const initialState: DishesState = {
  dishes: [],
  fetchLoading: false,
  deleteLoading: false,
  createLoading: false,
  updateLoading: false,
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
      .addCase(createDish.pending, (state: DishesState) => {
        state.createLoading = true;
      })
      .addCase(createDish.fulfilled, (state: DishesState) => {
        state.createLoading = false;
      })
      .addCase(createDish.rejected, (state: DishesState) => {
        state.createLoading = false;
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

    builder
      .addCase(updateDish.pending, (state: DishesState) => {
        state.updateLoading = true;
      })
      .addCase(updateDish.fulfilled, (state: DishesState) => {
        state.updateLoading = false;
      })
      .addCase(updateDish.rejected, (state: DishesState) => {
        state.updateLoading = false;
      });

    builder
      .addCase(
        deleteDish.pending,
        (state: DishesState, { meta: { arg: dishId } }) => {
          state.deleteLoading = dishId;
        },
      )
      .addCase(deleteDish.fulfilled, (state: DishesState) => {
        state.deleteLoading = false;
      })
      .addCase(deleteDish.rejected, (state: DishesState) => {
        state.deleteLoading = false;
      });
  },

  selectors: {
    selectDishes: (state) => state.dishes,
    selectFetchDishesLoading: (state) => state.fetchLoading,
    selectDeleteDishLoading: (state) => state.deleteLoading,
    selectCreateDishLoading: (state) => state.createLoading,
    selectFetchOneDishLoading: (state) => state.fetchOneLoading,
    selectUpdateDishLoading: (state) => state.updateLoading,
    selectOneDish: (state) => state.oneDish,
  },
});

export const dishesReducer = dishesSlice.reducer;
export const {
  selectDishes,
  selectOneDish,
  selectDeleteDishLoading,
  selectFetchDishesLoading,
  selectUpdateDishLoading,
  selectFetchOneDishLoading,
  selectCreateDishLoading,
} = dishesSlice.selectors;
