
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext, useMemo, useState } from "react";
import { TransactionContext } from "../Reducer";

export default function Transactions() {
  const { state, dispatch } = useContext(TransactionContext);

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  function handleDeleteClick(id) {
    dispatch({
      type: "delete",
      payload: id,
    });
  }

  const filteredTransactions = useMemo(() => {
    const transactions = Array.isArray(state.transactions)
      ? state.transactions
      : [];

    const normalizedSearch = search.trim().toLowerCase();

    return transactions.filter((transaction) => {
      const matchesType =
        filter === "All" || transaction.type === filter;

      const description =
        typeof transaction.description === "string"
          ? transaction.description
          : "";

      const matchesSearch = description
        .toLowerCase()
        .includes(normalizedSearch);

      return matchesType && matchesSearch;
    });
  }, [state.transactions, filter, search]);

  const formatAmount = (amount) => {
    const numericAmount = Number(amount);

    return (Number.isFinite(numericAmount) ? Math.abs(numericAmount) : 0)
      .toFixed(2);
  };

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: {
              xs: "stretch",
              md: "center",
            },
            gap: 2,
            flexDirection: {
              xs: "column",
              md: "row",
            },
          }}
        >
          <Typography variant="h6" fontWeight={700}>
            Transactions
          </Typography>

          <TextField
            size="small"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: { xs: "100%", md: 250 } }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        {/* Filters */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            mt: 2,
            mb: 2,
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            {["All", "Income", "Expense"].map((type) => (
              <Button
                key={type}
                variant={filter === type ? "contained" : "outlined"}
                onClick={() => setFilter(type)}
              >
                {type === "Expense" ? "Expenses" : type}
              </Button>
            ))}
          </Box>

          <Typography variant="body2" color="text.secondary">
            {filteredTransactions.length} transactions
          </Typography>
        </Box>

        {/* Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => {
                  const isIncome = transaction.type === "Income";

                  return (
                    <TableRow key={transaction.id} hover>
                      <TableCell>
                        <Typography fontWeight={500}>
                          {transaction.description || "Untitled"}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={transaction.category || "Other"}
                          size="small"
                        />
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={isIncome ? "Income" : "Expense"}
                          size="small"
                          color={isIncome ? "success" : "error"}
                        />
                      </TableCell>

                      <TableCell>
                        <Typography fontWeight={700}>
                          {isIncome ? "+" : "-"}$
                          {formatAmount(transaction.amount)}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        {transaction.date || "—"}
                      </TableCell>

                      <TableCell align="center">
                        <IconButton
                          color="error"
                          aria-label="Delete transaction"
                          onClick={() =>
                            handleDeleteClick(transaction.id)
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography color="text.secondary" py={3}>
                      No transactions found.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
