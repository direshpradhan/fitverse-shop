import { useData } from "../../Context/DataContext";
import { WishlistCard } from "../../Components/WishlistCard/WishlistCard";
import styles from "./Wishlist.module.css";
import { Loader } from "../../Components/Loader/Loader";

export const Wishlist = ({ setRoute }) => {
  const { wishlist } = useData();
  return (
    <div>
      {wishlist?.length > 0 ? (
        <h2 className={`heading-md text-centre ${styles.heading}`}>
          My Wishlist
        </h2>
      ) : (
        ""
      )}
      {wishlist?.length === 0 ? (
        <div className={`${styles.wishlist_empty}`}>
          <div>Your wishlist is empty</div>
        </div>
      ) : wishlist === null ? (
        <Loader />
      ) : (
        <div className={`${styles.wishlistProduct_container}`}>
          {wishlist.map((wishlistItem) => {
            console.log(wishlistItem);
            return (
              <WishlistCard wishlistItem={wishlistItem} setRoute={setRoute} />
            );
          })}
        </div>
      )}
    </div>
  );
};
