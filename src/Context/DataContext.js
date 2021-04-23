import { createContext, useContext, useReducer } from "react";
import { initialState, reducer } from "../Reducer/reducer";

const DataContext = createContext();

export const useData = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
