import React from "react";
import { PieChart } from "react-minimal-pie-chart";
import DonutChart from "react-donut-chart";

export default class GlobalFigure extends React.Component {
  render() {
    const { TotalConfirmed, TotalDeaths, TotalRecovered } = this.props;
    const data = [
      {
        label: "Active",
        value: TotalConfirmed - (TotalDeaths + TotalRecovered)
      },
      {
        label: "Recovered",
        value: TotalRecovered
      },
      {
        label: "Deaths",
        value: TotalDeaths
      }
    ];

    const colors = ["#000000", "#60b644", "#ff4361"];
    return (
      <section className="global-card">
        <div className="section-title">World Statistics</div>
        <div className="statistics-wrapper">
          <div className="card">
            <p className="card-title">Total Cases:</p>
            <p className="card-figure">{TotalConfirmed}</p>
          </div>

          <div className="card">
            <p className="card-title ">Total Deaths:</p>
            <p className="card-figure pink-accent">{TotalDeaths}</p>
          </div>
          <div className="card">
            <p className="card-title"> Total Recovered:</p>
            <p className="card-figure green-accent"> {TotalRecovered}</p>
          </div>
        </div>
        <DonutChart colors={colors} data={data} />
      </section>
    );
  }
}
