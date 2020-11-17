import React from "react";

export default function TableHead(props) {
  let countryOrder = 1;
  return (
    <thead className="data-table-header">
      <tr className="data-table-row">
        <td
          onClick={props.sortTable.bind(null, "Country")}
          className="table-datacell datatype-string"
        >
          Name
        </td>
        <td
          onClick={props.sortTable.bind(null, "TotalConfirmed")}
          className="table-datacell datatype-numeric"
        >
          Confirmed
        </td>
        <td
          onClick={props.sortTable.bind(null, "TotalRecovered")}
          className="table-datacell datatype-numeric"
        >
          Recovered
        </td>
        <td
          onClick={props.sortTable.bind(null, "TotalDeaths")}
          className="table-datacell datatype-numeric"
        >
          Deaths
        </td>
      </tr>
    </thead>
  );
}
