import { ProductCard } from "../../Components/ProductCard/ProductCard";
import { useData } from "../../Context/DataContext";
import { ProductOperations } from "./ProductOperations";
import { ProductOperationsSidebar } from "./ProductOperationsSidebar";
import styles from "./Products.module.css";

export const Products = ({ setRoute }) => {
  const { products, sortBy, showInventoryAll, fastDeliveryOnly, priceSlider } =
    useData();

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
