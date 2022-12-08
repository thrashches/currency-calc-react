import React from "react";
import "./CurrencyList.css";

class CurrencyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      currencies: {},
    };
  }

  componentDidMount() {
    const url = "https://www.cbr-xml-daily.ru/daily_json.js";
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({
          loading: false,
          currencies: data.Valute,
        });
      });
  }

  render() {
    if (this.state.loading) {
      return <h1>Loading</h1>;
    }
    const listItems = Object.keys(this.state.currencies).map((key) => {
      return (
        <tr>
          <td>{key}</td>
          <td>{this.state.currencies[key].Name}</td>
          <td>{this.state.currencies[key].Value}</td>
        </tr>
      );
    });
    return (
      <table className="table">
        <tbody>{listItems}</tbody>
      </table>
    );
  }
}

export default CurrencyList;
