import { createContext, useContext, useEffect, useReducer } from "react";
import { initialState, reducer } from "../Reducer/reducer";
import axios from "axios";

const DataContext = createContext();

export const useData = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async function getProducts() {
      try {
        const productsResponse = await axios.get(
          "https://Fitverse-Shop-Backend.pdiresh.repl.co/products"
        );
        const cartResponse = await axios.get(
          "https://Fitverse-Shop-Backend.pdiresh.repl.co/cart"
        );
        const wishlistResponse = await axios.get(
          "https://Fitverse-Shop-Backend.pdiresh.repl.co/wishlist"
        );
        dispatch({
          type: "INITIALIZE_PRODUCTS",
          payload: productsResponse.data.products,
        });
        // console.log(cartResponse);
        // console.log(wishlistResponse);
        dispatch({
          type: "INITIALIZE_CART",
          payload: cartResponse.data.cartItems,
        });
        dispatch({
          type: "INITIALIZE_WISHLIST",
          payload: wishlistResponse.data.wishItems,
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <DataContext.Provider
      value={{
        state,
        dispatch,
        products: state.products,
        cart: state.cart,
        wishlist: state.wishlist,
        sortBy: state.sortBy,
        fastDeliveryOnly: state.fastDeliveryOnly,
        showInventoryAll: state.showInventoryAll,
        priceSlider: state.priceSlider,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
