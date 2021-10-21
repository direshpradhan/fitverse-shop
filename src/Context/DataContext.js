import { createContext, useContext, useEffect, useReducer } from "react";
import { initialState, reducer } from "../Reducer/reducer";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { getCartProducts, getWishlistProducts } from "../services";
import { API_URL } from "../util/Constants";

const DataContext = createContext();

export const useData = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { token } = useAuth();
  console.log("context....");
  console.log(token);

  useEffect(() => {
    console.log("entered context...");
    (async function getProducts() {
      try {
        const productsResponse = await axios.get(`${API_URL}/products`);
        productsResponse.status === 200 &&
          dispatch({
            type: "INITIALIZE_PRODUCTS",
            payload: productsResponse.data.products,
          });
        console.log(token);
        if (token) {
          const cartResponse = await getCartProducts();
          const wishlistResponse = await getWishlistProducts();
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
        } else {
          dispatch({ type: "RESET_STATE" });
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [token]);

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
