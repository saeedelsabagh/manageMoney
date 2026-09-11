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
import { useContext } from "react";
import { TransactionContext } from "../Reducer";
import { useMemo, useState } from "react";

export default function Transactions() {
  const { state, dispatch } = useContext(TransactionContext);

  function handleDeleteClick(id) {
    dispatch({
      type: "delete",
      payload: id,
    });
  }

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const clickToRender = useMemo(() => {
    let transactions = state.transactions;

    if (filter === "Income") {
      transactions = transactions.filter((t) => {
        return t.type === "Income";
      });
    } else if (filter === "Expense") {
      transactions = transactions.filter((t) => {
        return t.type === "Expense";
      });
    }

    return transactions.filter((t) => {
      return t.description.toLowerCase().includes(search.toLowerCase());
    });
  }, [state.transactions, filter, search]);
  const transactionList = clickToRender.map((t) => {
    return (
      <TableRow key={t.id} hover>
        <TableCell>
          <Typography fontWeight={500}>{t.description}</Typography>
        </TableCell>

        <TableCell>
          <Chip label={t.category} size="small" />
        </TableCell>

        <TableCell>
          <Chip
            label={t.type}
            size="small"
            color={t.type === "Income" ? "success" : "error"}
          />
        </TableCell>

        <TableCell>
          <Typography fontWeight={700}>
            {t.type === "Income" ? "+" : "-"}${Math.abs(t.amount).toFixed(2)}
          </Typography>
        </TableCell>

        <TableCell>{t.date}</TableCell>

        <TableCell align="center">
          <IconButton color="error" onClick={() => handleDeleteClick(t.id)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  });

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
            sx={{ width: { xs: "100%", md: 250 } }}
            onChange={(e) => setSearch(e.target.value)}
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
            <Button value="All" onClick={(e) => setFilter(e.target.value)}>
              All
            </Button>

            <Button value="Income" onClick={(e) => setFilter(e.target.value)}>
              Income
            </Button>

            <Button value="Expense" onClick={(e) => setFilter(e.target.value)}>
              Outcome
            </Button>
          </Box>
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

            <TableBody>{transactionList}</TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
