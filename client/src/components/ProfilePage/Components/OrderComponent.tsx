import axios from "../../../lib/axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IRootState } from "../../../types";
import { motion } from "framer-motion";

import Loader from "../../extras/Loader/Loader";

export interface IOrder {
  _id: string;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  created_at: string;
}

const convertNumberToString = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const OrderComponent = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { token, loading: userLoading } = useSelector(
    (state: IRootState) => state.user
  );

  useEffect(() => {
    setLoading(true);
    if (!userLoading) {
      axios
        .get("/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setOrders(res.data);
          setLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLoading]);

  const getDate = (d: string) => {
    const date = new Date(d);
    return date.toLocaleDateString() + "-" + date.toLocaleTimeString();
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      exit={{ y: 20, opacity: 0 }}
      className="profile-orders"
    >
      <div className="orders-head">Orders</div>
      {!loading ? (
        <div className="orders-container">
          <div className="orders-order orders-labels">
            <div>ID</div>
            <div>Created At</div>
            <div>Paid</div>
            <div>Delivered</div>
            <div>Amount</div>
          </div>
          {orders.map((order) => (
            <Link
              to={`${order._id}`}
              key={order._id}
              className="orders-order orders-order-hover"
            >
              <div>{order._id}</div>
              <div>{getDate(order.created_at as string)}</div>
              <div>
                <i
                  style={order.isPaid ? { color: "green" } : {}}
                  className="fa-solid fa-circle-check"
                ></i>
              </div>
              <div>
                <i
                  style={order.isDelivered ? { color: "green" } : {}}
                  className="fa-solid fa-circle-check"
                ></i>
              </div>
              <div>₹{convertNumberToString(order.totalPrice)}</div>
            </Link>
          ))}
        </div>
      ) : (
        <Loader size="medium" />
      )}
    </motion.div>
  );
};

export default OrderComponent;
