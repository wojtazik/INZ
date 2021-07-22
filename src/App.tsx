import React from 'react';
import { Provider } from 'react-redux';
import { createStore, Store } from 'redux';
import ColorPalette from './components/ColorPalette';
import AppRouter from './routing/AppRouter';
import appReducer from './store/reducers/index'
import { BrowserRouter as Router } from 'react-router-dom'
import AppMenu from './components/AppMenu';
import GlobalStyle from './styles/globalStyle';
var WS = require('websocket').w3cwebsocket;

// var ws = new WS('ws://localhost:3001', 'foo', 'http://example.com');
function App() {

  const appState: Store = createStore(appReducer)

  return (
    <Provider store={appState}>
      <Router>
        <GlobalStyle />
        <AppMenu />
        <AppRouter />
        <div className="App">
          {/* <ColorPalette /> */}
        </div>
      </Router>
      
    </Provider>
  );
}

export default App;
