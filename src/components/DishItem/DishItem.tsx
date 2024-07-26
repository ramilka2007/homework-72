import React from 'react';
import {Dish} from "../../types";
import {Link} from "react-router-dom";

interface Props {
  dishInfo: Dish;
}

const DishItem: React.FC<Props> = ({dishInfo}) => {
  return (
    <div className="w-100 border border-1 border-black p-3 d-flex align-items-center mb-5">
      <div className="image w-25 d-flex align-items-start">
        <img
          src={dishInfo.image}
          alt=""
          style={{ width: '125px', height: 'auto' }}
        />
      </div>
      <div className="d-flex w-100 justify-content-between align-items-center text-start text-break">
        <h1 className="w-50">{dishInfo.title}</h1>
          <div className="d-flex w-50 justify-content-between">
              <strong className="fs-3 pt-2">{dishInfo.price} KGS</strong>
              <Link to='/admin/dishes/edit-dish' className="btn fs-3 text-success">Edit</Link>
              <button className="btn fs-3 text-danger">Delete</button>
          </div>
      </div>
    </div>
  );
};

export default DishItem;
