import React, { Component } from "react";
import axios from "axios";

import styles from "./SearchHistory.module.css";

// URL for backend
let baseURL = "";
//baseURL = "https://localhost:44384";

class SearchHistory extends Component {
    state = {
        searchHistory: []
    };

    componentDidMount() {
        // Get a list of all the searched locations and the amount of times they've been searched
        axios({
            method: "GET",
            url: baseURL + "/api/values/Get"
        })
            .then(response => {
                console.log(response);
                let searchData = [];
                response.data.forEach(el => {
                    searchData.push({
                        name: el.name,
                        count: el.count
                    });
                });
                this.setState({ searchHistory: searchData });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div className={styles.InfoContainer}>
                <h1>All searched locations</h1>
                <h3>In order of most searches</h3>
                <ul>
                    {this.state.searchHistory.map(location => (
                        <li key={location.name}>
                            {location.name} has been searched for {location.count} time(s)
            </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default SearchHistory;