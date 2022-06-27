import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "../../../types";
import DropDown from "../DropDown/DropDown";
import "./FilterBar.scss";

const FilterBar = ({
  categoriesList,
  brandsList,
  applyFilter,
  close,
  handleReset,
}: {
  categoriesList: string[];
  brandsList: string[];
  applyFilter: () => void;
  close: () => void;
  handleReset: () => void;
}) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([100, 500000]);
  const { categoryFilter, brandFilter } = useSelector(
    (state: IRootState) => state.options
  );
  const dispatch = useDispatch();

  const handleFilter = (c: string): void => {
    dispatch({ type: "UPDATE_CATEGORIES", payload: c });
  };

  const handleFilterBrand = (brand: string): void => {
    dispatch({ type: "UPDATE_BRANDS", payload: brand });
  };

  const handleApply = () => {
    applyFilter();
    close();
  };

  const handlePriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    let newList = priceRange;
    newList[idx] = Number(e.target.value);
    setPriceRange(newList);
  };

  return (
    <div className="filter-section">
      <i onClick={close} className="fa-solid fa-xmark"></i>
      <div className="filter-header">
        <span id="filter-header-heading">
          <i className="fas fa-sliders-h"></i>Search Filter
        </span>
        <DropDown
          default={true}
          className="categories-list"
          heading="Categories"
        >
          <ul>
            <li
              className={categoryFilter.length === 0 ? "active" : ""}
              onClick={() => handleFilter("")}
              key="all"
            >
              <span>All</span>
              <i className="fas fa-check-circle"></i>
            </li>
            {categoriesList?.map((c) => (
              <li
                className={categoryFilter.includes(c) ? "active" : ""}
                onClick={() => handleFilter(c)}
                key={c}
              >
                <span>{c}</span>
                <i className="fas fa-check-circle"></i>
              </li>
            ))}
          </ul>
        </DropDown>
      </div>
      <div className="filter-options">
        <DropDown default={true} heading="Price" className="filter-price">
          <div className="price-slider">
            <div id="slider-range">
              <span>₹{priceRange[0]}</span>
              <span>₹{priceRange[1]}</span>
            </div>
          </div>
          <div className="price-input">
            <input
              onChange={(e) => handlePriceChange(e, 0)}
              value={priceRange[0]}
              type="number"
            />{" "}
            {"-"}{" "}
            <input
              onChange={(e) => handlePriceChange(e, 1)}
              value={priceRange[1]}
              type="number"
            />{" "}
            ₹
          </div>
        </DropDown>
        <DropDown className="filter-brand" heading="Brand" default={false}>
          <ul>
            <li
              className={brandFilter.length === 0 ? "active" : ""}
              onClick={() => handleFilterBrand("")}
              key="all"
            >
              <i className="fas fa-check-circle"></i>
              <span>All</span>
            </li>
            {brandsList?.map((b) => (
              <li
                onClick={() => handleFilterBrand(b)}
                className={brandFilter.includes(b) ? "active" : ""}
                key={b}
              >
                <i className="fas fa-check-circle"></i>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </DropDown>
        <DropDown
          heading="Discount"
          className="filter-discount"
          default={false}
        >
          <ul>
            <li>
              <i className="fas fa-check-circle"></i>
              <span>Discount</span>
            </li>
            <li>
              <i className="fas fa-check-circle"></i>
              <span>Without Discount</span>
            </li>
          </ul>
        </DropDown>
      </div>
      <div className="interaction-btns">
        <div onClick={handleApply}>Apply</div>
        <div onClick={handleReset}>Clear</div>
      </div>
    </div>
  );
};

export default FilterBar;
