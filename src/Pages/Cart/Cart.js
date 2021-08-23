import { CartCard } from "../../Components/CartCard/CartCard";
import { useAuth } from "../../Context/AuthContext";
import { useData } from "../../Context/DataContext";
import { PaymentService } from "../../services/paymentService/payment.services";
import styles from "./Cart.module.css";

export const Cart = () => {
  const { cart } = useData();
  const { user } = useAuth();

  const getTotalPrice = (items) => {
    return items.reduce(
      (total, item) => total + item.discountedPrice * item.quantity,
      0
    );
  };

  const getTotalDiscountPrice = (items) => {
    return items.reduce(
      (total, item) => total + item.actualPrice * item.quantity,
      0
    );
  };

  const totalBillAmount =
    getTotalPrice > 499 ? getTotalPrice(cart) : getTotalPrice(cart) + 40;

  return (
    <div className="App">
      {cart.length > 0 ? (
        <h2 className={`heading-md text-centre ${styles.heading}`}>My Cart</h2>
      ) : (
        ""
      )}
      {/* style={{ display: "flex", flexWrap: "wrap" }} */}
      {cart.length > 0 ? (
        <div className={`${styles.main_container}`}>
          <ul className={`list-non-bullet ${styles.item_list}`}>
            {cart.map((cartItem) => (
              <li className={`${styles.card}`}>
                <CartCard cartItem={cartItem} />
              </li>
            ))}
          </ul>
          <div className={`${styles.price}`}>
            <p>
              Price Details <span>({cart.length} Items)</span>
            </p>
            <div className={`flex ${styles.space_between}`}>
              <span>Total MRP</span>
              <span>&#8377;{getTotalDiscountPrice(cart)}</span>
            </div>
            <div className={`flex ${styles.space_between}`}>
              <span>Discount on MRP</span>
              <span>
                - &#8377;
                {Math.round(getTotalDiscountPrice(cart) - getTotalPrice(cart))}
              </span>
            </div>
            <div className={`flex ${styles.space_between}`}>
              <span>Delivery Charges</span>
              <span>
                {getTotalPrice(cart) > 499 ? (
                  <span>
                    Free{" "}
                    <span style={{ textDecoration: "line-through" }}>
                      &#8377;40
                    </span>{" "}
                  </span>
                ) : (
                  <span>&#8377;40</span>
                )}
              </span>
            </div>
            <div className={`flex ${styles.space_between}`}>
              <span>Total Amount</span>
              <span>
                <span>&#8377; {totalBillAmount}</span>
              </span>
            </div>
            <button
              className={`${styles.button}`}
              onClick={() => PaymentService(totalBillAmount, user)}
            >
              Place Order
            </button>
          </div>
        </div>
      ) : (
        <div className={`${styles.cart_empty}`}>
          <div>Your Cart is empty</div>
          {/* <p>Let's add some items to your cart</p>
          <button></button> */}
        </div>
      )}{" "}
    </div>
  );
};
