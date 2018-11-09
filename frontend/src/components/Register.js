import React, {Component} from "react";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";
import {auth} from "../actions";
import $ from "jquery";
import {Button, Icon,Input,Row} from 'react-materialize'

class Register extends Component {

  state = {
    username: "",
    password: "",
    email:"",
    address:"",
    license:"",
    user_type:"client",
    logo:"",
    licenseDoc:""
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.register(
     this.state.username,
     this.state.password,
     this.state.email,
     this.state.address,
     this.state.license,
     this.state.user_type,
     this.state.logo,
     this.state.licenseDoc
     );
  }


  componentDidMount() {

  }


  render() {
    if (this.props.isExist) {
      return <Redirect to="/Login" />
    }
    return (

    <div className="RegisterMain">
        <div className="RegisterContent">
             <div className="RegHeader"></div>
                 <div className="RegContent">
                        <div className="RegContentHeader">

                      {this.props.errors.length > 0 && (
                        <ul>
                          {this.props.errors.map(error => (
                            <li key={error.field}>{error.message}</li>
                          ))}
                        </ul>
                      )}


                        </div>
                        <div className="RegContentContent">
                  <form onSubmit={this.onSubmit}>
                    <fieldset>

                      <p className="RegSpanTitle">
                        انشاء حساب في منظومة TOPEX
                        </p>





                        <Input  s={12} label=" اسم المستخدم" autocomplete="off"
                          type="text" id="username" spellcheck="false"
                          onChange={e => this.setState({username: e.target.value})} />


                        <Input s={12} label="الرمز السري" autocomplete="off"
                          type="password" id="password" spellcheck="false"
                          onChange={e => this.setState({password: e.target.value})} />

                        <Input type="email" label="البريد الالكتروني" s={12}
                          type="text" id="email"
                          onChange={e => this.setState({email: e.target.value})} />


                        <Input type="text" label="العنوان المكاني" s={12}
                          id="address"
                         onChange={e => this.setState({address: e.target.value})} />


                        <Input type="text" label="رقم الاجازة السياحية" s={12}
                          id="license"
                          onChange={e => this.setState({license: e.target.value})} />

                      <label htmlFor="Logo"  style={{ color:"gray"}}>شعار الشركة</label>
                       <input style={{color: "gray",
                            fontSize: "12px",
                            backgroundColor: "#f2f2f2",
                            borderRadius: "12px",    display: "block" }}
                       id="Logo"
                        type="file"
                        multiple={false}
                        accept=".jpg,.jpeg,.png"
                        onChange={e => this.setState({logo: e.target.files[0]})

                        }
                      />

                      <label htmlFor="licenseDoc" style={{ color:"gray"}}>الاجازة السياحية</label>
                       <input style={{

                            color: "gray",
                            fontSize: "12px",
                            backgroundColor: "#f2f2f2",
                            borderRadius: "12px",
                            display: "block"
                       }}
                       id="licenseDoc"
                        type="file"
                        multiple={false}
                        accept="*"
                        onChange={e => this.setState({licenseDoc: e.target.files[0]})

                        }

                      />

  <Input type="file" label="File" s={12} multiple placeholder="Upload one or more files" />





                       <p>
                       <h6>اختر نوع الحساب المراد تفعيله:</h6>

                    <Input type="radio" name="Type" value="client"  label='Client'
                           checked ={this.state.user_type ==='client'}
                           onChange={e => this.setState({user_type: e.target.value})} />




                      <Input type="radio" name="Type" value="provider" label='Provider'
                       checked ={this.state.user_type ==='provider'}
                       onChange={e => this.setState({user_type: e.target.value})}/>
                   </p>



                      <p className="RegPNotStyled">
                        <button type="submit">Register</button>
                      </p>

                      <p className="RegPNotStyled">
                        Already have an account? <Link to="/login">Login</Link>
                      </p>
                    </fieldset>
                  </form>
                  </div>
                    <div className="RegContentLogo">Logo</div>


                </div>
    <div className="RegFooter">
    <div className="RegAddress">address</div>
    <div>المساعدة</div>
    <div>الشروط</div>
    <div>الخصوصية</div>

    </div>
      </div>
      </div>

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
    register: (username, password,email,address,license,user_type,logo,licenseDoc) => dispatch(auth.register(username, password,email,address,license,user_type,logo,licenseDoc)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);