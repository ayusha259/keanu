import React, { useState, useRef, useEffect, useCallback } from "react";
import FilterBar from "../extras/FilterBar/FilterBar";
import ProductList from "../ProductList/ProductList";
import { IProduct, IRootState } from "../../types";
import "./HomePage.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

const HomePage = () => {
  const [data, setData] = useState<{
    products: IProduct[];
    count: number;
  }>({ products: [], count: 0 });

  const [showFilterBar, setShowFilterBar] = useState<boolean>(false);
  const [filterOptions, setFilterOptions] = useState<{
    categories: string[];
    brands: string[];
  }>({
    categories: [],
    brands: [],
  });

  const navigate = useNavigate();

  const {
    categoryFilter,
    brandFilter,
    currPage,
    sortBy: sort,
  } = useSelector((state: IRootState) => state.options);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currPage]);

  const scrollContainer = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const changeSort = (e: SelectChangeEvent) => {
    dispatch({
      type: "UPDATE_SORT",
      payload: e.target.value,
    });
  };

  const fetchProducts = useCallback(
    async (type = "") => {
      let params: { page: number; categories?: string; brands?: string } = {
        page: currPage,
      };
      if (type !== "clear") {
        if (categoryFilter.length > 0) {
          params["categories"] = categoryFilter.join(",");
        }
        if (brandFilter.length > 0) {
          params["brands"] = brandFilter.join(",");
        }
      }
      try {
        const { data } = await axios.get(
          `/api/products?sort=${sort === "" ? "-avg_rating" : sort}`,
          {
            params: params,
          }
        );
        setData({ products: data["results"], count: data["count"] });
      } catch (error) {
        navigate("/notfound");
      }
    },
    [currPage, categoryFilter, brandFilter, navigate, sort]
  );

  const fetchFilterOptions = async () => {
    const { data } = await axios.get("/api/products/get_options");
    setFilterOptions({
      categories: data["categories"],
      brands: data["brands"],
    });
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currPage, sort]);
  useEffect(() => {
    fetchFilterOptions();
  }, []);

  const applyFilter = () => {
    fetchProducts();
  };

  const clearFilter = () => {
    fetchProducts("clear");
    dispatch({ type: "RESET_OPTIONS" });
    setShowFilterBar(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0 }}
      className="homepage"
    >
      {showFilterBar ? <div className="filterbar-backdrop"></div> : ""}
      <div
        className={`filterbar-container ${
          showFilterBar ? "filterbar-show" : ""
        }`}
      >
        <FilterBar
          handleReset={clearFilter}
          categoriesList={filterOptions["categories"]}
          brandsList={filterOptions["brands"]}
          applyFilter={applyFilter}
          close={() => setShowFilterBar(false)}
        />
      </div>

      <div className="homepage-content">
        <div className="content-header">
          <div
            onClick={() => setShowFilterBar(true)}
            className="filter-hamburger"
          >
            <i className="fas fa-sliders-h"></i>
          </div>
          <div className="search-container">
            <input type="text" placeholder="Search" />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <div className="sorting-container">
            <Select value={sort} label="Sort" onChange={changeSort}>
              <MenuItem value={"-created_at"}>Newest</MenuItem>
              <MenuItem value={"created_at"}>Oldest</MenuItem>
              <MenuItem value={"-avg_rating"}>Highest Rated</MenuItem>
              <MenuItem value={"avg_rating"}>Lowest Rated</MenuItem>
            </Select>
          </div>
        </div>
        <div ref={scrollContainer} className="main-content">
          <ProductList products={data.products} count={data.count} />
        </div>
      </div>
    </motion.div>
  );
};

export default HomePage;
