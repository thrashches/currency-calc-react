import React from "react";
import "./CurrencyList.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

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
        <TableRow key={key}>
          <TableCell>{key}</TableCell>
          <TableCell>{this.state.currencies[key].Name}</TableCell>
          <TableCell>{this.state.currencies[key].Value}</TableCell>
        </TableRow>
      );
    });
    return (
      <TableContainer component={Paper} sx={{maxWidth: 650}}>
        <Table sx={{ maxWidth: 650 }}>
          <TableBody>
            {listItems}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default CurrencyList;
