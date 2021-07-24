import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, Store } from 'redux';
import ColorPalette from './components/ColorPalette';
import AppRouter from './routing/AppRouter';
import appReducer from './store/reducers/index'
import { BrowserRouter as Router } from 'react-router-dom'
import AppMenu from './components/AppMenu';
import GlobalStyle from './styles/globalStyle';
import thunk from 'redux-thunk'
import { ContextIOProvider } from './context/SocketContext'
var WS = require('websocket').w3cwebsocket;

// var ws = new WS('ws://localhost:3001', 'foo', 'http://example.com');
function App() {

  const appState: Store = createStore(appReducer, applyMiddleware(thunk))

  return (
    <Provider store={appState}>
      <Router>
        <ContextIOProvider>
          <GlobalStyle />
          <AppMenu />
          <AppRouter />
          <div className="App">
            {/* <ColorPalette /> */}
          </div>
        </ContextIOProvider>
      </Router>
      
    </Provider>
  );
}

export default App;
