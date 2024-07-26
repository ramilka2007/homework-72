import React, { useState } from 'react';
import { ApiDish, DishMutation } from '../../types';

interface FormProps {
  onSubmit: (dish: ApiDish) => void;
  existingDish?: ApiDish;
}

const emptyState: DishMutation = {
  title: '',
  price: '',
  image: '',
};

const Form: React.FC<FormProps> = ({ onSubmit, existingDish }) => {
  const initialState: DishMutation = existingDish
    ? { ...existingDish, price: existingDish.price.toString() }
    : emptyState;

  const [dish, setDish] = useState<DishMutation>(initialState);

  const changeInfo = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setDish((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onSubmit({
      ...dish,
      price: parseFloat(dish.price),
    });
  };

  return (
    <form onSubmit={onFormSubmit}>
      <h1 className="mb-5">{existingDish ? 'Edit dish' : 'Add new dish'}</h1>
      <div className="form-group d-flex justify-content-evenly mb-4">
        <h4 className="w-25">
          <label htmlFor="title">Title</label>
        </h4>
        <input
          type="text"
          name="title"
          id="title"
          required
          className="form-control w-75"
          onChange={changeInfo}
          value={dish.title}
        />
      </div>
      <div className="form-group d-flex justify-content-evenly mb-4">
        <h4 className="w-25">
          <label htmlFor="price">Price</label>
        </h4>
        <input
          type="number"
          name="price"
          id="price"
          required
          min="1"
          className="form-control w-75"
          onChange={changeInfo}
          value={dish.price}
        />
      </div>
      <div className="form-group d-flex justify-content-evenly mb-4">
        <h4 className="w-25">
          <label htmlFor="image">Image</label>
        </h4>
        <input
          type="url"
          name="image"
          id="image"
          required
          className="form-control w-75"
          onChange={changeInfo}
          value={dish.image}
        />
      </div>
      <button type="submit" className="btn btn-primary mt-2">
        {existingDish ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default Form;
