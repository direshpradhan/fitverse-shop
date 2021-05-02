import { Link } from "react-router-dom";
import { useData } from "../../Context/DataContext";
import styles from "./WishlistCard.module.css";

export const WishlistCard = ({ wishlistItem, setRoute }) => {
  const { state, dispatch } = useData();
  return (
    <div className={`${styles.card}`} key={wishlistItem.id}>
      <img
        src={wishlistItem.image}
        width="100%"
        height="auto"
        alt={wishlistItem.productName}
      />
      <h3> {wishlistItem.name} </h3>
      <div>Rs. {wishlistItem.price}</div>
      {wishlistItem.inStock && <div> In Stock </div>}
      {!wishlistItem.inStock && <div> Out of Stock </div>}
      <div>{wishlistItem.level}</div>
      {wishlistItem.fastDelivery ? (
        <div> Fast Delivery </div>
      ) : (
        <div> 3 days minimum </div>
      )}
      <span
        className={`${styles.delete_icon} material-icons-outlined`}
        onClick={() =>
          dispatch({ type: "REMOVE_WISHLIST_ITEM", payload: wishlistItem.id })
        }
      >
        delete
      </span>{" "}
      <button
        className={`${styles.button}`}
        onClick={() =>
          dispatch({
            type: "MOVE_TO_CART",
            payload: wishlistItem,
          })
        }
      >
        Move to cart
      </button>
    </div>
  );
};
