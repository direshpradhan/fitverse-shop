import { Link } from "react-router-dom";
import { useData } from "../../Context/DataContext";

export const WishlistCard = ({ wishlistItem, setRoute }) => {
  const { state, dispatch } = useData();
  return (
    <div
      key={wishlistItem.id}
      style={{
        border: "1px solid #4B5563",
        borderRadius: "0 0 0.5rem 0.5rem",
        margin: "1rem",
        maxWidth: "40%",
        padding: "0 0 1rem",
      }}
    >
      <img
        src={wishlistItem.image}
        width="100%"
        height="auto"
        alt={wishlistItem.productName}
      />
      <h3> {wishlistItem.name} </h3>
      <div>Rs. {wishlistItem.price}</div>
      {wishlistItem.inStock && <div> In Stock </div>}
      {!wishlistItem.inStock && <div> Out of Stock </div>}
      <div>{wishlistItem.level}</div>
      {wishlistItem.fastDelivery ? (
        <div> Fast Delivery </div>
      ) : (
        <div> 3 days minimum </div>
      )}
      <button
        onClick={() =>
          dispatch({ type: "REMOVE_WISHLIST_ITEM", payload: wishlistItem.id })
        }
      >
        Remove from Wishlist
      </button>
      {!state.cart.find((cartItem) => cartItem.id === wishlistItem.id) ? (
        <button
          onClick={() =>
            dispatch({
              type: "ADD_TO_CART",
              payload: wishlistItem,
            })
          }
        >
          Add to cart
        </button>
      ) : (
        <button>
          {" "}
          <Link to="/cart">Go to Cart</Link>
        </button>
      )}
    </div>
  );
};
