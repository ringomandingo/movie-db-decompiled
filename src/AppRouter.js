import React from "react";
import { BrowserRouter as HashRouter, Route, Switch, NavLink } from "react-router-dom";

import NowPlaying from './NowPlaying'
import Popular from './Popular'
import TopRated from './TopRated'
import Search from './Search'
import Person from './Person'
import Movie from './Movie'
import ScrollToTop from './ScrollToTop'
import NoMatch from './NoMatch'

const AppRouter = () => (
  <HashRouter onUpdate={() => window.scrollTo(0, 0)}>
    <div>
      <div className="topnav">
        <nav>
          <ul className="nav justify-content-center">
            <li className="nav-item">
              <NavLink to="/" exact className="nav-link nav-highlight">Now Playing</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/popular/" className="nav-link nav-highlight">Popular</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/toprated/" className="nav-link nav-highlight">Top Rated</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/search/" className="nav-link nav-highlight">Search</NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div className="container-fluid">
        <ScrollToTop>
          <Switch>
            <Route path="/" exact component={NowPlaying} />
            <Route path="/movie-db" exact component={NowPlaying} />
            <Route path="/popular/" component={Popular} />
            <Route path="/toprated/" component={TopRated} />
            <Route path="/search/" component={Search} />
            <Route path="/person/:id" exact component={Person} />
            <Route path="/movie/:id" exact component={Movie} />
            <Route component={NoMatch} />
          </Switch>
        </ScrollToTop>
      </div>
    </div>
  </HashRouter>
);

export default AppRouter;
