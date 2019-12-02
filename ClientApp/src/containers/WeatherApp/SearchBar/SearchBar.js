import React, { Component } from "react";
import axios from "axios";

import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";

import styles from "./SearchBar.module.css";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";

class SearchBar extends Component {
  state = {
    searchResults: [],
    selectedResult: null,
    resultCount: 0,
    inputValue: "",
    selectionIndex: 0,
    showResults: false,
    touched: false,
    loading: false,
    searchEnabled: false
  };

  onChangeHandler = e => {
    // Variable (constant) for the input field
    const field = e.target;

    this.setState({
      inputValue: field.value,
      touched: true,
      searchEnabled: false
    });

    // Use ajax to get a list of cities that can be found with the selected query
    // Only search if more than X characters have been inserted
    if (field.value.length >= 4) {
      // Replace Ä with A, Ö with O after converting to lowercase
      let srchStr = field.value.toLowerCase(field.value);
      srchStr = srchStr.replace("ä", "a");
      srchStr = srchStr.replace("ö", "o");
      this.setState({ loading: true });
      axios({
        method: "GET",
        url:
          "https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php",
        headers: {
          "content-type": "application/octet-stream",
          "x-rapidapi-host": "devru-latitude-longitude-find-v1.p.rapidapi.com",
          "x-rapidapi-key": "a9103aeb44mshf6d272c98b4b8bbp18f0c8jsn898845d5ecca"
        },
        params: {
          location: srchStr
        }
      })
        .then(response => {
          // Initialize the result array
          let results = [];
          // Create a copy of the results for later usage
          let arr = { ...response.data.Results };
          // Map the results to an array of result-objects IF the result type is city
          for (const key in arr) {
            if (arr.hasOwnProperty(key)) {
              const element = arr[key];
              // Only add the result if it's a city
              if (element.type === "city") {
                results.push({
                  name: element.name,
                  country: element.c,
                  lat: element.lat,
                  lon: element.lon,
                  sel: false
                });
              }
            }
          }
          this.setState({
            searchResults: results,
            resultCount: results.length,
            showResults: true,
            loading: false
          });
        })
        .catch(error => {
          this.setState({ loading: false, touched: false });
        });
    }

    // If the field is empty -> do not show results and init the state array
    if (field.value === "") {
      this.setState({
        searchResults: [],
        showResults: false,
        touched: false,
        selectionIndex: 0,
        searchEnabled: false,
        selectedResult: null
      });
    }
  };

  onKeyDownHandler = e => {
    // Use KeyCodes to cycle through the results
    // First set the limits
    const lowLim = 0;
    const highLim = this.state.resultCount;
    // Switch-case structure used for different keycodes (up, down, enter, esc)
    switch (e.keyCode) {
      // ArrowDown, keycode 40
      case 40:
        // Check that the selection is between the limits
        if (
          this.state.selectionIndex >= lowLim &&
          this.state.selectionIndex < highLim
        ) {
          // Copy the old index and increment it by one
          let newIndex = this.state.selectionIndex + 1;
          // Take a deep copy of the results in the state
          const oldResults = [...this.state.searchResults];
          // Set the new selection to true and the old one to false
          oldResults[newIndex - 1].sel = true;
          // Special case for first index, cannot set the previous one to false because it does not exist
          if (newIndex > 1) {
            oldResults[newIndex - 2].sel = false;
          }
          const newResults = oldResults;
          this.setState({
            searchResults: newResults,
            selectionIndex: newIndex
          });
          break;
        }

        // If selection === max -> move to lowlim AND there are more than 1 result
        if (this.state.selectionIndex === highLim && highLim > 1) {
          // Take a deep copy of the results in the state
          const oldResults = [...this.state.searchResults];
          // Set the new selection to true and the old one to false
          oldResults[lowLim].sel = true;
          oldResults[highLim - 1].sel = false;
          const newResults = oldResults;
          this.setState({
            searchResults: newResults,
            selectionIndex: lowLim + 1
          });
        }
        break;

      // ArrowUp, keycode 38
      case 38:
        // Check that the selection is between the limits
        if (
          this.state.selectionIndex > lowLim + 1 &&
          this.state.selectionIndex <= highLim
        ) {
          // Copy the old index and decrement it by one
          let newIndex = this.state.selectionIndex - 1;
          // Take a deep copy of the results in the state
          const oldResults = [...this.state.searchResults];
          // Set the new selection to true and the old one to false
          // Special handling for first index
          if (newIndex === 0) {
            oldResults[newIndex].sel = false;
          } else {
            oldResults[newIndex - 1].sel = true;

            if (newIndex < highLim) {
              oldResults[newIndex].sel = false;
            }
          }
          const newResults = oldResults;
          this.setState({
            searchResults: newResults,
            selectionIndex: newIndex
          });
          break;
        }

        // If selection === min -> move to highlim AND there are more than 1 result
        if (this.state.selectionIndex === lowLim + 1 && highLim > 1) {
          // Take a deep copy of the results in the state
          const oldResults = [...this.state.searchResults];
          // Set the new selection to true and the old one to false
          oldResults[highLim - 1].sel = true;
          oldResults[lowLim].sel = false;
          const newResults = oldResults;
          this.setState({
            searchResults: newResults,
            selectionIndex: highLim
          });
        }

        break;

      // Enter, keycode 13
      case 13:
        // If no selection, do nothing, otherwise set the selected index as the input value
        if (this.state.selectionIndex > 0 && !this.state.selectedResult) {
          // Copy the search results and the index
          const oldResults = [...this.state.searchResults];
          const i = this.state.selectionIndex - 1;

          this.setState({
            selectedResult: oldResults[i],
            showResults: false,
            touched: false,
            inputValue: oldResults[i].name,
            searchEnabled: true
          });
          break;
        }

        // If Enter was pressed and a city has been selected -> search
        if (this.state.selectedResult) {
          // When search is pressed set showResults to false etc
          this.setState({
            showResults: false,
            touched: false,
            inputValue: "",
            selectionIndex: 0,
            searchEnabled: false,
            selectedResult: null
          });
          this.props.search(this.state.selectedResult);
        }
        break;
      //}

      // Esc, keycode 27
      case 27:
        // If ESC is pressed, clear the input and do not show results
        this.setState({
          showResults: false,
          touched: false,
          inputValue: "",
          selectionIndex: 0,
          searchEnabled: false,
          selectedResult: null
        });
        break;

      default:
        // If anything else is pressed, clear the index
        this.setState({
          selectionIndex: 0,
          searchEnabled: false,
          selectedResult: null
        });
        break;
    }
  };

  onBlurHandler = () => {
    // When focus from input field is gone (blur) -> set showResults to false etc
    // this.setState({
    //   showResults: false,
    //   touched: false,
    //   inputValue: "",
    //   selectionIndex: 0,
    //   searchEnabled: false,
    //   selectedResult: null
    // });
  };

  onClickHandler = (result, e) => {
    e.preventDefault();
    // When a result is clicked -> move the selected result to the search box and set it as the selected item
    this.setState({
      selectedResult: result,
      showResults: false,
      touched: false,
      inputValue: result.name,
      searchEnabled: true
    });
  };

  onSearchHandler = e => {
    e.preventDefault();
    // When search is pressed set showResults to false etc
    this.setState({
      showResults: false,
      touched: false,
      inputValue: "",
      selectionIndex: 0,
      searchEnabled: false,
      selectedResult: null
    });
    // When button is clicked or enter is pressed on the form, pass the search item as a callback to the parent
    this.props.search(this.state.selectedResult);
  };

  render() {
    // Form a list of items from the search results
    // Check if showResults is true, else render something else
    let listItems = "";
    if (this.state.showResults) {
      const arr = this.state.searchResults;
      // Map the results array into list items
      listItems = arr.map(d => {
        // Result item class variable
        let resultClasses = [styles.Result];
        if (d.sel) {
          resultClasses = [styles.Result, styles.Active].join(" ");
        }
        return (
          <li
            key={d.name}
            className={resultClasses}
            onMouseDown={e => this.onClickHandler(d, e)}
          >
            {d.name}
          </li>
        );
      });
    } else if (this.state.touched && !this.state.loading) {
      listItems = <p>Please enter more than four letters</p>;
    }
    // if loading, show spinner
    if (this.state.loading) {
      listItems = <Spinner />;
    }
    return (
      <div className={styles.SearchBarContainer}>
        <input
          autoFocus
          className={styles.SearchBar}
          type="search"
          onChange={this.onChangeHandler}
          onKeyDown={this.onKeyDownHandler}
          onBlur={this.onBlurHandler}
          value={this.state.inputValue}
          placeholder="Search for a city"
        />
        {/* <i className="fas fa-search"></i> */}
        <div className={styles.ResultsContainer}>
          <ul>{listItems}</ul>
        </div>
        <Button
          btnType="Success"
          disabled={!this.state.searchEnabled}
          clicked={this.onSearchHandler}
        >
          SEARCH
        </Button>
      </div>
    );
  }
}

export default withErrorHandler(SearchBar, axios);
