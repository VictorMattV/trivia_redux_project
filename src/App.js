import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import FeedBack from './pages/FeedBack';
import Game from './pages/Game';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/game" component={ Game } />
      <Route path="/settings" component={ Settings } />
      <Route path="/feedback" component={ FeedBack } />
      <Route path="/ranking" component={ Ranking } />

    </Switch>
  );
}
