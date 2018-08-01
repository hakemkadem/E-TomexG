import React, { Component } from 'react';
import {Route,Switch,BrowserRouter} from 'react-router-dom';
import {createStore,applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import PonyApp from './reducers';
import PonyNote from './components/PonyNote';
import NotFound from './components/NotFound';
import Counter from './components/Counter';

import logo from './logo.svg';
import './App.css';
import thunk from 'redux-thunk';



let store=createStore(PonyApp,applyMiddleware(thunk));


class App extends Component {
  render() {
    return (
    <Provider store={store}>
     <BrowserRouter>
        <Switch>
            <Route exact path='/' component={PonyNote}/>
            <Route path='/note' component={Counter}/>
            <Route component={NotFound} />
        </Switch>
     </BrowserRouter>
     </Provider>
    );
  }
}
export default App;
