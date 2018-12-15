import React, { Component } from 'react';
import $ from 'jquery';

import MovieRow from './MovieRow';
import './App.css';

import {DebounceInput} from 'react-debounce-input';


class Search extends Component {

  constructor(props) {
    super(props)
    this.state = {}
    this.performSearch("star trek")
  }

  performSearch(searchTerm) {
    const apiKey = "?api_key=671bb2483efe07bf614265dbdeb4d6c1"
    const urlString = "https://api.themoviedb.org/3/search/movie" + apiKey + "&query=" + searchTerm
    $.ajax({
      url: urlString,
      success: (searchResults) => {

        const results = searchResults.results
        var movieRows = []

        results.forEach((movie) => {
          const movieRow = <MovieRow key={movie.id} movie={movie}/>
          movieRows.push(movieRow)
        })

        this.setState({rows: movieRows})
      },
      error: (xhr, status, err) => {
        console.error("Failure!!! ALERT! ALERT! AJAX FAIL")
      }
    })
  }
  searchChangeHandler(event) {
    const boundObject = this
    const searchTerm = event.target.value
    boundObject.performSearch(searchTerm)
  }

  render() {
    return (
      <div>
        <div className="row sectioncont">
          <div className="col-12">
            <h1 className="sectionhead">SEARCH TIME BABY!</h1>
            <i>Enter the title of a movie you wish to learn about</i>
            <div>
              <DebounceInput
              minLength={2}
              debounceTimeout={420}
              onChange={this.searchChangeHandler.bind(this)} placeholder="Enter search term : Star Trek" />
            </div>
          </div>
        </div>
        {this.state.rows}

      </div>
    );
  }

}

export default Search;
