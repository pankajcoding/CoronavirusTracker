import React from "react";
import { render } from "react-dom";

export default class TableBody extends React.Component {
  render() {
    let { pagination, rowsInTable } = this.props;
    const renderedCountries = this.props.countries.slice(
      (pagination - 1) * rowsInTable,
      (pagination - 1) * rowsInTable + rowsInTable
    );
    return (
      <tbody className="data-table-content">
        {renderedCountries.map((country, i) => (
          <tr className="data-table-row" key={i}>
            <td className="table-datacell datatype-string">
              {country.Country}
            </td>
            <td className="table-datacell datatype-numeric">
              {country.TotalConfirmed}
            </td>
            <td className="table-datacell datatype-numeric">
              {country.TotalRecovered}
            </td>
            <td className="table-datacell datatype-numeric">
              {country.TotalDeaths}
            </td>
          </tr>
        ))}
      </tbody>
    );
  }
}
