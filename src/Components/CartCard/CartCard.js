import { useData } from "../../Context/DataContext";
import styles from "./CartCard.module.css";

export const CartCard = ({ cartItem }) => {
  const { dispatch } = useData();
  return (
    <div className={`${styles.card}`} key={cartItem.id}>
      <img
        className={`${styles.card_img}`}
        src={cartItem.image}
        width="100%"
        height="auto"
        alt={cartItem.productName}
      />
      <div className={`${styles.card_details}`}>
        <h4> {cartItem.name} </h4>
        <p>{cartItem.brand}</p>
        <div>
          Rs. {cartItem.price}{" "}
          <span style={{ color: "var(--primary-color)" }}>
            ({cartItem.discount})
          </span>
        </div>
        <div>
          <button
            className={`${styles.button} ${styles.btn_icon} `}
            onClick={() =>
              dispatch({ type: "DECREMENT", payload: cartItem.id })
            }
          >
            -
          </button>{" "}
          <span className={`${styles.cart_quantity}`}>{cartItem.quantity}</span>{" "}
          <button
            className={`${styles.button} ${styles.btn_icon} `}
            onClick={() =>
              dispatch({ type: "INCREMENT", payload: cartItem.id })
            }
          >
            +
          </button>{" "}
          <br />
          <span
            className={`${styles.delete_icon} material-icons-outlined`}
            onClick={() =>
              dispatch({ type: "REMOVE_CART_ITEM", payload: cartItem.id })
            }
          >
            delete
          </span>{" "}
          {/* <button
            className={`${styles.button}`}
            onClick={() =>
              dispatch({ type: "REMOVE_CART_ITEM", payload: cartItem.id })
            }
          >
            Remove from Cart
          </button> */}
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
      </div>
    </div>
  );
};
