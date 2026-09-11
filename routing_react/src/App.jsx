import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Header from "./components/Header";
import Summary from "./components/Summary";
import TransactionForm from "./components/TransactionForm";
import Transactions from "./components/Transactions";
import "./App.css";
import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { TransactionProvider } from "./Reducer";

function App() {
 
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TransactionProvider>
        <Box className="app">
          <Container maxWidth="lg">
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />

            <Summary />

            <TransactionForm />

            <Transactions />
          </Container>
        </Box>
      </TransactionProvider>
    </ThemeProvider>
  );
}

export default App;
