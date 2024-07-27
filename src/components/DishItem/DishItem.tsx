import React from 'react';
import { Dish } from '../../types';
import { Link } from 'react-router-dom';
import ButtonSpinner from '../Spinner/ButtonSpinner';

interface Props {
  dishInfo: Dish;
  buttonsRemove?: boolean;
  deleteLoading?: false | string;
  onDelete?: VoidFunction;
  addDishToOrder?: VoidFunction;
}

const DishItem: React.FC<Props> = ({
  dishInfo,
  buttonsRemove,
  deleteLoading = false,
  onDelete,
  addDishToOrder,
}) => {
  return (
    <>
      {buttonsRemove ? (
        <div
          className="w-100 border border-1 border-black p-3 d-flex align-items-center mb-5"
          onClick={addDishToOrder}
        >
          <div className="image w-25 d-flex align-items-start">
            <img
              src={dishInfo.image}
              alt={dishInfo.title}
              style={{ width: 'auto', height: '125px' }}
            />
          </div>
          <div className="d-flex w-100 justify-content-between align-items-center text-start text-break">
            <h1 className="w-50">{dishInfo.title}</h1>
            <div className="d-flex w-50 justify-content-between">
              <strong className="fs-3 pt-2 ms-auto me-5">
                {dishInfo.price} KGS
              </strong>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-100 border border-1 border-black p-3 d-flex align-items-center mb-5">
          <div className="image w-25 d-flex align-items-start">
            <img
              src={dishInfo.image}
              alt={dishInfo.title}
              style={{ width: 'auto', height: '125px' }}
            />
          </div>
          <div className="d-flex w-100 justify-content-between align-items-center text-start text-break">
            <h1 className="w-50">{dishInfo.title}</h1>
            <div className="d-flex w-50 justify-content-between">
              <strong className="fs-3 pt-2">{dishInfo.price} KGS</strong>
              <Link
                to={`/admin/dishes/edit-dish/${dishInfo.id}`}
                className="btn btn-success fs-3"
              >
                Edit
              </Link>
              <button
                className="btn btn-danger fs-3"
                onClick={onDelete}
                disabled={deleteLoading}
              >
                {deleteLoading && deleteLoading === dishInfo.id && (
                  <ButtonSpinner />
                )}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DishItem;
