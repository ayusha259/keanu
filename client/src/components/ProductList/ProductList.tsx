import { Pagination } from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IProduct, IRootState } from "../../types";
import Loader from "../extras/Loader/Loader";
import Product from "../Product/Product";
import "./ProductList.scss";

interface IProps {
  products: IProduct[];
  count: number;
}

const ProductList = ({ products, count }: IProps) => {
  const dispatch = useDispatch();
  const { currPage } = useSelector((state: IRootState) => state.options);

  const divRef = useRef<HTMLDivElement>(null);

  const item = {
    hidden: { opacity: 0, y: 10, scale: 1.1 },
    show: { opacity: 1, y: 0, scale: 1 },
  };

  const handlePageChange = (e: React.ChangeEvent<unknown>, val: number) => {
    dispatch({
      type: "CHANGE_PAGE",
      payload: val,
    });
  };
  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: "smooth", inline: "end" });
    }
  }, [currPage]);
  return (
    <div className="mainlist-container">
      {products ? (
        <>
          {products.length === 0 ? (
            <div>Not Products</div>
          ) : (
            <>
              <div className="mainlist-header">
                <div>
                  Product Found <span>{products.length}</span>
                </div>
                <div>See More</div>
              </div>
              <div ref={divRef} className="mainlist-grid">
                {products.map((product) => (
                  <motion.div
                    variants={item}
                    initial="hidden"
                    animate="show"
                    className="product-item"
                    key={product._id}
                  >
                    <Product product={product} />
                  </motion.div>
                ))}
              </div>
              <div className="pagination-area">
                <Pagination
                  onChange={handlePageChange}
                  page={currPage}
                  color="secondary"
                  count={Math.ceil(count / 9)}
                />
              </div>
            </>
          )}
        </>
      ) : (
        <Loader size="large" />
      )}
    </div>
  );
};

export default ProductList;
