import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { IProduct } from "../../types";
import ImageContainer from "../extras/ImageContainer/ImageContainer";
import { motion } from "framer-motion";
import "./Product.scss";

interface IProps {
  product: IProduct;
}

const Product = ({ product }: IProps) => {
  const calculateDiscount = (price: number, percentage: number) => {
    const discount = price * (percentage / 100);
    return [Math.floor(price - discount), Math.floor(discount)];
  };
  const convertNumberToString = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const price = calculateDiscount(product.price, product.discount);
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    if (product) {
      dispatch({
        type: "CART_ADD_ITEM",
        payload: {
          _id: product._id,
          image: product.images.length > 0 ? product.images[0].image : "",
          title: product.title,
          qty: 1,
          price: price[0],
          brand: product.brand,
          slug: product.slug,
        },
      });
      dispatch({
        type: "OPEN_MODAL",
        payload: "Item added to cart",
      });
    } else {
      return;
    }
  };

  return (
    <div className="product">
      <div className="product-header">
        <i className="fas fa-share-alt"></i>
        <i className="fas fa-heart"></i>
      </div>
      <div className="image-container">
        {product.images.length > 0 ? (
          <ImageContainer image={product.images[0].image} />
        ) : (
          ""
        )}
      </div>
      <div className="product-detail">
        <Link to={`product/${product.slug}`}>
          <div className="product-title">{product.title}</div>
        </Link>
        <div className="sub-detail">
          <span id="rating">
            <i className="fas fa-star"></i>
            {product.avg_rating || "No reviews"}
          </span>
          <div className="price">
            {product.discount ? (
              <div id="price">
                ₹{convertNumberToString(price[0])}{" "}
                <span>₹{convertNumberToString(product.price)}</span>
              </div>
            ) : (
              <span id="price">₹{product.price}</span>
            )}
          </div>
        </div>
      </div>
      <div className="product-add">
        <motion.div
          whileTap={{
            scale: 0.9,
          }}
          transition={{ duration: 0, type: "spring" }}
          style={
            product.countInStock === 0
              ? {
                  pointerEvents: "none",
                  backgroundColor: "#a469c6",
                  userSelect: "none",
                }
              : { userSelect: "none" }
          }
          onClick={handleAddToCart}
        >
          {product.countInStock === 0 ? "Out Of Stock" : "Add to Cart"}
        </motion.div>
      </div>
    </div>
  );
};

export default Product;
