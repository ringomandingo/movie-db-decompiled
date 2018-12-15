import React from 'react'

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import Rating from 'react-rating'

class MovieRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      cast: [],
      modalIsOpen: false,
      isLoaded: false
    }
    this.movieDetails()
  }

  movieDetails() {
    const deetUrl = "https://api.themoviedb.org/3/movie/"
    const deetId = this.props.movie.id
    const deetApi = "?&api_key=cfe422613b250f702980a3bbf9e90716"
    this.details=fetch(deetUrl + deetId + deetApi)
    .then(res => res.json())
    .then(movie => {
        this.setState({
            isLoaded: true,
            items: movie
        })
    });
  }

  render() {
    var { isLoaded } = this.state;

    if (!isLoaded) {
        return (
          <div>
          Loading...
          </div>
        );
    }
    return (
      <div key={this.props.movie.id}>
        <Link to={"/movie/"+this.props.movie.id}>
          <div className="row backdrop headeritem"
          style={{backgroundImage: this.props.movie.backdrop_path ? 'url(https://image.tmdb.org/t/p/w1280' + this.props.movie.backdrop_path + ')' : 'url(https://placekitten.com/1280/800)' }}>
            <div className="backdropcolors"></div>
            <div className="col-sm-12 col-md-4">
              <div className="imagewrap">
                <img src={"https://image.tmdb.org/t/p/w500" + this.props.movie.poster_path} alt={this.props.movie.title} onError={(e)=>{e.target.onerror = null; e.target.src="https://placekitten.com/500/750"}}/>
              </div>
            </div>
            <div className="col-sm-12 col-md-8">
              <h3>{this.props.movie.title}</h3>
              <div>
              {this.props.movie.vote_average ? (
                <Rating
                  initialRating={this.props.movie.vote_average}
                  start={0}
                  stop={10}
                  step={2}
                  readonly
                />
              ) : ""}
              </div>
              {this.props.movie.vote_average ? (
                <h5 className="ratingtext">Rating: {this.props.movie.vote_average}</h5>
              ) : ""}
              <p>{this.props.movie.overview}</p>
              <button className="trailerbtn">Read More <FontAwesomeIcon icon={faAngleRight}/></button>
            </div>
          </div>
        </Link>
      </div>
    );
  }


}

export default MovieRow;
