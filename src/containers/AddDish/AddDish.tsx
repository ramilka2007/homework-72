import React from 'react';
import { ApiDish } from '../../types';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import DishForm from '../../components/DishForm/DishForm';
import { createDish } from '../../store/dishesThunk';
import { selectCreateDishLoading } from '../../store/dishesSlice';

const AddDish: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectCreateDishLoading);

  const onSubmit = async (dish: ApiDish) => {
    try {
      await dispatch(createDish(dish)).unwrap();
      navigate('/admin/dishes');
      toast.success('Dish created');
    } catch (error) {
      toast.error('Could not create dish!');
    }
  };

  return (
    <div className="row mt-2">
      <div className="col">
        <DishForm onSubmit={onSubmit} isLoading={isCreating} />
      </div>
    </div>
  );
};

export default AddDish;
