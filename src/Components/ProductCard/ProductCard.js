import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useData } from "../../Context/DataContext";
import styles from "./ProductCard.module.css";
import {
  addToCartService,
  addToWishlistService,
  removeFromWishlistService,
} from "../../services";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useRef } from "react";

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
    fastDelivery,
  } = product;
  const { state, dispatch } = useData();
  const { token } = useAuth();
  const navigate = useNavigate();
  const isInCart = state.cart.find((cartItem) => cartItem._id === id);
  const isInWishList = state.wishlist?.find(
    (wishlistItem) => wishlistItem._id === id
  );
  // const toastId = useRef(null);

  const addToCart = (id) => {
    const newCartItem = { product: { _id: id } };
    token
      ? addToCartService(newCartItem, product, dispatch)
      : navigate("/login");
  };

  const addToWishlist = async (id) => {
    const newWishlistItem = { product: { _id: id } };
    token
      ? addToWishlistService(newWishlistItem, product, dispatch)
      : navigate("/login");
  };

  const removeFromWishlist = (id) => {
    removeFromWishlistService(id, dispatch);
  };

  return (
    <div key={id} className={`${styles.card}`}>
      {/* <div style={{ width: "75%" }}> */}
      <img
        className={`${styles.product_img}`}
        src={image}
        // width="175px"
        // height="175px"
        alt="productImage"
      />
      {/* </div> */}
      <div className={`${styles.product_details} flex flex-col`}>
        <div>
          <h4
            className={`${styles.product_name} pointer`}
            onClick={() => navigate(`/product/${id}`)}
          >
            {" "}
            {name}{" "}
          </h4>

          {!isInWishList ? (
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
              {/* <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
              /> */}
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
