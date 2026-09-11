import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

import { useContext } from "react";
import { TransactionContext } from "../Reducer";

export default function TransactionForm() {
  const { state, dispatch } = useContext(TransactionContext);

  function handleDescriptionInput(e) {
    dispatch({
      type: "SET_DESCRIPTION",
      payload: e.target.value,
    });
  }

  function handleTypeInput(e) {
    dispatch({
      type: "SET_TYPE",
      payload: e.target.value,
    });
  }

  function handleAmountInput(e) {
    dispatch({
      type: "SET_AMOUNT",
      payload: e.target.value,
    });
  }

  function handleCategoryInput(e) {
    dispatch({
      type: "SET_CATEGORY",
      payload: e.target.value,
    });
  }

  function handleAddClick() {
    dispatch({
      type: "ADD_TRANSACTION",
    });
  }

  return (
    <Card
      sx={{
        borderRadius: 3,
        mb: 3,
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight={700} mb={2.5}>
          Add New Transaction
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1.5fr 0.8fr 0.8fr 0.8fr auto",
            },
            gap: 2,
            alignItems: "center",
          }}
        >
          <TextField
            label="Description"
            placeholder="e.g. Salary, Groceries..."
            fullWidth
            value={state.description}
            onChange={handleDescriptionInput}
          />

          <TextField
            label="Amount"
            placeholder="0.00"
            type="number"
            fullWidth
            value={state.amount}
            onChange={handleAmountInput}
          />

          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>

            <Select label="Type" value={state.type} onChange={handleTypeInput}>
              <MenuItem value="Income">Income</MenuItem>
              <MenuItem value="Expense" disabled={Number(state.amount) > state.balance}>Outcome</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>

            <Select
              label="Category"
              value={state.category}
              onChange={handleCategoryInput}
            >
              <MenuItem value="Food">Food</MenuItem>
              <MenuItem value="Work">Work</MenuItem>
              <MenuItem value="Transport">Transport</MenuItem>
              <MenuItem value="Entertainment">Entertainment</MenuItem>
              <MenuItem value="Education">Education</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              height: 56,
              minWidth: 170,
              backgroundColor: "#16a34a",
              "&:hover": {
                backgroundColor: "#15803d",
              },
            }}
            disabled={Number(state.amount) > state.balance&&state.type=="Expense"}
            onClick={handleAddClick}
          >
            Add Transaction
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
