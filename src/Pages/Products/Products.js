import { ProductCard } from "../../Components/ProductCard/ProductCard";
import { useData } from "../../Context/DataContext";
import { ProductOperations } from "./ProductOperations";
import { ProductOperationsSidebar } from "./ProductOperationsSidebar";
import styles from "./Products.module.css";

export const Products = ({ setRoute }) => {
  const {
    products,
    sortBy,
    showInventoryAll,
    fastDeliveryOnly,
    priceSlider,
    filterByCategories,
  } = useData();

  const getSortedData = (data, sortBy) => {
    if (sortBy && sortBy === "LOW_TO_HIGH") {
      return [...data].sort(
        (item1, item2) => item1.discountedPrice - item2.discountedPrice
      );
    }
    if (sortBy && sortBy === "HIGH_TO_LOW") {
      return [...data].sort(
        (item1, item2) => item2.discountedPrice - item1.discountedPrice
      );
    }
    return data;
  };

  const getFilteredData = (
    data,
    fastDeliveryOnly,
    showInventoryAll,
    filterByCategories,
    priceSlider
  ) => {
    let newData = [...data];
    newData = newData
      .filter((item) => (showInventoryAll ? true : item?.inStock))
      .filter((item) => (fastDeliveryOnly ? item.fastDelivery : true))
      .filter((item) => Number(item.discountedPrice) < Number(priceSlider));

    if (filterByCategories.length !== 0) {
      console.log("entered..");
      console.log(filterByCategories);
      newData = newData.filter((item) =>
        filterByCategories.includes(item.category)
      );
    }
    return newData;
  };

  const sortedData = getSortedData(products, sortBy);
  const filteredData = getFilteredData(
    sortedData,
    fastDeliveryOnly,
    showInventoryAll,
    filterByCategories,
    priceSlider
  );

  return (
    <div className={`${styles.products} flex`}>
      <ProductOperations />
      <ProductOperationsSidebar />
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
