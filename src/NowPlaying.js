import React from 'react'

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import Rating from 'react-rating'

class NowPlaying extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        results: []
      }
      this.nowPlaying()
  }
  nowPlaying() {
    const deetUrl = "https://api.themoviedb.org/3/movie/now_playing"
    const deetApi = "?&api_key=cfe422613b250f702980a3bbf9e90716"
    this.results=fetch(deetUrl + deetApi)
    .then(res => res.json())
    .then(results => {
        this.setState({
          isLoaded: true,
          results: results.results
        })
    });
  }

  render() {
    var { isLoaded } = this.state;
    // console.log(items)
    if (!isLoaded) {
        return (
          <div>
          Loading...
          </div>
        );
    }
    return (
      <div>
        <div className="row sectioncont">
          <div className="col-12">
            <h1 className="sectionhead">Now Playing</h1>
          </div>
        </div>
        {
          this.state.results ?
          this.state.results.map((item)=>
          <div key={item.id}>
              <div className="row backdrop headeritem"
              style={{backgroundImage: item.backdrop_path ? 'url(https://image.tmdb.org/t/p/w1280' + item.backdrop_path + ')' : 'url(https://placekitten.com/1280/800)' }}>
                <div className="backdropcolors"></div>
                <div className="col-sm-12 col-md-4 backdropover">
                  <Link to={"/movie/"+item.id}>
                    <div className="imagewrap">
                      <img src={"https://image.tmdb.org/t/p/w500" + item.poster_path} alt={item.title} onError={(e)=>{e.target.onerror = null; e.target.src="https://placekitten.com/500/750"}}/>
                    </div>
                  </Link>
                </div>
                <div className="col-sm-12 col-md-8 backdropover">
                  <Link to={"/movie/"+item.id}>
                    <h3>{item.title}</h3>
                    <div>
                    {item.vote_average ? (
                      <Rating
                      initialRating={item.vote_average}
                      start={0}
                      stop={10}
                      step={2}
                      readonly
                      />
                    ) : ""}
                    </div>
                    {item.vote_average ? (
                      <h5 className="ratingtext">Rating: {item.vote_average}</h5>
                    ) : ""}
                    <p>{item.overview}</p>
                    <button className="trailerbtn">Read More <FontAwesomeIcon icon={faAngleRight}/></button>
                  </Link>
                  <div>
                    <a href={"https://www.fandango.com/search?q="+item.title} target="_blank" rel="noopener noreferrer" className="movietimesbtn btn-primary">Search for movie times <FontAwesomeIcon icon={faFilm}/></a>
                  </div>
                </div>
              </div>
          </div>
        )
        :
        <h3>Wait... Something went wrong</h3>
        }
      </div>
    );
  }
}
export default NowPlaying;
