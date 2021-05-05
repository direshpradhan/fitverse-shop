import { useState } from "react";
import { ProductCard } from "../../Components/ProductCard/ProductCard";
import { useData } from "../../Context/DataContext";
import { productList } from "../../ProductsDB";
import { ProductOperations, filteredData } from "./ProductOperations";
import styles from "./Products.module.css";

export const Products = ({ setRoute }) => {
  const {
    products,
    sortBy,
    showInventoryAll,
    fastDeliveryOnly,
    priceSlider,
  } = useData();

  const getSortedData = (data, sortBy) => {
    if (sortBy && sortBy === "LOW_TO_HIGH") {
      return [...data].sort((item1, item2) => item1.price - item2.price);
    }
    if (sortBy && sortBy === "HIGH_TO_LOW") {
      return [...data].sort((item1, item2) => item2.price - item1.price);
    }
    return data;
  };

  const getFilteredData = (
    data,
    fastDeliveryOnly,
    showInventoryAll,
    priceSlider
  ) => {
    return data
      .filter((item) => (showInventoryAll ? true : item?.inStock))
      .filter((item) => (fastDeliveryOnly ? item.fastDelivery : true))
      .filter((item) => item.price < Number(priceSlider));
  };

  const sortedData = getSortedData(products, sortBy);
  const filteredData = getFilteredData(
    sortedData,
    fastDeliveryOnly,
    showInventoryAll,
    priceSlider
  );
  // const {
  //   state,
  //   dispatch,
  //   sortBy,
  //   showInventoryAll,
  //   fastDeliveryOnly,
  //   priceSlider,
  // } = useData();
  // const [filterHide, setFilterHide] = useState(true);
  // const [sortHide, setSortHide] = useState(true);

  // const hide = { display: "none" };
  // const visible = { display: "" };

  // const getSortedData = (data, sortBy) => {
  //   if (sortBy && sortBy === "LOW_TO_HIGH") {
  //     return [...data].sort((item1, item2) => item1.price - item2.price);
  //   }
  //   if (sortBy && sortBy === "HIGH_TO_LOW") {
  //     return [...data].sort((item1, item2) => item2.price - item1.price);
  //   }
  //   return data;
  // };

  // const getFilteredData = (data, fastDeliveryOnly, showInventoryAll) => {
  //   return data
  //     .filter((item) => (showInventoryAll ? true : item?.inStock))
  //     .filter((item) => (fastDeliveryOnly ? item.fastDelivery : true))
  //     .filter((item) => item.price < Number(priceSlider));
  // };

  // const sortedData = getSortedData(state.products, sortBy);
  // const filteredData = getFilteredData(
  //   sortedData,
  //   fastDeliveryOnly,
  //   showInventoryAll,
  //   priceSlider
  // );

  return (
    <div className={`${styles.products}`}>
      {/* <h2>Products</h2> */}
      <ProductOperations />
      {/* <div className={`${styles.options_container}`}>
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
                    type="radio"
                    name="sort"
                    onChange={() =>
                      dispatch({ type: "SORT", payload: "LOW_TO_HIGH" })
                    }
                    checked={state.sortBy && state.sortBy === "LOW_TO_HIGH"}
                  />
                  <label>Price-Low to High</label>
                </li>
                <li>
                  <input
                    type="radio"
                    name="sort"
                    onChange={() =>
                      dispatch({ type: "SORT", payload: "HIGH_TO_LOW" })
                    }
                    checked={state.sortBy && state.sortBy === "HIGH_TO_LOW"}
                  />
                  <label>Price-High to Low</label>
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
                    type="checkbox"
                    onChange={() => dispatch({ type: "SHOW_OUT_OF_STOCK" })}
                    checked={state.showInventoryAll}
                  />
                  <label>Include Out of Stock</label>
                </li>
              </ul>
              <hr />
              <h4>Delivery</h4>
              <ul>
                <li>
                  <input
                    type="checkbox"
                    onChange={() => dispatch({ type: "FAST_DELIVERY_ONLY" })}
                    checked={state.fastDeliveryOnly}
                  />
                  <label>Fast Delivery Only</label>
                </li>
              </ul>
              <hr />
              <h4>Price Range</h4>
              <ul>
                <li>
                  <input
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
      </div> */}

      <div className={`${styles.card_container}`}>
        {products.length !== 0 ? (
          filteredData.map((product) => (
            <ProductCard product={product} setRoute={setRoute} />
          ))
        ) : (
          <h1>Loading.....</h1>
        )}
      </div>
    </div>
  );
};
