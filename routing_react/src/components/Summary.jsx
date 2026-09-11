import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useContext } from "react";
import { TransactionContext } from "../Reducer";

export default function Summary() {
  const { state, dispatch } = useContext(TransactionContext);

  let totalIncome = 0;

  state.transactions.forEach((t) => {
    if (t.type === "Income") {
      totalIncome += t.amount;
    }
  });

  let totalOutcome = 0;

  state.transactions.forEach((t) => {
    if (t.type === "Expense") {
      totalOutcome += t.amount;
    }
  });

  let incomeCount = 0;

  state.transactions.forEach((t) => {
    if (t.type === "Income") {
      incomeCount++;
    }
  });

  let outcomeCount = 0;

  state.transactions.forEach((t) => {
    if (t.type === "Outcome") {
      outcomeCount--;
    }
  });

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "repeat(3, 1fr)",
        },
        gap: 2,
        mb: 3,
      }}
    >
      {/* Income */}
      <Card
        sx={{
          backgroundColor: "#ecfdf5",
          borderRadius: 3,
          boxShadow: "none",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              width: 58,
              height: 58,
              borderRadius: "50%",
              backgroundColor: "#d1fae5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TrendingUpIcon sx={{ color: "#16a34a", fontSize: 32 }} />
          </Box>

          <Box>
            <Typography variant="body2" color="text.secondary">
              Total Income
            </Typography>

            <Typography variant="h5" fontWeight={700} sx={{ color: "#16a34a" }}>
              {totalIncome}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {incomeCount}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Expenses */}
      <Card
        sx={{
          backgroundColor: "#fff1f2",
          borderRadius: 3,
          boxShadow: "none",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              width: 58,
              height: 58,
              borderRadius: "50%",
              backgroundColor: "#ffe4e6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TrendingDownIcon sx={{ color: "#dc2626", fontSize: 32 }} />
          </Box>

          <Box>
            <Typography variant="body2" color="text.secondary">
              Total OutCome
            </Typography>

            <Typography variant="h5" fontWeight={700} sx={{ color: "#dc2626" }}>
              {totalOutcome}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {outcomeCount}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Balance */}
      <Card
        sx={{
          backgroundColor: "#eff6ff",
          borderRadius: 3,
          boxShadow: "none",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              width: 58,
              height: 58,
              borderRadius: "50%",
              backgroundColor: "#dbeafe",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AccountBalanceWalletIcon sx={{ color: "#2563eb", fontSize: 30 }} />
          </Box>

          <Box>
            <Typography variant="body2" color="text.secondary">
              Current Balance
            </Typography>

            <Typography variant="h5" fontWeight={700} sx={{ color: "#2563eb" }}>
              {state.balance}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Income - Expenses
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
