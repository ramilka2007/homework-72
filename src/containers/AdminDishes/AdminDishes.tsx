import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  selectDeleteDishLoading,
  selectDishes,
  selectFetchDishesLoading,
} from '../../store/dishesSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteDish, fetchDishes } from '../../store/dishesThunk';
import DishItem from '../../components/DishItem/DishItem';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner/Spinner';

const AdminDishes = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector(selectDishes);
  const deleteLoading = useAppSelector(selectDeleteDishLoading);
  const dishesLoading = useAppSelector(selectFetchDishesLoading);

  const removeDish = async (id: string) => {
    try {
      await dispatch(deleteDish(id));
      await dispatch(fetchDishes());
      toast.success('Dish deleted!');
    } catch {
      toast.error('Could not delete order!');
    }
  };

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center p-5">
        <h2>Dishes</h2>
        <Link to="/admin/dishes/add-new-dish" className="fs-4 text-black">
          Add new dish
        </Link>
      </div>
      <div>
        {dishesLoading ? (
          <Spinner />
        ) : (
          <>
            {dishes.map((dish) => (
              <DishItem
                key={dish.id}
                dishInfo={dish}
                onDelete={() => removeDish(dish.id)}
                deleteLoading={deleteLoading}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDishes;
