import React from "react";
import { useData } from "../../Context/DataContext";
import styles from "./ProductOperationsSidebar.module.css";

export const ProductOperationsSidebar = () => {
  const { sortBy, dispatch, priceSlider, fastDeliveryOnly, showInventoryAll } =
    useData();
  return (
    <div className={`${styles.main}`}>
      <div className={`${styles.head}`}>Filter</div>
      <div className={`${styles.section}`}>
        <div className={`${styles.title}`}>Sort By</div>
        <div className={`${styles.input}`}>
          <input
            type="radio"
            name="sort"
            id="LOW_TO_HIGH"
            onChange={() => dispatch({ type: "SORT", payload: "LOW_TO_HIGH" })}
            checked={sortBy && sortBy === "LOW_TO_HIGH"}
          />
          <label htmlFor="LOW_TO_HIGH" className={`${styles.label}`}>
            Price - Low to High
          </label>
        </div>
        <div className={`${styles.input}`}>
          <input
            type="radio"
            name="sort"
            id="HIGH_TO_LOW"
            onChange={() => dispatch({ type: "SORT", payload: "HIGH_TO_LOW" })}
            checked={sortBy && sortBy === "HIGH_TO_LOW"}
          />
          <label htmlFor="HIGH_TO_LOW" className={`${styles.label}`}>
            Price - High to Low
          </label>
        </div>
      </div>
      <div className={`${styles.border}`}></div>
      <div className={`${styles.section}`}>
        <div className={`${styles.title}`}>Availability</div>
        <div className={`${styles.input}`}>
          <input
            type="checkbox"
            id="SHOW_OUT_OF_STOCK"
            onChange={() => dispatch({ type: "SHOW_OUT_OF_STOCK" })}
            checked={showInventoryAll}
          />
          <label htmlFor="SHOW_OUT_OF_STOCK" className={`${styles.label}`}>
            Include Out of Stock
          </label>
        </div>
      </div>
      <div className={`${styles.border}`}></div>
      <div className={`${styles.section}`}>
        <div className={`${styles.title}`}>Delivery</div>
        <div className={`${styles.input}`}>
          <input
            type="checkbox"
            id="FAST_DELIVERY_ONLY"
            onChange={() => dispatch({ type: "FAST_DELIVERY_ONLY" })}
            checked={fastDeliveryOnly}
          />
          <label htmlFor="FAST_DELIVERY_ONLY" className={`${styles.label}`}>
            Fast Delivery Only
          </label>
        </div>
      </div>
      <div className={`${styles.border}`}></div>
      <div className={`${styles.section}`}>
        <div className={`${styles.title}`}>Price Range</div>
        <div>Rs.0 - Rs.{priceSlider}</div>
        <input
          type="range"
          min="0"
          max="1000"
          step="100"
          value={priceSlider}
          onChange={(event) =>
            dispatch({ type: "PRICE_RANGE", payload: event.target.value })
          }
        />
      </div>
    </div>
  );
};
