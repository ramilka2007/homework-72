import React from 'react';
import { ApiDish } from '../../types';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../app/hooks';
import Form from '../../components/Form/Form';
import { createDish } from '../../store/dishesThunk';

const AddDish: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
        <Form onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default AddDish;
