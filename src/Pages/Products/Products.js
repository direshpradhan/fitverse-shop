import { useState } from "react";
import { ProductCard } from "../../Components/ProductCard/ProductCard";
import { useData } from "../../Context/DataContext";
import { productList } from "../../ProductsDB";

export const Products = ({ setRoute }) => {
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

  const getSortedData = (data, sortBy) => {
    if (sortBy && sortBy === "LOW_TO_HIGH") {
      return [...data].sort((item1, item2) => item1.price - item2.price);
    }
    if (sortBy && sortBy === "HIGH_TO_LOW") {
      return [...data].sort((item1, item2) => item2.price - item1.price);
    }
    return data;
  };

  const getFilteredData = (data, fastDeliveryOnly, showInventoryAll) => {
    return data
      .filter((item) => (showInventoryAll ? true : item.inStock))
      .filter((item) => (fastDeliveryOnly ? item.fastDelivery : true))
      .filter((item) => item.price < Number(priceSlider));
  };

  const sortedData = getSortedData(productList, sortBy);
  const filteredData = getFilteredData(
    sortedData,
    fastDeliveryOnly,
    showInventoryAll,
    priceSlider
  );

  return (
    <div>
      <h2>Products</h2>
      <div style={{ position: "fixed", bottom: "0", width: "100%" }}>
        <div
          style={{
            display: "inline-flex",
            width: "50%",
            justifyContent: "center",
            background: "white",
            borderRight: "1px solid gray",
            padding: "0.75rem",
            cursor: "pointer",
          }}
          onClick={() => setSortHide((val) => !val)}
        >
          SORT <span class="material-icons-outlined">sort</span>
        </div>
        <div
          style={{
            display: "inline-flex",
            width: "50%",
            justifyContent: "center",
            background: "white",
            padding: "0.75rem",
            cursor: "pointer",
          }}
          onClick={() => setFilterHide((val) => !val)}
        >
          FILTER <span class="material-icons-outlined">filter_alt</span>
        </div>
      </div>

      <div style={sortHide ? hide : visible} className="options">
        <div className="sort">
          <span>Sort By</span>
          <button
            className="btn btn-sm"
            onClick={() => dispatch({ type: "CLEAR_SORT" })}
          >
            Clear
          </button>
          <br />
          <label>
            <input
              type="radio"
              name="sort"
              onChange={() =>
                dispatch({ type: "SORT", payload: "LOW_TO_HIGH" })
              }
              checked={state.sortBy && state.sortBy === "LOW_TO_HIGH"}
            />
            Price-Low to High
          </label>
          <label>
            <input
              type="radio"
              name="sort"
              onChange={() =>
                dispatch({ type: "SORT", payload: "HIGH_TO_LOW" })
              }
              checked={state.sortBy && state.sortBy === "HIGH_TO_LOW"}
            />
            Price-High to Low
          </label>
        </div>
      </div>
      <div style={filterHide ? hide : visible} className="options">
        <div className="filter">
          <legend>Filter By</legend>
          <label>
            <input
              type="checkbox"
              onChange={() => dispatch({ type: "SHOW_OUT_OF_STOCK" })}
              checked={state.showInventoryAll}
            />
            Include Out of Stock
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => dispatch({ type: "FAST_DELIVERY_ONLY" })}
              checked={state.fastDeliveryOnly}
            />
            Fast Delivery Only
          </label>
        </div>
        <label>
          Price Range
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
        </label>
      </div>
      <div className="App" style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredData.map((product) => (
          <ProductCard product={product} setRoute={setRoute} />
        ))}
      </div>
    </div>
  );
};
