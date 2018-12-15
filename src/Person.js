import React from 'react'

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faTwitter, faImdb } from '@fortawesome/free-brands-svg-icons'

class Person extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        items: [],
        item: [],
        cast: [],
        link: [],
        modalIsOpen: false,
        isLoaded: false
      }
      this.personInfo()
      this.personLinks()
      this.personMovies()
      this.crewResults()
  }

  personInfo() {
    const deetUrl = "https://api.themoviedb.org/3/person/"
    const deetId = this.props.match.params.id
    const deetApi = "?&api_key=cfe422613b250f702980a3bbf9e90716"
    this.details=fetch(deetUrl + deetId + deetApi)
    .then(res => res.json())
    .then(person => {
        this.setState({
            isLoaded: true,
            items: person
        })
    });
  }
  personLinks() {
    const deetUrl = "https://api.themoviedb.org/3/person/"
    const deetId = this.props.match.params.id
    const deetApi = "?&api_key=cfe422613b250f702980a3bbf9e90716"
    this.link=fetch(deetUrl + deetId + "/external_ids" + deetApi)
    .then(res => res.json())
    .then(link => {
        this.setState({
            isLoaded: true,
            link: link
        })
    });
  }
  personMovies() {
    const deetUrl = "https://api.themoviedb.org/3/person/"
    const deetId = this.props.match.params.id
    const deetApi = "?&api_key=cfe422613b250f702980a3bbf9e90716"
    this.cast=fetch(deetUrl + deetId + "/movie_credits" + deetApi)
    .then(res => res.json())
    .then(cast => {
        this.setState({
          isLoaded: true,
          cast: cast.cast
        })
    });
  }
  crewResults() {
    const deetUrl = "https://api.themoviedb.org/3/person/"
    const deetId = this.props.match.params.id
    const deetApi = "?&api_key=cfe422613b250f702980a3bbf9e90716"
    this.crew=fetch(deetUrl + deetId + "/movie_credits" + deetApi)
    .then(res => res.json())
    .then(crew => {
        this.setState({
          isLoaded: true,
          crew: crew.crew
        })
    });
  }

  render() {
      var { items, link } = this.state;
      return (
        <div>
          <div className="row backdrop headeritem">
            <div className="backdropcolors"></div>
            <div className="col-sm-12 col-md-4">
              <div className="imagewrap">
                <img src={"https://image.tmdb.org/t/p/w300" + items.profile_path} alt={this.name} onError={(e)=>{e.target.onerror = null; e.target.src="https://placekitten.com/300/450"}}/>
              </div>
            </div>
            <div className="col-sm-12 col-md-8">
              <h1 className="personname">{items.name}</h1>
              <div className="birthinfo">
                {items.birthday ? (
                  <div>
                    <b>Birthday:</b> <i>{items.birthday}</i><br/>
                  </div>
                ) : ""}
                {items.place_of_birth ? (
                  <div>
                    <b>Birth Place:</b> <i>{items.place_of_birth}</i><br/>
                  </div>
                ) : ""}
                {items.deathday ? (
                  <div>
                    <b>Deathday:</b> <i>{items.deathday}</i><br/>
                  </div>
                ) : ""}
                <b>Known For:</b> <i>{items.known_for_department}</i>
              </div>
              <div>
                {items.gender ? (
                  <div>
                    <b>Gender: </b>
                    <i className={"gender gen0"+items.gender}>Unspecified</i>
                    <i className={"gender gen1"+items.gender}>Female</i>
                    <i className={"gender gen2"+items.gender}>Male</i>
                  </div>
                ) : ""}
              </div>
              <div className="socialicons">
                {link.instagram_id ? (
                  <a href={"https://www.instagram.com/"+link.instagram_id} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /></a>
                ) : ""}

                {link.facebook_id ? (
                  <a href={"https://www.facebook.com/"+link.facebook_id} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook} /></a>
                ) : ""}

                {link.twitter_id ? (
                  <a href={"https://twitter.com/"+link.twitter_id} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} /></a>
                ) : ""}

                {link.imdb_id ? (
                  <a href={"https://www.imdb.com/name/"+link.imdb_id} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faImdb} /></a>
                ) : ""}
              </div>
              <div>
                {items.biography ? (
                  <p><b>Biography</b><br/>
                  {items.biography}</p>
                ) : ""}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <ul className="nav nav-tabs">
                <li><a data-toggle="tab" href="#cast" className="nav-highlight active show"><h3 className="infohead">Known For</h3></a></li>
                <li><a data-toggle="tab" href="#crew" className="nav-highlight"><h3 className="infohead">Crew on</h3></a></li>
              </ul>

              <div className="tab-content">
                <div id="cast" className="tab-pane fade in active show">
                  <div className="flexrow">
                    {
                      this.state.cast ?
                      this.state.cast.map((item)=>
                      <div className="flexitem" key={item.id}>
                        <Link to={"/movie/"+item.id}>
                          <img src={"https://image.tmdb.org/t/p/w300" + item.poster_path} alt={item.character} onError={(e)=>{e.target.onerror = null; e.target.src="https://placekitten.com/300/450"}}/>
                          <div className="charactername">
                            <div>
                              <b>{item.original_title}</b>
                            </div>
                            <div>
                              {item.character}
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
                <div id="crew" className="tab-pane fade">
                  <div className="flexrow">
                    {
                      this.state.crew ?
                      this.state.crew.map((item)=>
                      <div className="flexitem" key={item.id+item.job}>
                        <Link to={"/movie/"+item.id}>
                          <img src={"https://image.tmdb.org/t/p/w300" + item.poster_path} alt={item.original_title} onError={(e)=>{e.target.onerror = null; e.target.src="https://placekitten.com/300/450"}}/>

                          <div className="charactername">
                            <div>
                              <b>{item.original_title}</b>
                            </div>
                            <div>
                              {item.job}
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
        </div>
      );
  }
}
export default Person;
