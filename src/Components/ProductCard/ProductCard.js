import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useData } from "../../Context/DataContext";
import styles from "./ProductCard.module.css";
import axios from "axios";

export const ProductCard = ({ product }) => {
  const {
    _id: id,
    brand,
    discount,
    image,
    name,
    price,
    inStock,
    productName,
  } = product;
  const { state, dispatch } = useData();
  const { token } = useAuth();
  const navigate = useNavigate();
  const isInCart = state.cart.find((cartItem) => cartItem._id === id);

  const addToCart = async (id) => {
    try {
      console.log(id);
      const newCartItem = { product: { _id: id } };
      console.log(token);
      if (token) {
        console.log(newCartItem);
        const response = await axios.post(
          "https://Fitverse-Shop-Backend.pdiresh.repl.co/cart",
          newCartItem,
          { headers: { authorization: `Bearer ${token}` } }
        );
        console.log(response);
        if (response.status === 200) {
          return dispatch({ type: "ADD_TO_CART", payload: product });
        }
        return "";
      }
      navigate("/login");
    } catch (error) {
      console.log(id);
      console.log(error.message);
    }
  };

  const addToWishlist = async (id) => {
    try {
      const newWishlistItem = { product: { _id: id } };
      if (token) {
        const response = await axios.post(
          "https://Fitverse-Shop-Backend.pdiresh.repl.co/wishlist",
          newWishlistItem,
          { headers: { authorization: `Bearer ${token}` } }
        );
        if (response.status === 200) {
          return dispatch({ type: "ADD_TO_WISHLIST", payload: product });
        }
        return "";
      }
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  const removeFromWishlist = async (id) => {
    try {
      const response = await axios.delete(
        `https://Fitverse-Shop-Backend.pdiresh.repl.co/wishlist/${id}`,
        { headers: { authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        dispatch({
          type: "REMOVE_WISHLIST_ITEM",
          payload: id,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div key={id} className={`${styles.card}`}>
      <img
        // className="card-img"
        src={image}
        width="100%"
        height="auto"
        alt={productName}
      />
      <div className={`${styles.product_details} flex flex-col`}>
        <div>
          <h4> {name} </h4>
          {/* <span> */}
          {!state.wishlist?.find((wishlistItem) => wishlistItem._id === id) ? (
            <span
              className={`${styles.pointer} material-icons-outlined`}
              onClick={() => addToWishlist(id)}
            >
              favorite_border
            </span>
          ) : (
            <span
              className={`${styles.pointer} material-icons-outlined`}
              style={{ color: "red" }}
              onClick={() => removeFromWishlist(id)}
            >
              favorite
            </span>
          )}
          {/* </span>{" "} */}
        </div>
        <p>{brand}</p>
        <div>
          Rs. {price}{" "}
          <span style={{ color: "var(--primary-color)" }}>({discount})</span>
        </div>
      </div>
      <div>
        {!isInCart ? (
          inStock ? (
            <button
              className={`${styles.button}`}
              onClick={() => addToCart(id)}
            >
              Add to cart
            </button>
          ) : (
            <button
              className={`${styles.button} ${styles.button_disabled}`}
              disabled
            >
              Out of Stock
            </button>
          )
        ) : (
          <button
            onClick={() => navigate("/cart")}
            className={`${styles.button}`}
          >
            Go to Cart
          </button>
        )}
      </div>
    </div>
  );
};
