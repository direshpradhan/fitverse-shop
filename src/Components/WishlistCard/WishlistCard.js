import { Link } from "react-router-dom";
import { useData } from "../../Context/DataContext";
import styles from "./WishlistCard.module.css";

export const WishlistCard = ({ wishlistItem, setRoute }) => {
  const { dispatch, wishlist } = useData();
  return (
    <div className={`${styles.card}`} key={wishlistItem.id}>
      <img
        className={`${styles.card_img}`}
        src={wishlistItem.image}
        width="100%"
        height="auto"
        alt={wishlistItem.productName}
      />
      <div className={`${styles.card_details}`}>
        <h4> {wishlistItem.name} </h4>
        <p>{wishlistItem.brand}</p>
        <div>
          Rs. {wishlistItem.price}{" "}
          <span style={{ color: "var(--primary-color)" }}>
            ({wishlistItem.discount})
          </span>
        </div>
        {/* <span>
          {wishlist.find((wishItem) => wishItem.id === wishlistItem.id) && (
            <span
              className={`${styles.delete_icon} material-icons-outlined`}
              style={{ color: "red" }}
              onClick={() =>
                dispatch({
                  type: "REMOVE_WISHLIST_ITEM",
                  payload: wishlistItem.id,
                })
              }
            >
              favorite
            </span>
          )}
        </span>{" "} */}
        <span
          className={`${styles.delete_icon} material-icons-outlined`}
          onClick={() =>
            dispatch({ type: "REMOVE_WISHLIST_ITEM", payload: wishlistItem.id })
          }
        >
          close
        </span>{" "}
        <button
          className={`${styles.button}`}
          onClick={() =>
            dispatch({
              type: "MOVE_TO_CART",
              payload: wishlistItem,
            })
          }
        >
          Move to cart
        </button>
      </div>
    </div>
  );
};
