import { useData } from "../../Context/DataContext";
import styles from "./CartCard.module.css";

export const CartCard = ({ cartItem }) => {
  const { dispatch } = useData();
  return (
    <div className={`${styles.card}`} key={cartItem.id}>
      <img
        src={cartItem.image}
        width="100%"
        height="auto"
        alt={cartItem.productName}
      />
      <h3> {cartItem.name} </h3>
      <div>Rs. {cartItem.price}</div>
      {cartItem.inStock && <div> In Stock </div>}
      {!cartItem.inStock && <div> Out of Stock </div>}
      <div>{cartItem.level}</div>
      {cartItem.fastDelivery ? (
        <div> Fast Delivery </div>
      ) : (
        <div> 3 days minimum </div>
      )}
      <button
        className={`${styles.button}`}
        onClick={() => dispatch({ type: "DECREMENT", payload: cartItem.id })}
      >
        -
      </button>{" "}
      <span style={{ fontWeight: "bold" }}>{cartItem.quantity}</span>{" "}
      <button
        className={`${styles.button}`}
        onClick={() => dispatch({ type: "INCREMENT", payload: cartItem.id })}
      >
        +
      </button>{" "}
      <span
        className={`${styles.delete_icon} material-icons-outlined`}
        onClick={() =>
          dispatch({ type: "REMOVE_CART_ITEM", payload: cartItem.id })
        }
      >
        delete
      </span>{" "}
      <button
        className={`${styles.button}`}
        onClick={() =>
          dispatch({
            type: "MOVE_TO_WISHLIST",
            payload: cartItem,
          })
        }
      >
        Move to wishlist
      </button>
    </div>
  );
};
