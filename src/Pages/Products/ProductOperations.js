import React, { useState } from "react";
import { useData } from "../../Context/DataContext";
import styles from "./ProductOperations.module.css";

export const ProductOperations = () => {
  const { state, dispatch, priceSlider } = useData();
  const [filterHide, setFilterHide] = useState(true);
  const [sortHide, setSortHide] = useState(true);

  return (
    <div>
      <div className={`${styles.options_container}`}>
        <div
          className={`${styles.sort}`}
          onClick={() => setSortHide((val) => !val)}
        >
          Sort <span class="material-icons-outlined">sort</span>
        </div>
        {!sortHide && (
          <div
            onClick={() => setSortHide((val) => !val)}
            className={`${styles.modalCloseContainer}`}
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className={`${styles.modal} ${styles.modal_sort}`}
            >
              <h2>Sort By</h2>
              <button
                className="btn"
                onClick={() => dispatch({ type: "CLEAR_SORT" })}
              >
                Clear
              </button>
              <span
                onClick={() => setSortHide((val) => !val)}
                class="material-icons-outlined"
                style={{ cursor: "pointer" }}
              >
                close
              </span>
              <br />
              <ul>
                <li>
                  <input
                    className={`${styles.pointer}`}
                    type="radio"
                    name="sort"
                    onChange={() =>
                      dispatch({ type: "SORT", payload: "LOW_TO_HIGH" })
                    }
                    checked={state.sortBy && state.sortBy === "LOW_TO_HIGH"}
                  />
                  <label
                    className={`${styles.pointer}`}
                    onClick={() =>
                      dispatch({ type: "SORT", payload: "LOW_TO_HIGH" })
                    }
                  >
                    Price-Low to High
                  </label>
                </li>
                <li>
                  <input
                    className={`${styles.pointer}`}
                    type="radio"
                    name="sort"
                    onChange={() =>
                      dispatch({ type: "SORT", payload: "HIGH_TO_LOW" })
                    }
                    checked={state.sortBy && state.sortBy === "HIGH_TO_LOW"}
                  />
                  <label
                    className={`${styles.pointer}`}
                    onClick={() =>
                      dispatch({ type: "SORT", payload: "HIGH_TO_LOW" })
                    }
                  >
                    Price-High to Low
                  </label>
                </li>
              </ul>
            </div>
          </div>
        )}

        <div
          className={`${styles.filter}`}
          onClick={() => setFilterHide((val) => !val)}
        >
          Filter <span class="material-icons-outlined">filter_alt</span>
        </div>
        {!filterHide && (
          <div
            onClick={() => setFilterHide((val) => !val)}
            className={`${styles.modalCloseContainer}`}
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className={`${styles.modal} ${styles.modal_filter}`}
            >
              <h2>Filter By</h2>
              <span
                onClick={() => setFilterHide((val) => !val)}
                class="material-icons-outlined"
                style={{ cursor: "pointer" }}
              >
                close
              </span>

              <h4>Availability</h4>
              <ul>
                <li>
                  <input
                    className={`${styles.pointer}`}
                    type="checkbox"
                    onChange={() => dispatch({ type: "SHOW_OUT_OF_STOCK" })}
                    checked={state.showInventoryAll}
                  />
                  <label
                    className={`${styles.pointer}`}
                    onClick={() => dispatch({ type: "SHOW_OUT_OF_STOCK" })}
                  >
                    Include Out of Stock
                  </label>
                </li>
              </ul>
              <hr />
              <h4>Delivery</h4>
              <ul>
                <li>
                  <input
                    className={`${styles.pointer}`}
                    type="checkbox"
                    id="FAST_DELIVERY_ONLY"
                    onChange={() => dispatch({ type: "FAST_DELIVERY_ONLY" })}
                    checked={state.fastDeliveryOnly}
                  />
                  <label
                    htmlFor="FAST_DELIVERY_ONLY"
                    className={`${styles.pointer}`}
                    // onClick={() => dispatch({ type: "FAST_DELIVERY_ONLY" })}
                  >
                    Fast Delivery Only
                  </label>
                </li>
              </ul>
              <hr />
              <h4>Category</h4>
              <ul>
                <li>
                  <input
                    type="checkbox"
                    className={`${styles.pointer}`}
                    id="CARDIO"
                    onChange={() =>
                      dispatch({
                        type: "FILTER_BY_CATEGORY",
                        payload: "Cardio",
                      })
                    }
                    // checked={fastDeliveryOnly}
                  />
                  <label htmlFor="CARDIO" className={`${styles.pointer}`}>
                    Cardio
                  </label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    className={`${styles.pointer}`}
                    id="STRENGTH_TRAINING"
                    onChange={() =>
                      dispatch({
                        type: "FILTER_BY_CATEGORY",
                        payload: "Strength Training",
                      })
                    }
                    // checked={fastDeliveryOnly}
                  />
                  <label
                    htmlFor="STRENGTH_TRAINING"
                    className={`${styles.pointer}`}
                  >
                    Strength Training
                  </label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="ACCESSORIES"
                    className={`${styles.pointer}`}
                    onChange={() =>
                      dispatch({
                        type: "FILTER_BY_CATEGORY",
                        payload: "Accessories",
                      })
                    }
                    // checked={fastDeliveryOnly}
                  />
                  <label htmlFor="ACCESSORIES" className={`${styles.pointer}`}>
                    Accessories
                  </label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="GYM_SUPPORTS"
                    className={`${styles.pointer}`}
                    onChange={() =>
                      dispatch({
                        type: "FILTER_BY_CATEGORY",
                        payload: "Gym Supports",
                      })
                    }
                    // checked={fastDeliveryOnly}
                  />
                  <label htmlFor="GYM_SUPPORTS" className={`${styles.pointer}`}>
                    Gym Supports
                  </label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    className={`${styles.pointer}`}
                    id="GYM_SUPPORTS"
                    onChange={() =>
                      dispatch({
                        type: "FILTER_BY_CATEGORY",
                        payload: "Gym Supports",
                      })
                    }
                    // checked={fastDeliveryOnly}
                  />
                  <label htmlFor="GYM_SUPPORTS" className={`${styles.pointer}`}>
                    Gym Supports
                  </label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="GYM_ESSENTIALS"
                    className={`${styles.pointer}`}
                    onChange={() =>
                      dispatch({
                        type: "FILTER_BY_CATEGORY",
                        payload: "Gym Essentials",
                      })
                    }
                    // checked={fastDeliveryOnly}
                  />
                  <label
                    htmlFor="GYM_ESSENTIALS"
                    className={`${styles.pointer}`}
                  >
                    Gym Essentials
                  </label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="YOGA"
                    className={`${styles.pointer}`}
                    onChange={() =>
                      dispatch({ type: "FILTER_BY_CATEGORY", payload: "Yoga" })
                    }
                    // checked={fastDeliveryOnly}
                  />
                  <label htmlFor="YOGA" className={`${styles.pointer}`}>
                    Yoga
                  </label>
                </li>
              </ul>
              <hr />
              <h4>Price Range</h4>
              <div>&#8377;0 - &#8377;{priceSlider}</div>
              <ul>
                <li>
                  <input
                    className={`${styles.pointer}`}
                    type="range"
                    min="0"
                    max="1000"
                    step="100"
                    value={priceSlider}
                    onChange={(event) =>
                      dispatch({
                        type: "PRICE_RANGE",
                        payload: event.target.value,
                      })
                    }
                  />
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
