import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useData } from "../../Context/DataContext";
import styles from "./ProductCard.module.css";

export const ProductCard = ({ product, setRoute }) => {
  const { state, dispatch } = useData();
  const { login } = useAuth();
  const navigate = useNavigate();
  return (
    <div key={product.id} className={`${styles.card}`}>
      <img
        className="card-img"
        src={product.image}
        width="100%"
        height="auto"
        alt={product.productName}
      />
      <div className={`${styles.product_details}`}>
        <div>
          <h4> {product.name} </h4>
          {/* <span> */}
          {!state.wishlist.find(
            (wishlistItem) => wishlistItem.id === product.id
          ) ? (
            <span
              className={`${styles.wishlist_icon} material-icons-outlined`}
              onClick={() => {
                login
                  ? dispatch({
                      type: "ADD_TO_WISHLIST",
                      payload: product,
                    })
                  : navigate("/login");
              }}
            >
              favorite_border
            </span>
          ) : (
            <span
              className={`${styles.wishlist_icon} material-icons-outlined`}
              style={{ color: "red" }}
              onClick={() =>
                dispatch({
                  type: "REMOVE_WISHLIST_ITEM",
                  payload: product.id,
                })
              }
            >
              favorite
            </span>
          )}
          {/* </span>{" "} */}
        </div>
        <p>{product.brand}</p>
        <div>
          Rs. {product.price}{" "}
          <span style={{ color: "var(--primary-color)" }}>
            ({product.discount})
          </span>
        </div>
      </div>
      <div>
        {!state.cart.find((cartItem) => cartItem.id === product.id) ? (
          product.inStock ? (
            <button
              className={`${styles.button}`}
              onClick={() => {
                login
                  ? dispatch({
                      type: "ADD_TO_CART",
                      payload: product,
                    })
                  : navigate("/login");
              }}
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
