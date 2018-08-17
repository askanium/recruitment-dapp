// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';
//
// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Web3Provider } from 'react-web3';
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './store'
import App from './containers/app'

import './index.css'

const target = document.querySelector('#root');

render(
  <Provider store={store}>
    <Web3Provider>
      <ConnectedRouter history={history}>
        <div>
          <App />
        </div>
      </ConnectedRouter>
    </Web3Provider>
  </Provider>,
  target
)