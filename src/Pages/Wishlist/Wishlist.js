import { useData } from "../../Context/DataContext";
import { WishlistCard } from "../../Components/WishlistCard/WishlistCard";

export const Wishlist = ({ setRoute }) => {
  const { state } = useData();
  return (
    <div>
      <h1>Wishlist</h1>
      <div className="App" style={{ display: "flex", flexWrap: "wrap" }}>
        {state.wishlist.map((wishlistItem) => (
          <WishlistCard wishlistItem={wishlistItem} setRoute={setRoute} />
        ))}
      </div>
    </div>
  );
};
