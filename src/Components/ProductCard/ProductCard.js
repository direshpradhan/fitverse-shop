import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useData } from "../../Context/DataContext";
import styles from "./ProductCard.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRef } from "react";

export const ProductCard = ({ product }) => {
  const {
    _id: id,
    brand,
    discount,
    image,
    name,
    actualPrice,
    discountedPrice,
    inStock,
    productName,
  } = product;
  const { state, dispatch } = useData();
  const { token } = useAuth();
  const navigate = useNavigate();
  const isInCart = state.cart.find((cartItem) => cartItem._id === id);
  const toastId = useRef(null);

  const addToCart = async (id) => {
    try {
      console.log(id);
      const newCartItem = { product: { _id: id } };
      console.log(token);
      toastId.current = toast.info("Adding to Cart...");
      if (token) {
        const response = await axios.post(
          "https://Fitverse-Shop-Backend.pdiresh.repl.co/cart",
          newCartItem,
          { headers: { authorization: `Bearer ${token}` } }
        );
        console.log(response);
        if (response.status === 200) {
          toast.dismiss(toastId.current);
          dispatch({ type: "ADD_TO_CART", payload: product });
          toast.success("Added to Cart!!");
        }
      } else {
        navigate("/login");
      }
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
      {/* <div style={{ width: "75%" }}> */}
      <img
        className={`${styles.product_img}`}
        src={image}
        // width="175px"
        // height="175px"
        alt={productName}
      />
      {/* </div> */}
      <div className={`${styles.product_details} flex flex-col`}>
        <div>
          <h4 className={`${styles.product_name}`}> {name} </h4>
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
          &#8377;{discountedPrice}{" "}
          <span style={{ textDecoration: "line-through" }}>
            &#8377;{actualPrice}
          </span>
          <span style={{ color: "var(--primary-color)" }}>({discount})</span>
        </div>
      </div>
      <div>
        {!isInCart ? (
          inStock ? (
            <div>
              <button
                className={`${styles.button}`}
                onClick={() => addToCart(id)}
              >
                Add to cart
              </button>
              <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
              />
            </div>
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
