export const initialState = {
  description: "",
  amount: "",
  type: "Income",
  category: "Food",
  balance: 0,
  transactions: [],
};

export function InputReducer(state, action) {
  switch (action.type) {
    case "SET_DESCRIPTION":
      return {
        ...state,
        description: action.payload,
      };

    case "SET_AMOUNT":
      return {
        ...state,
        amount: action.payload,
      };

    case "SET_TYPE":
      return {
        ...state,
        type: action.payload,
      };

    case "SET_CATEGORY":
      return {
        ...state,
        category: action.payload,
      };

    case "ADD_TRANSACTION":
      const newTransaction = {
        id: Date.now(),
        description: state.description,
        amount: Number(state.amount),
        type: state.type,
        category: state.category,
        date: new Date().toLocaleDateString(),
      };

      return {
        ...state,
        transactions: [...state.transactions, newTransaction],
        description: "",
        amount: "",

        balance:
          state.type === "Income"
            ? state.balance + Number(state.amount)
            : state.balance - Number(state.amount),
      };

    case "delete":
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== action.payload
        ),
      };

    case "totalIn":
      let total = 0;

      state.transactions.forEach((t) => {
        if (t.type === "Income") {
          total += t.amount;
        }
      });

      return {
        ...state,
        totalIn: total,
      };

    case "load":
      return {
        ...initialState,
        ...action.payload.state,
      };

    default:
      return state;
  }
}