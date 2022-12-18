import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CurrencyList from "./views/CurrencyList";
import CurrencyCalc from "./views/CurrencyCalc";
import Navbar from "./components/Nav";
import { Routes, Route } from "react-router-dom";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <header>
          <Navbar />
        </header>
        <main className="App-main">
          <Routes>
            <Route path="/" element={<CurrencyCalc />} />
            <Route path="currencies/" element={<CurrencyList />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
