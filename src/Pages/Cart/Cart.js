import { CartCard } from "../../Components/CartCard/CartCard";
import { useData } from "../../Context/DataContext";

export const Cart = () => {
  const { state } = useData();

  const getTotalPrice = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      <h1>Cart</h1>
      <h3>Total Price:{getTotalPrice(state.cart)}</h3>
      <div className="App" style={{ display: "flex", flexWrap: "wrap" }}>
        {state.cart.map((cartItem) => (
          <CartCard cartItem={cartItem} />
        ))}
      </div>
    </div>
  );
};
