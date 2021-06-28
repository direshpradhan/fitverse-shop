import { createContext, useContext, useEffect, useReducer } from "react";
import { initialState, reducer } from "../Reducer/reducer";
import axios from "axios";
import { useAuth } from "./AuthContext";

const DataContext = createContext();

export const useData = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { token } = useAuth();

  useEffect(() => {
    (async function getProducts() {
      try {
        const productsResponse = await axios.get(
          "https://Fitverse-Shop-Backend.pdiresh.repl.co/products"
        );
        productsResponse.status === 200 &&
          dispatch({
            type: "INITIALIZE_PRODUCTS",
            payload: productsResponse.data.products,
          });
        console.log(token);
        if (token) {
          const cartResponse = await axios.get(
            "https://Fitverse-Shop-Backend.pdiresh.repl.co/cart",
            { headers: { authorization: `Bearer ${token}` } }
          );
          const wishlistResponse = await axios.get(
            "https://Fitverse-Shop-Backend.pdiresh.repl.co/wishlist",
            { headers: { authorization: `Bearer ${token}` } }
          );

          console.log("cart", cartResponse);
          console.log("wishlist", wishlistResponse);
          cartResponse.status === 200 &&
            dispatch({
              type: "INITIALIZE_CART",
              payload: cartResponse.data.cartItems,
            });
          wishlistResponse.status === 200 &&
            dispatch({
              type: "INITIALIZE_WISHLIST",
              payload: wishlistResponse.data.wishlistItems,
            });
        }
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
        filterByCategories: state.filterByCategories,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
