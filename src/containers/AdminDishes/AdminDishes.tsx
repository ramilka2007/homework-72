import React from 'react';
import {Link} from "react-router-dom";

const AdminDishes = () => {
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center p-5">
                <h3>Dishes</h3>
                <Link to="/admin/dishes/add-new-dish" className="fs-3">Add new dish</Link>
            </div>
        </div>
    );
};

export default AdminDishes;