import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../AutoComplete.css";
import { Button } from "reactstrap";
export default class SearchBar extends Component {
  state = {
    items: [],
    suggestions: [],
    selected: []
  };

  //Here we call all of the data from the database to get the suggestions
  componentDidMount() {
    axios.get("/home").then(response => {
      //  console.log(response.data);
      this.setState({
        items: response.data
      });
    });
  }
  // While writing we sort the matching suggestions in the input field
  onTextChanged = e => {
    const value = e.target.value;
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      // console.log(this.state.items);
      suggestions = this.state.items.sort().filter(el => {
        //  console.log(regex.test(el));
        return regex.test(el);
      });
      console.log(suggestions);
    }
    this.setState({
      suggestions,
      text: value
    });
  };

  // Here we check the suggestions on the first input field
  renderSuggestions = () => {
    const { suggestions } = this.state;

    if (suggestions === 0) {
      return null;
    } else {
      return (
        <ul>
          {suggestions.map(elem => {
            return (
              <li onClick={() => this.suggestionSelected(elem)}>{elem}</li>
            );
          })}
        </ul>
      );
    }
  };

  //Once the suggestion is clicked we push that value to the selected array in the component state so we can use that data later for the get call

  suggestionSelected(value) {
    this.setState({
      suggestions: [],
      selected: [...this.state.selected, value]
    });
  }

  render() {
    console.log(this.state.selected);
    const { text } = this.state;
    // console.log(this.state.suggestions);
    return (
      <div className="App-Component">
        <div className="AutoCompleteText">
          <input
            type="text"
            onChange={this.onTextChanged}
            value={this.state.selected[0]}
          />
          {!this.state.selected[0] ? this.renderSuggestions() : null}
        </div>
        {this.state.selected.map((elem, index) => {
          return (
            <div className="AutoCompleteText">
              <input
                type="text"
                onChange={this.onTextChanged}
                value={this.state.selected[index + 1]}
              />

              <ul>
                {!this.state.selected[index + 1]
                  ? this.state.suggestions.map(el => {
                      return (
                        <li onClick={() => this.suggestionSelected(el)}>
                          {el}
                        </li>
                      );
                    })
                  : null}
              </ul>
            </div>
          );
        })}
        <Button color="primary">
          {/* We are sending the user to a route with all the search data */}
          <Link style={{ color: "white" }} to={`/${[...this.state.selected]}`}>
            Compare
          </Link>
        </Button>
      </div>
    );
  }
}
