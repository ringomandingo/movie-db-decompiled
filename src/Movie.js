import React from 'react'

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImdb } from '@fortawesome/free-brands-svg-icons'
import { faLink, faPlay } from '@fortawesome/free-solid-svg-icons'
import Rating from 'react-rating'

import YoutubeModal from 'react-youtube-modal'

class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      cast: [],
      isLoaded: false,
      isOpen: false
    }
    this.movieDetails()
    this.castResults()
    this.crewResults()
    this.trailerDetails()
    this.similarMovies()
    this.openModal = this.openModal.bind(this)
  }

  openModal () {
    this.setState({isOpen: true})
  }

  movieDetails() {
    const deetUrl = "https://api.themoviedb.org/3/movie/"
    const deetId = this.props.match.params.id
    const deetApi = "?&api_key=cfe422613b250f702980a3bbf9e90716&append_to_response=images"
    this.details=fetch(deetUrl + deetId + deetApi)
    .then(res => res.json())
    .then(movie => {
        this.setState({
            isLoaded: true,
            items: movie
        })
    });
  }
  trailerDetails() {
    const deetUrl = "https://api.themoviedb.org/3/movie/"
    const deetId = this.props.match.params.id
    const deetApi = "?&api_key=cfe422613b250f702980a3bbf9e90716"
    this.trailer=fetch(deetUrl + deetId + "/videos" + deetApi)
    .then(res => res.json())
    .then(trailer => {
        this.setState({
            isLoaded: true,
            trailer: trailer.results
        })
    });
  }
  castResults() {
    const deetUrl = "https://api.themoviedb.org/3/movie/"
    const deetId = this.props.match.params.id
    const deetApi = "?&api_key=cfe422613b250f702980a3bbf9e90716"
    this.cast=fetch(deetUrl + deetId + "/credits" + deetApi)
    .then(res => res.json())
    .then(cast => {
        this.setState({
          isLoaded: true,
          cast: cast.cast
        })
    });
  }
  crewResults() {
    const deetUrl = "https://api.themoviedb.org/3/movie/"
    const deetId = this.props.match.params.id
    const deetApi = "?&api_key=cfe422613b250f702980a3bbf9e90716"
    this.crew=fetch(deetUrl + deetId + "/credits" + deetApi)
    .then(res => res.json())
    .then(crew => {
        this.setState({
          isLoaded: true,
          crew: crew.crew
        })
    });
  }
  similarMovies() {
    const deetUrl = "https://api.themoviedb.org/3/movie/"
    const deetId = this.props.match.params.id
    const deetApi = "?&api_key=cfe422613b250f702980a3bbf9e90716"
    this.similar=fetch(deetUrl + deetId + "/similar" + deetApi)
    .then(res => res.json())
    .then(similar => {
        this.setState({
          isLoaded: true,
          similar: similar.results
        })
    });
  }
  reloadPage() {
    window.location.reload()
  }
  render() {
    var { isLoaded, items } = this.state;
    const bgUrl = "https://image.tmdb.org/t/p/w1280"+items.backdrop_path
    const bgNull = "https://placekitten.com/1280/800"
    var backDropBg = {
      backgroundImage: 'url(' + bgUrl + ')',
    };
    var backDropNull = {
      backgroundImage: 'url(' + bgNull + ')',
    };
    if (!isLoaded) {
        return (
          <div>
          Loading...
          </div>
        );
    }

    return (
      <div>
        <div className="row backdrop headeritem"
        style={items.backdrop_path ? backDropBg : backDropNull }>
          <div className="backdropcolors"></div>
          <div className="col-sm-12 col-md-4">
            <div className="imagewrap">
              <img src={"https://image.tmdb.org/t/p/w500" + items.poster_path} alt={this.name} onError={(e)=>{e.target.onerror = null; e.target.src="https://placekitten.com/500/750"}}/>
            </div>
          </div>
          <div className="col-sm-12 col-md-8">
            <h1>{items.original_title}</h1>
            <div>
            {items.vote_average ? (
              <Rating
                initialRating={items.vote_average}
                start={0}
                stop={10}
                step={2}
                readonly
              />
            ) : (
              <span></span>
            )}
            </div>
            {items.vote_average ? (
              <h5 className="ratingtext">Rating: {items.vote_average}</h5>
            ) : (
              <span></span>
            )}
            <h5>Status: {items.status}</h5>
            <h5>
              {items.release_date ? "Release Date: "+items.release_date  : "No Date info to display"}
            </h5>
            {items.budget ? (
              <h5>Budget: {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(items.budget)}
              </h5>
            ) : (
              <span></span>
            )}
            {items.revenue ? (
              <h5>
              Revenue: {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(items.revenue)}
              </h5>
            ) : (
              <span></span>
            )}


            <div className="socialicons">
              {items.imdb_id ? (
                <a href={"https://www.imdb.com/title/"+items.imdb_id} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faImdb} /></a>
              ) : (
                <span></span>
              )}

              {items.homepage ? (
                <a href={items.homepage} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLink} /></a>
              ) : (
                <span></span>
              )}
            </div>
            <p><b>Overview</b><br/>
            {items.overview}</p>
            {
              this.state.trailer ?
              this.state.trailer.map((item)=>
                <div key={item.id} className={item.id}>
                  <YoutubeModal videoId={item.key}>
                    <button type="button" className="trailerbtn">{item.name} <FontAwesomeIcon icon={faPlay} /></button>
                  </YoutubeModal>
                </div>
            )
            :
            <h3>Wait... something went wrong</h3>
            }
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <ul className="nav nav-tabs">
              <li><a data-toggle="tab" href="#cast" className="nav-highlight active show"><h3 className="infohead">Cast</h3></a></li>
              <li><a data-toggle="tab" href="#crew" className="nav-highlight"><h3 className="infohead">Crew</h3></a></li>
              <li><a data-toggle="tab" href="#related" className="nav-highlight"><h3 className="infohead">Related Films</h3></a></li>
            </ul>

            <div className="tab-content">
              <div id="cast" className="tab-pane fade in active show">
                <div className="flexrow">
                  {
                    this.state.cast ?
                    this.state.cast.map((item)=>
                    <div className="flexitem" key={item.id}>
                      <Link to={"/person/"+item.id}>
                        <img src={"https://image.tmdb.org/t/p/w300" + item.profile_path} alt={this.name} onError={(e)=>{e.target.onerror = null; e.target.src="https://placekitten.com/300/450"}}/>
                        <div className="actorname">
                          {item.name}
                        </div>
                        <div className="charactername">
                          {item.character}
                        </div>
                      </Link>
                    </div>
                  )
                  :
                  <h3>Wait... Something went wrong</h3>
                  }
                </div>
              </div>
              <div id="crew" className="tab-pane fade">
                <div className="flexrow">
                  {
                    this.state.crew ?
                    this.state.crew.map((item)=>
                    <div className="flexitem" key={item.id+item.job}>
                      <Link to={"/person/"+item.id}>
                        <img src={"https://image.tmdb.org/t/p/w300" + item.profile_path} alt={this.name} onError={(e)=>{e.target.onerror = null; e.target.src="https://placekitten.com/300/450"}}/>
                        <div className="actorname">
                          {item.name}
                        </div>
                        <div className="charactername">
                          {item.job}<br/>
                          {item.department}
                        </div>
                      </Link>
                    </div>
                  )
                  :
                  <h3>Wait... Something went wrong</h3>
                  }
                </div>
              </div>
              <div id="related" className="tab-pane fade">
                {
                  this.state.similar ?
                  this.state.similar.map((item)=>
                  <div className="flexitem" key={item.id+item.original_title}>
                    <Link to={"/movie/"+item.id} onClick={this.reloadPage.bind(this)}>
                      <img src={"https://image.tmdb.org/t/p/w300" + item.poster_path} alt={item.character} onError={(e)=>{e.target.onerror = null; e.target.src="https://placekitten.com/300/450"}}/>

                      <div className="charactername">
                        <div>
                          <b>{item.original_title}</b>
                        </div>
                        <div>
                          Release Date:<br/>
                          {item.release_date}
                        </div>
                      </div>
                    </Link>
                  </div>
                )
                :
                <h3>Wait... Something went wrong</h3>
                }
              </div>
            </div>


          </div>
        </div>
      </div>
    );
  }
}
export default Movie;
