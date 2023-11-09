import React, { useEffect, useState } from "react";
import axios from "../../lib/axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IProduct } from "../../types";
import { useDispatch } from "react-redux";
import Rating from "@mui/material/Rating";
import Loader from "../extras/Loader/Loader";
import ImageContainer from "../extras/ImageContainer/ImageContainer";
import { motion } from "framer-motion";

import "./ProductPage.scss";
import ReviewList from "../Review/ReviewList";

const calculateDiscount = (price: number, percentage: number) => {
  const discount = price * (percentage / 100);
  return [Math.floor(price - discount), Math.floor(discount)];
};
const convertNumberToString = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ProductPage = () => {
  const [qty, setQty] = useState<number>(1);
  const [currImage, setCurrImage] = useState<number>(0);
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const price = product
    ? calculateDiscount(product.price, product.discount)
    : [0, 0];
  const fetchProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/products/${slug}`);
      setLoading(false);
      setProduct(data["product"]);
    } catch (error) {
      navigate("/notfound", { state: location });
    }
  };

  const handleQtyChange = (offset: -1 | 1) => {
    if (product) {
      if (qty >= product.countInStock || (qty <= 1 && offset === -1)) return;
      else {
        setQty(qty + offset);
      }
    }
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch({
        type: "CART_ADD_ITEM",
        payload: {
          _id: product._id,
          image: product.images.length > 0 ? product.images[0].image.url : "",
          title: product.title,
          qty: qty,
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

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleImageChange = (n: 1 | -1): void => {
    if (!product) return;
    if (currImage === product.images.length - 1 && n === 1) {
      setCurrImage(0);
    } else if (currImage === 0 && n === -1) {
      setCurrImage(product.images.length - 1);
    } else {
      setCurrImage(currImage + n);
    }
  };

  return (
    <div className="productpage">
      {product && !loading ? (
        <>
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="productpage-main"
          >
            <div className="productpage-image-container">
              <div className="image">
                <div
                  className="left-arrow"
                  onClick={() => handleImageChange(-1)}
                >
                  <i className="fa-solid fa-arrow-left"></i>
                </div>
                {product.images.length > 0 ? (
                  <ImageContainer image={product.images[currImage].image.url} />
                ) : (
                  // <ImageContainer image="media/product_1/81675XSuUoL._SL1500_.jpg" />
                  ""
                )}
                <div
                  className="right-arrow"
                  onClick={() => handleImageChange(1)}
                >
                  <i className="fa-solid fa-arrow-right"></i>
                </div>
              </div>
              <div className="images-list">
                {product.images.length > 0
                  ? product.images.map((image, idx) => (
                      <div
                        key={image.image.publid_id}
                        onClick={() => setCurrImage(idx)}
                        className={`images-list-item ${
                          idx === currImage ? "outline" : ""
                        }`}
                      >
                        <ImageContainer image={image.image.url} />
                      </div>
                    ))
                  : ""}
              </div>
            </div>
            <div className="productpage-product-container">
              <div className="productpage-product">
                <div className="productpage-product-header">
                  <div>{product.brand}</div>
                  <div>{product.title}</div>
                </div>
                <div className="productpage-product-pricing">
                  {product.countInStock === 0 ? (
                    <div
                      style={{
                        margin: "10px 0",
                        fontWeight: "600",
                        fontSize: "1.2rem",
                      }}
                    >
                      Out Of Stock
                    </div>
                  ) : (
                    <div className="productpage-qty">
                      <i
                        onClick={() => handleQtyChange(-1)}
                        className="fa-solid fa-minus"
                      ></i>
                      <span>{qty}</span>
                      <i
                        onClick={() => handleQtyChange(1)}
                        className="fa-solid fa-plus"
                      ></i>
                    </div>
                  )}
                  <div className="productpage-price">
                    {product.discount ? (
                      <>
                        <div>₹{convertNumberToString(price[0])}</div>
                        <div>₹{convertNumberToString(product.price)}</div>
                        <div>{product.discount}%</div>
                      </>
                    ) : (
                      <div>₹{product.price}</div>
                    )}
                  </div>
                </div>
                <div className="productpage-reviews">
                  <Rating
                    value={Number(product.avg_rating)}
                    readOnly={true}
                    precision={0.5}
                  />
                  <span id="review-font">{product.num_reviews} reviews</span>
                </div>
                <div className="productpage-description">
                  {product.description}
                </div>
                <div className="productpage-btns">
                  <motion.div
                    whileTap={{
                      scale: 0.9,
                    }}
                    transition={{ duration: 0, type: "spring" }}
                    style={{ userSelect: "none" }}
                    className={
                      product.countInStock === 0
                        ? "productpage-btn-disable"
                        : ""
                    }
                    onClick={handleAddToCart}
                  >
                    Add To Cart
                  </motion.div>
                  <motion.div
                    whileTap={{
                      scale: 0.9,
                    }}
                    transition={{ duration: 0, type: "spring" }}
                    style={{ userSelect: "none" }}
                    className={
                      product.countInStock === 0
                        ? "productpage-btn-disable"
                        : ""
                    }
                  >
                    Buy Now
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.section>
          <section className="productpage-reviews">
            <header>
              <h1>What our Customers</h1>
              <h3>Are Saying</h3>
            </header>
            <ReviewList productId={product._id} />
          </section>
        </>
      ) : (
        <Loader size="large" />
      )}
    </div>
  );
};

export default ProductPage;
