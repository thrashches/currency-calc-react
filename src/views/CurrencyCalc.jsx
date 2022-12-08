import React from "react";
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
  }

  componentDidMount() {
    const url = "https://www.cbr-xml-daily.ru/daily_json.js";
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          from: 1,
          to: 0,
          loading: false,
          currencies: data.Valute,
        });
      });
  }

  handleInputChange(event) {
    console.log(event.target.value);
    this.setState((prevState) => ({
      from: parseInt(event.target.value),
      to: convert(event.target.value, "USD", "RUB", this.state.currencies),
    }));
  }

  render() {
    if (this.state.loading) {
      return <h1>Loading</h1>;
    }
    const result = this.state.to || 0;
    return (
      <div className="calc-wrapper">
        <div className="col">
          <div className="col__header">USD</div>
          <div className="col__footer">
            <input
              type="number"
              placeholder="0.00"
              className="currency__input"
              onChange={this.handleInputChange}
            ></input>
          </div>
        </div>
        <div className="col">
          <div className="col__header">RUB</div>
          <div className="col__footer">
            <p>{result}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default CurrencyCalc;
