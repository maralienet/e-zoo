import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const defState = {
  activeMobMenu: false,
  activeSearch: false,
  activeCall: false
}

const reducer = (state = defState, action) => {
  switch (action.type) {
    case 'SHOW_HIDE_MENU': {
      return { ...state, activeMobMenu: !state.activeMobMenu }
    }
    case 'SHOW_HIDE_SEARCH': {
      return { ...state, activeSearch: !state.activeSearch }
    }
    case 'SHOW_HIDE_CALL': {
      return { ...state, activeCall: !state.activeCall }
    }
    default: {
      return state;
    }
  }
}

const store = createStore(reducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
