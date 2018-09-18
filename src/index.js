import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import '@atlaskit/css-reset';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import App from './screens/App'
import reducer from './reducers';

const store = createStore(
  reducer
);

const Root = () => (
  <Provider store={store}>
    <App></App>
    {/* <Router>
      <div>
        <Route exact path="/" component={App}/>
        <Route path="/settings" component={Settings}/>
      </div>
    </Router> */}
  </Provider>
);


ReactDOM.render(<Root />, document.getElementById('root'));

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}