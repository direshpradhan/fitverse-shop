import { useData } from "../../Context/DataContext";

export const CartCard = ({ cartItem }) => {
  const { dispatch } = useData();
  return (
    <div
      key={cartItem.id}
      style={{
        border: "1px solid #4B5563",
        borderRadius: "0 0 0.5rem 0.5rem",
        margin: "1rem",
        maxWidth: "40%",
        padding: "0 0 1rem",
      }}
    >
      <img
        src={cartItem.image}
        width="100%"
        height="auto"
        alt={cartItem.productName}
      />
      <h3> {cartItem.name} </h3>
      <div>Rs. {cartItem.price}</div>
      {cartItem.inStock && <div> In Stock </div>}
      {!cartItem.inStock && <div> Out of Stock </div>}
      <div>{cartItem.level}</div>
      {cartItem.fastDelivery ? (
        <div> Fast Delivery </div>
      ) : (
        <div> 3 days minimum </div>
      )}
      <button
        onClick={() => dispatch({ type: "DECREMENT", payload: cartItem.id })}
      >
        -
      </button>
      {cartItem.quantity}
      <button
        onClick={() => dispatch({ type: "INCREMENT", payload: cartItem.id })}
      >
        +
      </button>
      <button
        onClick={() =>
          dispatch({ type: "REMOVE_CART_ITEM", payload: cartItem.id })
        }
      >
        Remove from Cart
      </button>
      <button
        onClick={() =>
          dispatch({
            type: "MOVE_TO_WISHLIST",
            payload: cartItem,
          })
        }
      >
        Move to wishlist
      </button>
    </div>
  );
};
