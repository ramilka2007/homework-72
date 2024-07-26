import { NavLink } from 'react-router-dom';
import './Toolbar.css';

const Toolbar = () => {
  return (
    <nav className="navbar navbar-dark bg-body mb-4 ">
      <div className="container-fluid border-bottom d-flex justify-content-between">
        <NavLink className="navbar-brand text-black fw-bold" to="/admin">
          Turtle Pizza Admin
        </NavLink>
        <div className="links d-flex flex-row align-items-center justify-content-evenly">
          <NavLink
            className="first-link nav-link text-black fw-bold"
            to="admin/dishes"
          >
            Dishes
          </NavLink>
          <hr />
          <NavLink
            className="first-link nav-link text-black fw-bold"
            to="admin/orders"
          >
            Orders
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Toolbar;
