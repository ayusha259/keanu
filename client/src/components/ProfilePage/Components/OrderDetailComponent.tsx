import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { IRootState } from "../../../types";
import Loader from "../../extras/Loader/Loader";
import { motion } from "framer-motion";
const convertNumberToString = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const OrderDetailComponent = () => {
  const [order, setOrder] = useState<any | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const { token, loading: userLoading } = useSelector(
    (state: IRootState) => state.user
  );

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    if (!userLoading) {
      axios
        .get(`/api/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setOrder(res.data);
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
      className="profile-orderdetail"
    >
      {loading ? (
        <Loader size="small" />
      ) : (
        <>
          <div className="order-head">Order Detail</div>
          <div className="order-items-container">
            <div className="header">Items</div>
            <div className="items-list">
              {order.items.map((i: any) => (
                <div key={i._id} className="item">
                  <div className="item-title-image">
                    <div className="image">
                      <img
                        src={
                          i.product.images.length > 0
                            ? i.product.images[0].image.url
                            : ""
                        }
                        alt=""
                      />
                    </div>
                    <div className="title">
                      <div>{i.product.brand}</div>
                      <div>
                        <Link to={`/product/${i.product.slug}`}>
                          {i.product.title}
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="info">
                    <div>x{i.qty}</div>
                    <div>₹{convertNumberToString(i.price)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="shipping-info">
            <div className="header">Shipping Information</div>
            <div className="details">
              <div className="details-head">Contact Information</div>
              <div className="detail-container">
                <div className="detail">
                  <div>Name:</div>
                  <div>{`${order.shipping.first_name} ${order.shipping.last_name}`}</div>
                </div>
                <div className="detail">
                  <div>Phone:</div>
                  <div>{order.shipping.phone}</div>
                </div>
              </div>
            </div>
            <div className="details">
              <div className="details-head">Address</div>
              <div className="detail-container">{`${order.shipping.apt_no}, ${order.shipping.address}, ${order.shipping.city}, ${order.shipping.state}, ${order.shipping.country}, ${order.shipping.postalcode}`}</div>
            </div>
            <div className="details">
              <div className="details-head">Information</div>
              <div className="extra">
                <div>
                  Paid
                  <div>
                    {order.isPaid ? (
                      <i
                        style={{ color: "green" }}
                        className="fa-solid fa-circle-check"
                      ></i>
                    ) : (
                      <i
                        style={{ color: "red" }}
                        className="fa-solid fa-circle-xmark"
                      ></i>
                    )}
                  </div>
                </div>
                {order.isPaid ? <div>{getDate(order.paidAt)}</div> : ""}
              </div>
              <div className="extra">
                <div>
                  Delivered
                  <div>
                    {order.isDelivered ? (
                      <i
                        style={{ color: "green" }}
                        className="fa-solid fa-circle-check"
                      ></i>
                    ) : (
                      <i
                        style={{ color: "red" }}
                        className="fa-solid fa-circle-xmark"
                      ></i>
                    )}
                  </div>
                </div>

                {order.isDelivered ? (
                  <div>{getDate(order.delivered_at)}</div>
                ) : (
                  ""
                )}
              </div>
              <div className="extra">
                <div>Shipping Price</div>
                <div>₹{convertNumberToString(order.shippingPrice)}</div>
              </div>
              <div className="extra">
                <div>Tax Price</div>
                <div>₹{convertNumberToString(order.taxPrice)}</div>
              </div>
              <div className="extra total">
                <div>Total Price</div>
                <div>₹{convertNumberToString(order.totalPrice)}</div>
              </div>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default OrderDetailComponent;
