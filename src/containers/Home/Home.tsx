import React, {useEffect, useState} from 'react';
import { fetchDishes } from '../../store/dishesThunk';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import { selectDishes } from '../../store/dishesSlice';
import DishItem from '../../components/DishItem/DishItem';
import { NavLink } from 'react-router-dom';
import {addDishToOrders, clearOrder, deleteDishFromCard, selectCartDishes} from "../../store/cartSlice";
import {Dish} from "../../types";
import OrderModal from "../../components/OrderModal/OrderModal";
import {makeOrder} from "../../store/cartThunk";

const Home = () => {
    const dispatch = useAppDispatch();
    const dishes = useAppSelector(selectDishes);
    const total = useAppSelector(state => state.cart.totalPrice);
    const order = useAppSelector(selectCartDishes)
    const [delivery] = useState(150);
    const [modalOpen, setModalOpen] = useState(false);

    const addDish = (dish: Dish) => {
        dispatch(addDishToOrders(dish))
    };

    const deleteDish = (dish: Dish) => {
        dispatch(deleteDishFromCard(dish))
    };

    const submitOrder = () => {
        dispatch(makeOrder(order));
        dispatch(clearOrder())
        setModalOpen(false);
    };

    useEffect(() => {
        dispatch(fetchDishes());
    }, [dispatch]);

    return (
        <>
            <header>
                <nav className="navbar navbar-dark bg-body mb-4 ">
                    <div className="container-fluid border-bottom d-flex justify-content-between">
                        <NavLink className="navbar-brand text-black fw-bold" to="/admin">
                            Turtle Pizza
                        </NavLink>
                    </div>
                </nav>
            </header>
            <div className="dishes">
                {dishes.map((dish) => (
                    <DishItem
                        key={dish.id}
                        dishInfo={dish}
                        buttonsRemove={true}
                        addDishToOrder={() => addDish(dish)}
                    />
                ))}
            </div>
            <div className="order">
                <h3 className="d-inline-block me-2">Order total:</h3> <strong className="fs-3">{total} KGS</strong>
                <br/>
                <button className="btn btn-success" onClick={() => setModalOpen(true)}>Checkout</button>
            </div>

            <OrderModal open={modalOpen} handleClose={() => setModalOpen(false)}>
                <div>
                    <div>
                        {total > 0 ?
                            <>
                                {dishes.map(dish => {
                                    if (order[dish.id] !== undefined) {
                                        return (
                                            <div className="border d-flex align-items-center justify-content-between mb-4"
                                                 key={dish.id}>
                                                <p className="m-0">{dish.title} - x{order[dish.id]} / {order[dish.id] * dish.price} KGS</p>
                                                <button
                                                    className="btn-primary btn ms-4"
                                                    onClick={() => deleteDish(dish)}
                                                >X
                                                </button>
                                            </div>);
                                    }
                                })}
                            </> :
                            <p>Cart is empty.</p>
                        }
                    </div>
                    <p><b>Delivery:</b> {delivery} KGS</p>
                    <p><b>Order total:</b> {total + delivery} KGS</p>
                    <div>
                        {total > 0 ? <button className="btn btn-success" onClick={submitOrder}>Order</button> : null}
                        <button
                            onClick={() => setModalOpen(false)}
                            type="button" className="ms-3 btn btn-danger"
                        >Go back
                        </button>
                    </div>
                </div>
            </OrderModal>
        </>
    );
};

export default Home;
