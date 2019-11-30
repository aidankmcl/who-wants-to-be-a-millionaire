import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import { Provider } from './state';
import { Intro, Quiz, Results } from './pages';
import { colors } from './ui/config';

const AppStyle = createGlobalStyle`
  html {
    background: ${colors.purple}
  }
`

const App: React.FC = () => {
  return (
    <Provider>
      <AppStyle />
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Intro} />
          <Route path='/quiz' exact={true} component={Quiz} />
          <Route path='/results' exact={true} component={Results} />
          <Redirect to='/' />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
