
import {
  createContext,
  useReducer,
  useEffect,
  useState,
} from "react";

import {
  InputReducer,
  initialState,
} from "./components/inputReducer.jsx";

export const TransactionContext = createContext(null);

export const TransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(InputReducer, initialState);
  const [loaded, setLoaded] = useState(false);

  // Load transactions from LocalStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("strlist");

      if (saved) {
        const transactions = JSON.parse(saved);

        if (Array.isArray(transactions)) {
          dispatch({
            type: "load",
            payload: {
              state: { transactions },
            },
          });
        }
      }
    } catch (error) {
      console.error("Failed to load saved transactions:", error);
    } finally {
      setLoaded(true);
    }
  }, []);

  // Save transactions only after loading has finished
  useEffect(() => {
    if (!loaded) return;

    try {
      localStorage.setItem(
        "strlist",
        JSON.stringify(state.transactions)
      );
    } catch (error) {
      console.error("Failed to save transactions:", error);
    }
  }, [state.transactions, loaded]);

  return (
    <TransactionContext.Provider value={{ state, dispatch }}>
      {children}
    </TransactionContext.Provider>
  );
};

