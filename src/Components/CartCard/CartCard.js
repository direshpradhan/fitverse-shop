import { useAuth } from "../../Context/AuthContext";
import { useData } from "../../Context/DataContext";
import {
  decrementQuantityService,
  incrementQuantityService,
  moveToWishlistService,
  removeProductFromCartService,
} from "../../services";
import styles from "./CartCard.module.css";

export const CartCard = ({ cartItem }) => {
  const { dispatch, wishlist } = useData();
  const {
    _id: id,
    brand,
    discount,
    image,
    name,
    discountedPrice,
    actualPrice,
    productName,
    quantity,
  } = cartItem;
  const { token } = useAuth();

  const isInWishlist = wishlist?.find((wishItem) => wishItem._id === id);

  const updateCount = async ({ id, desc }) => {
    if (desc === "increment") {
      incrementQuantityService(id, quantity, dispatch);
    } else {
      decrementQuantityService(id, quantity, dispatch);
    }
  };

  const deleteFromCart = (id) => {
    removeProductFromCartService(id, dispatch);
  };

  const moveToWishlist = async (id) => {
    if (isInWishlist) {
      removeProductFromCartService(id, dispatch);
    } else {
      moveToWishlistService(id, cartItem, dispatch);
    }
  };

  return (
    <div className={`${styles.card}`} key={id}>
      <img
        className={`${styles.card_img}`}
        src={image}
        width="200px"
        height="200px"
        alt={productName}
      />
      <div className={`${styles.card_details}`}>
        <div>
          <h4 className={`${styles.product_name}`}> {name} </h4>
          <span
            className={`material-icons-outlined ${styles.delete_icon}`}
            onClick={() => deleteFromCart(id)}
          >
            close
          </span>
        </div>
        <p>{brand}</p>
        <div>
          &#8377;{discountedPrice}{" "}
          <span style={{ textDecoration: "line-through" }}>
            &#8377;{actualPrice}
          </span>{" "}
          <span style={{ color: "var(--primary-color)" }}>({discount})</span>
        </div>
        <div>
          <button
            className={`${styles.button} ${styles.btn_icon} `}
            onClick={() => updateCount({ id, desc: "decrement" })}
          >
            -
          </button>
          <span className={`${styles.cart_quantity}`}>{quantity}</span>
          <button
            className={`${styles.button} ${styles.btn_icon} `}
            onClick={() => updateCount({ id, desc: "increment" })}
          >
            +
          </button>
          <br />

          {/* <button
            className={`${styles.button}`}
            onClick={() =>
              dispatch({ type: "REMOVE_CART_ITEM", payload: id })
            }
          >
            Remove from Cart
          </button> */}
          <button
            className={`${styles.button}`}
            onClick={() => moveToWishlist(id)}
          >
            Move to wishlist
          </button>
        </div>
      </div>
    </div>
  );
};
