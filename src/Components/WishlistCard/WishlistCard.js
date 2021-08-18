import { useAuth } from "../../Context/AuthContext";
import { useData } from "../../Context/DataContext";
import { removeFromWishlistService, moveToCartService } from "../../services";
import styles from "./WishlistCard.module.css";

export const WishlistCard = ({ wishlistItem }) => {
  const { dispatch, cart } = useData();
  console.log(wishlistItem);
  const {
    _id: id,
    brand,
    discount,
    image,
    name,
    discountedPrice,
    actualPrice,
    productName,
  } = wishlistItem;
  const { token } = useAuth();
  const isInCart = cart.find((cartItem) => cartItem._id === id);

  const removeFromWishlist = async (id) => {
    removeFromWishlistService(id, dispatch);
  };

  const moveToCart = async (id) => {
    if (isInCart) {
      removeFromWishlistService(id, dispatch);
    } else {
      moveToCartService(id, wishlistItem, dispatch);
    }
  };

  return (
    <div className={`${styles.card}`} key={id}>
      <img
        className={`${styles.card_img}`}
        src={image}
        // width="200px"
        // height="225px"
        alt={productName}
      />
      <div className={`${styles.card_details}`}>
        <h4> {name} </h4>
        <p>{brand}</p>
        <div>
          &#8377;{discountedPrice}{" "}
          <span style={{ textDecoration: "line-through" }}>
            &#8377;{actualPrice}
          </span>
          <span style={{ color: "var(--primary-color)" }}>({discount})</span>
        </div>
        <span
          className={`${styles.delete_icon} material-icons-outlined`}
          onClick={() => removeFromWishlist(id)}
        >
          close
        </span>{" "}
        <button className={`${styles.button}`} onClick={() => moveToCart(id)}>
          Move to cart
        </button>
      </div>
    </div>
  );
};
