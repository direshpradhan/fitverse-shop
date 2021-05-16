import React, { useState } from "react";
import { useData } from "../../Context/DataContext";
import styles from "./Products.module.css";

export const ProductOperations = () => {
  const {
    state,
    dispatch,
    sortBy,
    showInventoryAll,
    fastDeliveryOnly,
    priceSlider,
  } = useData();
  const [filterHide, setFilterHide] = useState(true);
  const [sortHide, setSortHide] = useState(true);

  const hide = { display: "none" };
  const visible = { display: "" };

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
                    onChange={() => dispatch({ type: "FAST_DELIVERY_ONLY" })}
                    checked={state.fastDeliveryOnly}
                  />
                  <label
                    className={`${styles.pointer}`}
                    onClick={() => dispatch({ type: "FAST_DELIVERY_ONLY" })}
                  >
                    Fast Delivery Only
                  </label>
                </li>
              </ul>
              <hr />
              <h4>Price Range</h4>
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
