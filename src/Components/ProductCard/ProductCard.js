import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useData } from "../../Context/DataContext";
import styles from "./ProductCard.module.css";

export const ProductCard = ({ product, setRoute }) => {
  const { state, dispatch } = useData();
  const { login } = useAuth();
  const navigate = useNavigate();
  return (
    <div key={product.id} className={`${styles.card} card-shadow`}>
      <img
        className="card-img"
        src={product.image}
        width="100%"
        height="auto"
        alt={product.productName}
      />
      <div className={`${styles.product_details}`}>
        <h3> {product.name} </h3>
        <div>Rs. {product.price}</div>
        {product.inStock && <div> In Stock </div>}
        {!product.inStock && <div> Out of Stock </div>}
        <div>{product.level}</div>
        {product.fastDelivery ? (
          <div> Fast Delivery </div>
        ) : (
          <div> 3 days minimum </div>
        )}
      </div>
      {!state.cart.find((cartItem) => cartItem.id === product.id) ? (
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
        <Link to="/cart">
          <button className={`${styles.button}`}>Go to Cart</button>
        </Link>
      )}

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
            dispatch({ type: "REMOVE_WISHLIST_ITEM", payload: product.id })
          }
        >
          favorite
        </span>
      )}
    </div>
  );
};
