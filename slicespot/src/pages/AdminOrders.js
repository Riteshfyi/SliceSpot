import React from "react";
import AdminNav from "../components/AdminNav";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import AdminOrderCard from "../components/AdminOrderCard";
import { URL } from "../config";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";

function AdminOrders() {
  const role = useSelector((state) => state.app.role);
  const [orderData, setOrderData] = useState([]);
  const [showSpinner, setSpinner] = useState(false);

  async function fetchOrders() {
    try {
      setSpinner(true);
      const response = await axios.get(`${URL}/getallorders`,{
        withCredentials: true,
      });

      setOrderData(response.data.data.reverse());
    } catch (e) {
      setOrderData([]);
      toast.error(e.response.data.message);
    } finally {
      setSpinner(false);
    }
  }

  useEffect(() => {
    if (role === "Admin") {
      fetchOrders();
    }
  }, [role]);

  return (
    <div>
      {role !== "Admin" && <div>Forbidden Access</div>}

      {role === "Admin" && (
        <div className="min-h-screen flex flex-col">
          <AdminNav />
          {showSpinner ? (
            <div className="h-[90vh] flex justify-center items-center">
              <Spinner />
            </div>
          ) : (
            <div className="grow bg-secondary">
              {orderData.length === 0 ? (
                <div className="flex items-center justify-center mx-auto my-4 text-2xl md:text-3xl font-bold">
                  No Orders
                </div>
              ) : (
                <div className="w-[90%] md:w-[60%] flex flex-col mx-auto">
                  <p className="my-4 text-2xl md:text-3xl font-bold text-center">All Orders</p>

                  {orderData.map((order, index) => (
                    <AdminOrderCard
                      key={index}
                      order={order}
                      fetchOrders={fetchOrders}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminOrders;
