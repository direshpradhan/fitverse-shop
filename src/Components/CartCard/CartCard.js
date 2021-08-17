import axios from "axios";
import { useAuth } from "../../Context/AuthContext";
import { useData } from "../../Context/DataContext";
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
    try {
      if (desc === "increment") {
        const response = await axios.post(
          `https://Fitverse-Shop-Backend.pdiresh.repl.co/cart/${id}`,
          { quantity: quantity + 1 },
          { headers: { authorization: `Bearer ${token}` } }
        );
        if (response.status === 200) {
          dispatch({ type: "INCREMENT_QUANTITY", payload: id });
        }
      } else {
        const response = await axios.post(
          `https://Fitverse-Shop-Backend.pdiresh.repl.co/cart/${id}`,
          { quantity: quantity - 1 },
          { headers: { authorization: `Bearer ${token}` } }
        );
        if (response.status === 200) {
          dispatch({ type: "DECREMENT_QUANTITY", payload: id });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteFromCart = async (id) => {
    try {
      console.log("Del");
      const response = await axios.delete(
        `https://Fitverse-Shop-Backend.pdiresh.repl.co/cart/${id}`,
        { headers: { authorization: `Bearer ${token}` } }
      );
      console.log(response);

      if (response.status === 200) {
        dispatch({ type: "REMOVE_CART_ITEM", payload: id });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const moveToWishlist = async (id) => {
    try {
      if (isInWishlist) {
        const cartResponse = await axios.delete(
          `https://Fitverse-Shop-Backend.pdiresh.repl.co/cart/${id}`,
          { headers: { authorization: `Bearer ${token}` } }
        );
        if (cartResponse.status === 200) {
          dispatch({ type: "MOVE_TO_WISHLIST", payload: cartItem });
        }
      } else {
        const cartResponse = await axios.delete(
          `https://Fitverse-Shop-Backend.pdiresh.repl.co/cart/${id}`,
          { headers: { authorization: `Bearer ${token}` } }
        );

        const wishResponse = await axios.post(
          "https://Fitverse-Shop-Backend.pdiresh.repl.co/wishlist",
          { product: { _id: id } },
          { headers: { authorization: `Bearer ${token}` } }
        );
        console.log(cartResponse);
        console.log(wishResponse);

        if (wishResponse.status === 200 && cartResponse.status === 200) {
          dispatch({ type: "MOVE_TO_WISHLIST", payload: cartItem });
        }
      }
    } catch (error) {
      console.log(error.message);
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
