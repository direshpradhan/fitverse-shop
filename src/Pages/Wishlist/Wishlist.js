import { useData } from "../../Context/DataContext";
import { WishlistCard } from "../../Components/WishlistCard/WishlistCard";
import styles from "./Wishlist.module.css";

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
      {wishlist?.length > 0 ? (
        <div className="App" style={{ display: "flex", flexWrap: "wrap" }}>
          {wishlist.map((wishlistItem) => (
            <WishlistCard wishlistItem={wishlistItem} setRoute={setRoute} />
          ))}
        </div>
      ) : (
        <div className={`${styles.wishlist_empty}`}>
          <div>Your wishlist is empty</div>
        </div>
      )}
    </div>
  );
};
