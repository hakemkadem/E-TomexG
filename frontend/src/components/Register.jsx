import React, {Component} from "react";
import {connect} from "react-redux";

import {Link, Redirect} from "react-router-dom";

import {auth} from "../actions";

class Register extends Component {

  state = {
    username: "",
    password: "",
    email:"",
    address:"",
    license:"",
    user_type:"client"
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.register(
     this.state.username,
     this.state.password,
     this.state.email,
     this.state.address,
     this.state.license,
     this.state.user_type);
  }

  render() {
    if (this.props.isExist) {
      return <Redirect to="/Login" />
    }
    return (
      <form onSubmit={this.onSubmit}>
        <fieldset>
          <legend>Register</legend>
          {this.props.errors.length > 0 && (
            <ul>
              {this.props.errors.map(error => (
                <li key={error.field}>{error.message}</li>
              ))}
            </ul>
          )}
          <p>
            <label htmlFor="username">Username</label>
            <input
              type="text" id="username"
              onChange={e => this.setState({username: e.target.value})} />
          </p>
          <p>
            <label htmlFor="password">Password</label>
            <input
              type="password" id="password"
              onChange={e => this.setState({password: e.target.value})} />
          </p>
           <p>
            <label htmlFor="email">Email</label>
            <input
              type="text" id="email"
              onChange={e => this.setState({email: e.target.value})} />
          </p>
           <p>
            <label htmlFor="address">Address</label>
            <input
              type="text" id="address"
               onChange={e => this.setState({address: e.target.value})} />
          </p>
          <p>
            <label htmlFor="License">License</label>
            <input
              type="text" id="license"
              onChange={e => this.setState({license: e.target.value})} />
          </p>
           <p>
           <h6>اختر نوع الحساب المراد تفعيله:</h6>
      <label>
        <input type="radio" name="Type" value="client"
               checked ={this.state.user_type ==='client'}
               onChange={e => this.setState({user_type: e.target.value})} />
        Client
      </label>

      <label>
          <input type="radio" name="Type" value="provider"
           checked ={this.state.user_type ==='provider'}
           onChange={e => this.setState({user_type: e.target.value})}/>
          Provider
      </label>
       </p>
          <p>
            <button type="submit">Register</button>
          </p>

          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </fieldset>
      </form>
    )
  }
}

const mapStateToProps = state => {
  let errors = [];
  if (state.auth.errors) {
    errors = Object.keys(state.auth.errors).map(field => {
      return {field, message: state.auth.errors[field]};
    });
  }
  return {
    errors,
    isExist: state.auth.isExist
  };
}

const mapDispatchToProps = dispatch => {
  return {
    register: (username, password,email,address,license,user_type) => dispatch(auth.register(username, password,email,address,license,user_type)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);