import React, { Component } from 'react';
import {Link, Redirect,BrowserRouter} from "react-router-dom";
import {connect} from 'react-redux';
import {auth} from "../../actions";
import {Button, Icon,Input,Row,ProgressBar} from 'react-materialize'

class confirmResetPassword extends Component {
 initialState = { uid: "",
    password: "",
    token:"",
    redirect: false }
state = this.initialState;

componentDidMount() {}

RedirectToLogin=()=>{
 this.timerID = setInterval(() => {this.setState({redirect:true})},5000)
}


renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/login' />
    }
  }


handleFormReset = () => {
    this.setState(() => this.initialState)
  }

onSubmit = e => {
    e.preventDefault();
    this.props.PasswordConfirm(this.props.UIDTxt, this.props.TokenTxt ,this.props.NewPassTxt);
  }


reloadRegisterRoute = () => {
            BrowserRouter.push({ pathname: '/empty' });
            BrowserRouter.replace({ pathname: '/login' });
        }



render(){

return (
<form onSubmit={this.onSubmit} onReset={this.handleFormReset}>
<div className="LoginContanier">
<div className="LoginLSide"></div>
<div className="LoginContent">
    <div className="LoginContentHeader">

      {this.props.isLoading &&
         (<ProgressBar color="blue" className="blue" />)
      }
     </div>
    <div className="LoginContentContent">

       <div className={
       this.props.errors.length >0 && this.props.errors[0].field!='detail' ? " RegValidation":" RegDeValidation"}>
                    {(this.props.errors.length > 0 &&
                     this.props.errors[0].field!='detail' &&
                     this.props.errors[0].field=='uid')?
                     "يرجى كتابة الرمز المستخدم بشكل صحيح"
                     :
                     (this.props.errors.length > 0 &&
                      this.props.errors[0].field!='detail' &&
                      this.props.errors[0].field=='token')?
                     "يرجى كتابة الرمز السري بشكل صحيح"
                     :
                     (this.props.errors.length > 0 &&
                      this.props.errors[0].field!='detail' &&
                      this.props.errors[0].field=='new_password')?
                     "يرجى التاكد من كتابة كلمة المرور الجديدة بشكل صحيح"
                     :
                       "هنالك خطا في الرمز السري يرجى اعادة عملية استعادة كلمة المرور"
                     }

       </div>


<div className={
                 this.props.success? "EmailSend":" RegDeValidation"}>
                  تم تغير الكلمة المرور بنجاح. يمكنك الانتقال الى صفحة الدخول من
                  <Link onClick={this.reloadRegisterRoute} to="/login" style={{marginRight:"4px"}}>هنا</Link>
       </div>

 <div className="LoginContentContentField">
        <div style={{textAlign:"center"}}>
        <img src="http://localhost:8000/media/TomexLogo.png" width="40%" />
          <h4>تغيير كلمة المرور</h4>
        <h6>  لحساب TOMEX</h6>
        </div>

        <div> <Input type="text" label="رمز المستخدم (UID)" className="LoginText" id="uid"
                value={this.props.UIDTxt}
              onChange={e=>this.props.setUIDTxt(e.target.value)} style={{direction: "ltr"}} /></div>

        <div>
        <Input type="text" label="الرمز السري (Token)" className="LoginText" id="passcode"
               value={this.props.TokenTxt}
              onChange={e=>this.props.setTokenTxt(e.target.value)} style={{direction: "ltr"}}/>
        </div>

        <div>
        <Input type="password" label="كلمة المرور الجديدة" className="LoginText" id="password"
               value={this.props.NewPassTxt}
               onChange={e=>this.props.setNewPassTxt(e.target.value)} style={{direction: "ltr"}}/>
        </div>


        <div style={{paddingTop:"40px"}}>
        <div style={{color:"#1a73e8"}}> <Link onClick={this.reloadRegisterRoute} to="/login">صفحة الدخول</Link> </div>
        <div style={{ marginRight: "auto"}}><Button type="submit" onClick={()=>{this.props.ErrorReset(); }} disabled={this.props.isLoading} waves="light"  className="blue">تغيير</Button>

        </div>

        </div>
  </div>


    </div>

</div>
<div className="LoginRightSide"></div>
</div>
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
    isConfirmed :state.auth.isConfirmed,
    isExist     :state.auth.isExist,
    isLoading   :state.auth.isLoading,
    success     :state.auth.success,
    UIDTxt      :state.auth.UIDTxt,
    TokenTxt    :state.auth.TokenTxt,
    NewPassTxt  :state.auth.NewPassTxt
  };
}

const mapDispatchToProps = dispatch => {
  return {
    ErrorReset:()=>{
    return dispatch(auth.ErrorReset());
    },
    PasswordConfirm: (uid,token,password)=>{
    return dispatch(auth.resetPasswordConfirm(uid,token,password));
    },

    setUIDTxt:(UIDTxt)=>{
    return dispatch(auth.setUIDTxt(UIDTxt));
    },
    setTokenTxt:(TokenTxt)=>{
    return dispatch(auth.setTokenTxt(TokenTxt));
    },
    setNewPassTxt:(NewPassTxt)=>{
    return dispatch(auth.setNewPassTxt(NewPassTxt));
    }

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(confirmResetPassword);