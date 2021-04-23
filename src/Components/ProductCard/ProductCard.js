import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useData } from "../../Context/DataContext";

export const ProductCard = ({ product, setRoute }) => {
  const { state, dispatch } = useData();
  const { login } = useAuth();
  const navigate = useNavigate();
  return (
    <div
      // className="card card-shadow"
      key={product.id}
      style={{
        border: "1px solid #4B5563",
        borderRadius: "0 0 0.5rem 0.5rem",
        margin: "1rem",
        maxWidth: "30%",
        padding: "0 0 1rem",
      }}
    >
      <img
        className="card-img"
        src={product.image}
        width="100%"
        height="auto"
        alt={product.productName}
      />
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
      {!state.cart.find((cartItem) => cartItem.id === product.id) ? (
        <button
          className="btn btn-primary btn-md"
          onClick={() =>
            dispatch({
              type: "ADD_TO_CART",
              payload: product,
            })
          }
        >
          Add to cart
        </button>
      ) : (
        <Link to="/cart">
          <button className="btn btn-primary btn-sm">Go to Cart</button>
        </Link>
      )}
      <button
        className="btn btn-secondary btn-md"
        onClick={() => {
          login
            ? dispatch({
                type: "ADD_TO_WISHLIST",
                payload: product,
              })
            : navigate("/login");
        }}
      >
        Add to wishlist
      </button>
    </div>
  );
};
