import React, { Component } from "react";
import axios from "axios";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import SearchBar from "./SearchBar/SearchBar";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import ResultsContainer from "./ResultsContainer/ResultsContainer";
import Spinner from "../../components/UI/Spinner/Spinner";

// URL for backend
let baseURL = "";
//baseURL = "https://localhost:44384";

class WeatherApp extends Component {
  state = {
    selectedCity: null,
    weatherCurrent: null,
    weatherFiveDays: null,
    weatherTenDays: null,
    showResults: false,
    loading: false
  };

  onSearchHandler = selection => {
    // Use Axios to get the current weather of the location plus the five and ten day forecast
    this.setState({ selectedCity: selection, loading: true });

    // Post the searched city to the backend
    axios({
      method: "POST",
      url:
        baseURL +
        "/api/values/Post?location=" +
        selection.lat +
        selection.lon +
        "&name=" +
        selection.name
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
          selection.lat +
          "&lon=" +
          selection.lon +
          "&appid=3084b8c99da8af75a8e7853b3cd9a5f7"
      )
      .then(response => {
        this.setState({ weatherCurrent: response.data });
        // After the previous query is done, ask for the five day forecast
        axios
          .get(
            "https://api.openweathermap.org/data/2.5/forecast?lat=" +
              selection.lat +
              "&lon=" +
              selection.lon +
              "&appid=3084b8c99da8af75a8e7853b3cd9a5f7"
          )
          .then(response => {
            // After the previous query is done, ask for the ten day forecast
            axios({
              method: "GET",
              url:
                "https://community-open-weather-map.p.rapidapi.com/forecast/daily",
              headers: {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
                "x-rapidapi-key":
                  "a9103aeb44mshf6d272c98b4b8bbp18f0c8jsn898845d5ecca"
              },
              params: {
                lat: selection.lat,
                lon: selection.lon,
                cnt: "10"
              }
            })
              .then(response => {
                this.setState({
                  weatherTenDays: response.data,
                  showResults: true,
                  loading: false
                });
              })
              .catch(error => {
                console.log(error);
                this.setState({ loading: false });
              });

            this.setState({
              weatherFiveDays: response.data
            });
          })
          .catch(error => {
            console.log(error);
            this.setState({ loading: false });
          });
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
      });
  };

  render() {
    let results = null;
    if (this.state.showResults && !this.state.loading) {
      results = (
        <ResultsContainer
          selectedStation={this.state.selectedStation}
          city={this.state.selectedCity.name}
          current={this.state.weatherCurrent}
          data5={this.state.weatherFiveDays}
          data10={this.state.weatherTenDays}
        ></ResultsContainer>
      );
    }
    let showSpinner = null;
    if (this.state.loading) {
      showSpinner = <Spinner />;
    }
    return (
      <Aux>
        <SearchBar search={this.onSearchHandler} />
        {showSpinner}
        {results}
      </Aux>
    );
  }
}

export default withErrorHandler(WeatherApp, axios);
