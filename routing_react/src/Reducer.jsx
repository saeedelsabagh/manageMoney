import { createContext, useReducer, useEffect, useState } from "react";
import { InputReducer, initialState } from "./components/inputReducer.jsx";

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(InputReducer, initialState);
  const [loaded, setLoaded] = useState(false);
  // Get transactions from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem("strlist");

    if (saved) {
      dispatch({
        type: "load",
        payload: {
          state: {
            transactions: JSON.parse(saved),
          },
        },
      });
    }

    setLoaded(true);
  }, []);

  // Save transactions to LocalStorage
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("strlist", JSON.stringify(state.transactions));
    }
  }, [state.transactions, loaded]);

  return (
    <TransactionContext.Provider value={{ state, dispatch }}>
      {children}
    </TransactionContext.Provider>
  );
};
