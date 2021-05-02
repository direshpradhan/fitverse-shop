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
        const response = await axios.get(
          "https://Ecom-Backend.pdiresh.repl.co/products"
        );
        dispatch({
          type: "INITIALIZE_PRODUCTS",
          payload: response.data.products,
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
