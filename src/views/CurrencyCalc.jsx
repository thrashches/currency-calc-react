import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { convert } from "../utils/converter";
import "./CurrencyCalc.css";

class CurrencyCalc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      currencies: {},
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCurrencyFromChange = this.handleCurrencyFromChange.bind(this);
    this.handleCurrencyToChange = this.handleCurrencyToChange.bind(this);
  }

  componentDidMount() {
    const url = "https://www.cbr-xml-daily.ru/daily_json.js";
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const currencies = data.Valute;
        currencies.RUB = {
          Nominal: 1,
          Value: 1,
          Name: 'Российский рубль'
        }
        
        this.setState({
          currencyFrom: this.state.currencyFrom ?? "USD",
          currencyTo: this.state.currencyTo ?? "RUB",
          loading: false,
          currencies: currencies,
        });
      });
  }

  handleInputChange(event) {
    this.setState((prevState) => ({
      from: parseInt(event.target.value),
      to: convert(
        parseInt(event.target.value),
        this.state.currencyFrom,
        this.state.currencyTo,
        this.state.currencies
      ),
    }));
  }

  handleCurrencyFromChange(event, value) {
    this.setState((prevState) => ({
      currencyFrom: value,
      from: this.state.from,
      to: convert(
        this.state.from,
        value,
        this.state.currencyTo,
        this.state.currencies
      ),
    }));
  }

  handleCurrencyToChange(event, value) {
    this.setState((prevState) => ({
      currencyTo: value,
      from: this.state.from,
      to: convert(
        this.state.from,
        this.state.currencyFrom,
        value,
        this.state.currencies
      ),
    }));
  }

  render() {
    if (this.state.loading) {
      return <h1>Loading</h1>;
    }
    const result = this.state.to || 0;
    const options = Object.keys(this.state.currencies).map((key) => {
      return key;
    });
    if (!options.includes("RUB")) {
      options.push("RUB");
    }

    return (
      <div className="calc-wrapper">
        <div className="col">
          <div className="col__header">
            <Autocomplete
              options={options}
              value={this.state.currencyFrom}
              disableClearable={true}
              onChange={this.handleCurrencyFromChange}
              renderInput={(params) => <TextField {...params} label="Валюта" />}
            />
          </div>
          <div className="col__footer">
            <TextField
              type="number"
              placeholder="0.00"
              onChange={this.handleInputChange}
              fullWidth={true}
            />
          </div>
        </div>
        <div className="col">
          <div className="col__header">
            <Autocomplete
              options={options}
              value={this.state.currencyTo}
              disableClearable={true}
              onChange={this.handleCurrencyToChange}
              renderInput={(params) => <TextField {...params} label="Валюта" />}
            />
          </div>
          <div className="col__footer">
            <Typography variant="body1" align="center">{result}</Typography>

          </div>
        </div>
      </div>
    );
  }
}

export default CurrencyCalc;
