import React, { Component } from 'react';
import {Route, Switch, BrowserRouter, Redirect,Link} from 'react-router-dom';
import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css';
import {auth} from "./actions";
import rootReducer from "./reducers";
import PonyNote from "./components/PonyNote";
import NotFound from "./components/NotFound";
import AdminPanel from "./components/AdminPackage/AdminPanel";
import CompanyHome from "./components/Contents/CompanyHome";
import Login from "./components/Login";
import Header from "./components/Header/header";
import Footer from "./components/Footer/Footer";
import Register  from "./components/Register";
import Confirmation  from "./components/Confirmation";
let store = createStore(rootReducer, applyMiddleware(thunk));

class RootContainerComponent extends Component {



  componentDidMount() {
    this.props.loadUser();
  }

  PrivateRoute = ({component: ChildComponent, ...rest}) => {
    return <Route {...rest} render={props => {
      if (this.props.auth.isLoading) {
        return <em>Loading...</em>;
      } else if (!this.props.auth.isAuthenticated ) {
      console.log(this.props.auth.isAuthenticated)
        return <Redirect to="/login" />;
      } else {
        return <ChildComponent {...props} />

      }
    }} />
  }

  render() {
    let {PrivateRoute} = this;
    let headerAuth;
    let footerAuth;
    if(this.props.auth.isAuthenticated){

       headerAuth= (
      <Header/>
        )
        footerAuth= (
      <Footer/>
        )
        }
    return (
        <BrowserRouter>
    <div className="Gridcontainer" >
      {headerAuth}
  <div className="content">

        <Switch>
          <PrivateRoute exact path="/" component={PonyNote} />
          <Route  path="/register" component={Register} />
          <Route  path="/login" component={Login} />
          <Route exact path="/wait" component={Confirmation} />
          <PrivateRoute  path="/Myadmin" component={AdminPanel} />
          <PrivateRoute  path="/company" component={CompanyHome} />
          <Route  component={NotFound} />
        </Switch>

</div>

  {footerAuth}

      </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => {
      return dispatch(auth.loadUser());
    }
  }
}

let RootContainer = connect(mapStateToProps, mapDispatchToProps)(RootContainerComponent);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}