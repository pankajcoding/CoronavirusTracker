import React from "react";
import { render } from "react-dom";

import TableHead from "./TableHead";
import TableBody from "./TableBody";

export default class CountriesTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: 1,
      rowsInTable: 10,
      countries: this.props.countries,
      unfilteredCountries: this.props.countries,
      ordering: {
        Country: 0,
        TotalConfirmed: 0,
        TotalRecovered: 0,
        TotalDeaths: 0
      }
    };

    this.handleChange = this.handleChange.bind(this);
  }

  nextPage() {
    if (this.state.pagination === Math.ceil(this.state.countries.length / 10))
      return;
    this.setState({
      pagination: this.state.pagination + 1,
      ...this.state.countries
    });
  }

  prevPage() {
    if (this.state.pagination === 1) return;
    this.setState({
      pagination: this.state.pagination - 1,
      ...this.state.countries
    });
  }

  sortTable(parameter) {
    let countries = this.state.countries;
    if (this.state.ordering[parameter]) {
      countries = countries.sort((a, b) => {
        if (a[parameter] < b[parameter]) {
          return -1;
        }
        if (a[parameter] > b[parameter]) {
          return 1;
        }
        return 0;
      });
    } else {
      countries = countries.sort((a, b) => {
        if (a[parameter] > b[parameter]) {
          return -1;
        }
        if (a[parameter] < b[parameter]) {
          return 1;
        }
        return 0;
      });
    }

    this.setState({
      ...this.state,
      countries: countries,
      pagination: 1,
      ordering: {
        ...this.state.ordering,
        [parameter]: !this.state.ordering[parameter]
      }
    });
  }

  filterCountries(event) {
    let name = event.target.value;
    let filteredCountries = this.state.unfilteredCountries.filter((place) => {
      const regex = new RegExp(name, "gi");
      return place.Country.match(regex);
    });

    if (filteredCountries.length == 0) {
      this.setState({
        ...this.state,
        countries: filteredCountries,
        SearchMessage: `no matches found with string '${name}'`,
        pagination: 1
      });
    } else {
      this.setState({
        ...this.state,
        countries: filteredCountries,
        SearchMessage: "",
        pagination: 1
      });
    }
  }

  handleChange(event) {
    this.setState({ pagination: event.target.value });
  }
  render() {
    return (
      <section className="data-table">
        <header className="main-table-header">
          <h1 className="table-header--title">Countries</h1>
        </header>
        <div className="form-item search-filter">
          <input
            onChange={this.filterCountries.bind(this)}
            type="text"
            id="example"
            placeholder="&nbsp;"
          />
          <label htmlFor="example" data-label="Search"></label>
        </div>
        <div className="searchMessage">{this.state.SearchMessage}</div>

        <div className="main-table-wrapper">
          <table className="main-table-content">
            <TableHead sortTable={this.sortTable.bind(this)} />
            <TableBody
              countries={this.state.countries}
              pagination={this.state.pagination}
              rowsInTable={this.state.rowsInTable}
            />
          </table>
        </div>
        <footer className="main-table-footer">
          <span className="page-input">
            <input
              type="number"
              value={this.state.pagination}
              onChange={this.handleChange}
            />
          </span>
          <span className="rows-amount">
            {` of `}
            {Math.ceil(this.state.countries.length / 10)} {` pages `}
          </span>
          <span className="table-pagination">
            <i onClick={this.prevPage.bind(this)} className="material-icons">
              keyboard_arrow_left
            </i>
            <i onClick={this.nextPage.bind(this)} className="material-icons">
              keyboard_arrow_right
            </i>
          </span>
        </footer>
      </section>
    );
  }
}
