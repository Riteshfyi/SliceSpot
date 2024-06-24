import React, { useEffect } from 'react';
import EmptyOrder from "../components/EmptyOrder";
import Navbar from "../components/Navbar";
import { useSelector, useDispatch } from 'react-redux';
import { getOrders } from '../store/Slices/OrderSlice';
import OrderCard from "../components/OrderCard";
import Spinner from '../components/Spinner';

function Order() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.Orders);
  const showSpinner = useSelector((state) => state.orders.isLoading);
  const user = useSelector((state) => state.app.user);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <div>
      <Navbar/>
      {
        showSpinner ? (
          <div className="w-screen h-[95vh] flex items-center justify-center">
            <Spinner/>
          </div>
        ) : (
          <div>
            {!orders || !user ? (
              <EmptyOrder/>
            ) : (
              <div className="w-[90%] md:w-[60%] flex flex-col mx-auto">
                <p className="my-4 font-bold text-2xl md:text-3xl text-center">
                  Your Orders
                </p>
                <div>
                  {orders.map((order, index) => (
                    <OrderCard key={index} order={order}/>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      }
    </div>
  );
}

export default Order;
