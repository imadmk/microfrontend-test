import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { createGenerateClassName, StylesProvider } from '@material-ui/styles';
import Pricing from './components/Pricing';
import Landing from './components/Landing';
import { History } from 'history';

const generateClassName = createGenerateClassName({
  productionPrefix: 'ma',
});

export default ({ history }: { history: History }) => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <Switch>
            <Route exact path="/pricing" component={Pricing} />
            <Route path="/" component={Landing} />
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  )
}