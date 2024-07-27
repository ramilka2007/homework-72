import { useEffect } from 'react';
import { AppDispatch } from '../../app/store';
import { getOrders, orderCompleted } from '../../store/orderThunk';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Spinner from '../../components/Spinner/Spinner';
import {
  selectAllOrders,
  selectCompletingOrderLoading,
  selectFetchingOrders,
} from '../../store/orderSlice';
import { selectDishes } from '../../store/dishesSlice';
import { fetchDishes } from '../../store/dishesThunk';
import ButtonSpinner from '../../components/Spinner/ButtonSpinner';

const AdminOrders = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const navigate = useNavigate();
  const orders = useAppSelector(selectAllOrders);
  const dishes = useAppSelector(selectDishes);
  const fetchingOrders = useAppSelector(selectFetchingOrders);
  const completingOrder = useAppSelector(selectCompletingOrderLoading);

  useEffect(() => {
    if (dishes.length === 0) {
      dispatch(fetchDishes());
    } else {
      dispatch(getOrders());
    }
  }, [dispatch, dishes]);

  const mapOrdersForRender = (dishes, orders) => {
    return orders.map((order) => {
      let totalPrice = 0;
      const orderDetails = Object.entries(order.order).map(
        ([dishId, amount]) => {
          const dish = dishes.find((d) => d.id === dishId);
          totalPrice += dish.price * amount;
          return {
            id: Math.random(),
            title: dish.title,
            price: dish.price,
            image: dish.image,
            amount: amount,
          };
        },
      );
      return {
        orderId: order.id,
        totalPrice: totalPrice,
        order: orderDetails,
      };
    });
  };

  const ordersForRender = mapOrdersForRender(dishes, orders);

  const completeOrder = async (orderId: string) => {
    try {
      await dispatch(orderCompleted(orderId));
      await dispatch(getOrders());
      navigate('/admin/orders');
      toast.success('Order completed');
    } catch {
      toast.error('Could not complete order!');
    }
  };

  return orders.length > 0 ? (
    <>
      {fetchingOrders ? (
        <Spinner />
      ) : (
        <>
          {ordersForRender.map((order) => (
            <div
              className="d-flex border border-2 border-black p-4 mb-5"
              key={order.orderId}
            >
              <div className="w-50">
                {order.order.map((check) => (
                  <div key={check.id}>
                    <div className="d-flex justify-content-between align-items-center">
                      <h3>
                        {check.amount} x {check.title}
                      </h3>
                      <strong className="fs-3">
                        {check.price * check.amount} KGS
                      </strong>
                    </div>
                  </div>
                ))}
                <div className="d-flex justify-content-between align-items-center">
                  <h3>Delivery</h3>
                  <strong className="fs-3">150 KGS</strong>
                </div>
              </div>
              <div className="w-50">
                <strong className="fs-3">
                  Order total: <br /> {order.totalPrice + 150} KGS
                </strong>
                <br />
                <button
                  className="btn btn-primary"
                  onClick={() => completeOrder(order.orderId)}
                  disabled={completingOrder}
                >
                  {completingOrder && <ButtonSpinner />}
                  Complete order
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  ) : (
    <h1>No orders</h1>
  );
};

export default AdminOrders;
