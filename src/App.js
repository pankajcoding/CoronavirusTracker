import React from "react";
import "./styles.css";

import GlobalFigure from "./components/GlobalFigure";
import CountriesTable from "./components/CountriesTable";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://api.covid19api.com/summary")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            global: result.Global,
            countries: result.Countries,
            result: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const { error, isLoaded, countries, global } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="app-container">
          <div className="app-wrapper">
            <h2>🦠 CoronaVirus Tracker</h2>
            <GlobalFigure {...global} />
            <CountriesTable countries={countries} />
          </div>
        </div>
      );
    }
  }
}
