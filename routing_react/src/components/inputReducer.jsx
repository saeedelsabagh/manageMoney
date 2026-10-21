
export const initialState = {
  description: "",
  amount: "",
  type: "Income",
  category: "Food",
  balance: 0,
  transactions: [],
  totalIn: 0,
};

const calculateBalance = (transactions) => {
  return transactions.reduce((balance, transaction) => {
    const amount = Number(transaction.amount) || 0;

    if (transaction.type === "Income") {
      return balance + amount;
    }

    if (transaction.type === "Expense") {
      return balance - amount;
    }

    return balance;
  }, 0);
};

const calculateTotalIn = (transactions) => {
  return transactions.reduce((total, transaction) => {
    return transaction.type === "Income"
      ? total + (Number(transaction.amount) || 0)
      : total;
  }, 0);
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

    case "ADD_TRANSACTION": {
      const amount = Number(state.amount);

      // Reject invalid amounts and empty descriptions
      if (
        !state.description.trim() ||
        state.amount === "" ||
        !Number.isFinite(amount) ||
        amount <= 0
      ) {
        return state;
      }

      // Prevent expenses greater than the available balance
      const currentBalance = calculateBalance(state.transactions);

      if (state.type === "Expense" && amount > currentBalance) {
        return state;
      }

      const newTransaction = {
        id: Date.now(),
        description: state.description.trim(),
        amount,
        type: state.type,
        category: state.category,
        date: new Date().toLocaleDateString(),
      };

      const transactions = [...state.transactions, newTransaction];

      return {
        ...state,
        transactions,
        balance: calculateBalance(transactions),
        totalIn: calculateTotalIn(transactions),
        description: "",
        amount: "",
      };
    }

   
case "delete": {
  const transactions = state.transactions.filter(
    (transaction) => transaction.id !== action.payload
  );

  const balance = transactions.reduce((total, transaction) => {
    const amount = Number(transaction.amount) || 0;

    return transaction.type === "Income"
      ? total + amount
      : transaction.type === "Expense"
      ? total - amount
      : total;
  }, 0);

  const totalIn = transactions.reduce((total, transaction) => {
    return transaction.type === "Income"
      ? total + (Number(transaction.amount) || 0)
      : total;
  }, 0);

  return {
    ...state,
    transactions,
    balance,
    totalIn,
  };
}


    case "totalIn":
      return {
        ...state,
        totalIn: calculateTotalIn(state.transactions),
      };

    case "load": {
      const savedState = action.payload?.state ?? {};
      const transactions = Array.isArray(savedState.transactions)
        ? savedState.transactions
        : [];

      return {
        ...initialState,
        ...savedState,
        transactions,
        balance: calculateBalance(transactions),
        totalIn: calculateTotalIn(transactions),
      };
    }

    default:
      return state;
  }
}
