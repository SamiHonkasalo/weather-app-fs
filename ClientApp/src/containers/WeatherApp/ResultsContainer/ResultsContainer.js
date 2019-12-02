import React, { Component } from "react";

import styles from "./ResultsContainer.module.css";
import Tabs from "../../../components/UI/Tabs/Tabs";
import WeatherChart from "../WeatherChart/WeatherChart";
import WeatherCard from "../../../components/Weather/WeatherCard/WeatherCard";

class ResultsContainer extends Component {
  state = {
    selectedView: 0,
    loading: false
  };

  // Handler to pass the clicked tab to the main container
  tabChangedHandler = tabNumber => {
    const selectedView = parseInt(tabNumber);
    this.setState({ selectedView: selectedView });
  };
  render() {
    // Rain & snow data for the weather card
    // Check if exists, otherwise they are 0.
    let rain = 0;
    let snow = 0;
    if (typeof this.props.current.rain !== "undefined") {
      if (typeof this.props.current.rain["1h"] !== "undefined") {
        rain = this.props.current.rain["1h"];
      }
    }
    if (typeof this.props.current.snow !== "undefined") {
      if (typeof this.props.current.snow["1h"] !== "undefined") {
        snow = this.props.current.snow["1h"];
      }
    }

    // Selected view 0 = current/5days, 1 = 10 day forecast
    let results = null;
    if (this.state.selectedView === 0) {
      results = (
        <div className={styles.ResultsContainer}>
          <div>
            <WeatherCard
              city={this.props.city}
              weatherTime={this.props.current.dt}
              country={this.props.current.sys.country}
              clouds={this.props.current.clouds.all}
              rain={rain}
              snow={snow}
              wind={this.props.current.wind.speed}
              weatherDesc={this.props.current.weather[0].description}
              weatherIcon={this.props.current.weather[0].icon}
              location={this.props.current.name}
              temperature={this.props.current.main.temp}
              humidity={this.props.current.main.humidity}
              pressure={this.props.current.main.pressure}
              sunset={this.props.current.sys.sunset}
              sunrise={this.props.current.sys.sunrise}
              timezone={this.props.current.timezone}
            />
          </div>
          <div>
            <WeatherChart data={this.props.data5} type={0} />
          </div>
        </div>
      );
    }
    if (this.state.selectedView === 1) {
      results = (
        <div className={styles.ResultsContainer}>
          <h1 className={styles.Title}> {this.props.city} </h1>
          <WeatherChart data={this.props.data10} type={1} />
        </div>
      );
    }
    return (
      <div className={styles.Wrapper}>
        <Tabs
          className={styles.Tabs}
          clicked={n => this.tabChangedHandler(n)}
        />
        {results}
      </div>
    );
  }
}

export default ResultsContainer;
