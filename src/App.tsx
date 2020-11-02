import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Quiz from './containers/Quiz/Quiz';
import QuizList from './containers/QuizList/QuizList';
import Auth from './containers/Auth/Auth';

function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={QuizList} />
        <Route path="/auth" component={Auth} />
        <Route path="/quiz/:id" component={Quiz} />
      </Switch>
    </Layout>
  );
}

export default App;
