import axios from "axios";
import { useData } from "../../Context/DataContext";
import styles from "./WishlistCard.module.css";

export const WishlistCard = ({ wishlistItem }) => {
  const { dispatch, cart } = useData();
  const {
    _id: id,
    brand,
    discount,
    image,
    name,
    price,
    productName,
  } = wishlistItem;
  const isInCart = cart.find((cartItem) => cartItem._id === id);

  const removeFromWishlist = async (id) => {
    try {
      const response = await axios.delete(
        `https://Fitverse-Shop-Backend.pdiresh.repl.co/wishlist/${id}`,
        { data: { userId: 123 } }
      );
      if (response.status === 200) {
        dispatch({ type: "REMOVE_WISHLIST_ITEM", payload: id });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const moveToCart = async (id) => {
    try {
      if (isInCart) {
        console.log("inside");
        const wishResponse = await axios.delete(
          `https://Fitverse-Shop-Backend.pdiresh.repl.co/wishlist/${id}`,
          { data: { userId: 123 } }
        );
        if (wishResponse.status === 200) {
          dispatch({ type: "MOVE_TO_CART", payload: wishlistItem });
        }
      } else {
        const wishResponse = await axios.delete(
          `https://Fitverse-Shop-Backend.pdiresh.repl.co/wishlist/${id}`,
          { data: { userId: 123 } }
        );
        const cartResponse = await axios.post(
          "https://Fitverse-Shop-Backend.pdiresh.repl.co/cart",
          { userId: 123, product: { _id: id, quantity: 1 } }
        );
        if (wishResponse.status === 200 && cartResponse.status === 200) {
          dispatch({ type: "MOVE_TO_CART", payload: wishlistItem });
        }
      }
    } catch (error) {
      console.log(id);
      console.log(error.message);
    }
  };

  return (
    <div className={`${styles.card}`} key={id}>
      <img
        className={`${styles.card_img}`}
        src={image}
        width="100%"
        height="auto"
        alt={productName}
      />
      <div className={`${styles.card_details}`}>
        <h4> {name} </h4>
        <p>{brand}</p>
        <div>
          Rs. {price}{" "}
          <span style={{ color: "var(--primary-color)" }}>({discount})</span>
        </div>
        <span
          className={`${styles.delete_icon} material-icons-outlined`}
          onClick={() => removeFromWishlist(id)}
        >
          close
        </span>{" "}
        <button className={`${styles.button}`} onClick={() => moveToCart(id)}>
          Move to cart
        </button>
      </div>
    </div>
  );
};
