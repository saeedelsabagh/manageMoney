import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import WalletIcon from "@mui/icons-material/Wallet";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function Header({darkMode,setDarkMode}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 3,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <WalletIcon
          sx={{
            fontSize: 42,
            color: "#16a34a",
          }}
        />

        <Box>
          <Typography variant="h5" fontWeight="bold">
            Expense Tracker
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Track your income and expenses easily
          </Typography>
        </Box>
      </Box>

      <IconButton onClick={() => setDarkMode(!darkMode) }>
        <DarkModeIcon />
      </IconButton>
    </Box>
  );
}