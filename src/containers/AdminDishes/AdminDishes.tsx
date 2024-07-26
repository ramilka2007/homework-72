import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectDishes } from '../../store/dishesSlice';
import { useAppDispatch } from '../../app/hooks';
import { fetchDishes } from '../../store/dishesThunk';
import DishItem from "../../components/DishItem/DishItem";

const AdminDishes = () => {
  const dispatch = useAppDispatch();
  const dishes = useSelector(selectDishes);

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
        {dishes.map((dish) => (
          <DishItem key={dish.id} dishInfo={dish}/>
        ))}
      </div>
    </div>
  );
};

export default AdminDishes;
