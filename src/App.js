import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';

export default function App() {
  return (
    <Switch>
      <Route to="/" component={ Login } />
    </Switch>
  );
}
