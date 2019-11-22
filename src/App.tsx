import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" />
        <Route path="/quiz" />
        <Route path="/results" />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
