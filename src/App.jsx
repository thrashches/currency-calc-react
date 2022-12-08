import "./App.css";
import CurrencyList from "./views/CurrencyList";
import CurrencyCalc from "./views/CurrencyCalc";

function App() {
  return (
    <div className="App">
      <header></header>
      <main className="App-header">
        <CurrencyCalc />
        <CurrencyList />
      </main>
    </div>
  );
}

export default App;
