import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './containers/Home/Home';
import AdminDishes from './containers/AdminDishes/AdminDishes';
import AdminOrders from './containers/AdminOrders/AdminOrders';
import Toolbar from './components/Toolbar/Toolbar';
import AddDish from './containers/AddDish/AddDish';
import EditDish from './containers/EditDish/EditDish';

const App = () => {
  const { pathname } = useLocation();

  return (
    <>
      {pathname === '/' ? <></> : <Toolbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDishes />} />
        <Route path="/admin/dishes" element={<AdminDishes />} />
        <Route path="/admin/dishes/add-new-dish" element={<AddDish />} />
        <Route path="/admin/dishes/edit-dish/:id" element={<EditDish />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
      </Routes>
    </>
  );
};

export default App;
