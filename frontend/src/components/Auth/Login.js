import React, { Component } from 'react';
import {Link, Redirect,BrowserRouter} from "react-router-dom";
import {connect} from 'react-redux';
import {auth} from "../../actions";
import {Button, Icon,Input,Row,ProgressBar} from 'react-materialize'

class Login extends Component {

 state = {
    username: "",
    password: "",
    PasswordResetFlag:true,

  }


  onSubmit = e => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  }



 reloadRegisterRoute = () => {
            BrowserRouter.push({ pathname: '/empty' });
            BrowserRouter.replace({ pathname: '/register' });
        }

 SendPasswordReset=e=>{
   e.preventDefault();
   this.props.PasswordReset(this.props.emailTxt)
 }

render(){
 if (this.props.isExist) {
   if (this.props.isConfirmed)
      return <Redirect to="/" />
     else
      return <Redirect to="/wait" />
    }

return (
<form onSubmit={this.onSubmit}>
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
       this.props.errors.length >0 &&
       this.state.PasswordResetFlag &&
       this.props.errors[0].field!='detail' &&
       this.props.errors[0].field!='email'? " RegValidation":" RegDeValidation"}>
                    {(this.props.errors.length > 0 && this.props.errors[0].field=='username')?
                     "يرجى التاكد من اسم المستخدم او كلمة المرور"
                     :
                     (this.props.errors.length > 0 && this.props.errors[0].field=='password')?
                     "يرجى التاكد من اسم المستخدم او كلمة المرور"
                       :
                       "هنالك خطا في معلومات الدخول"

                     }

       </div>

 <div className={
 this.props.errors.length >0 &&
 !this.state.PasswordResetFlag &&
 !this.props.success&&
 (this.props.errors[0].message==404||
 this.props.errors[0].field=='email')? " RegValidation":" RegDeValidation"}>

                    {(this.props.errors.length > 0 &&
                     (this.props.errors[0].message==404))?
                       "هذا الايميل غير موجود في منظومة تومكس"
                        :
                       "يرجى التأكد من كتابة البريد الالكتروني بشكل صحيح"
                     }

       </div>

<div className={
                 this.props.success? "EmailSend":" RegDeValidation"}>
                  تم ارسال معلومات التغيير الى هذا الايميل يرجى مراجعة صندوق الرسائل
       </div>




{(this.state.PasswordResetFlag &&  <div className="LoginContentContentField">
        <div style={{textAlign:"center"}}>
        <img src="http://localhost:8000/media/logo.jpg" width="30%" />
          <h4>تسجيل دخول</h4>
        <h6> اســـتخدام حســاب TOMEX</h6>
        </div>

        <div> <Input type="text" label="اسم المستخدم" className="LoginText" id="username"
              onChange={e => this.setState({username: e.target.value})} /></div>

        <div>
        <Input type="password" label="الرمز السري" className="LoginText" id="password"
              onChange={e => this.setState({password: e.target.value})}/>
        </div>
        <div style={{paddingTop:"9px", color:"#1a73e8"}}><Link onClick={() => {this.setState({PasswordResetFlag:false,username:"",password:""});this.props.ErrorReset()}} to="#">هل نسيت كلمة المرور؟ </Link> </div>

        <div style={{paddingTop:"40px"}}>
        <div style={{color:"#1a73e8"}}> <Link onClick={this.reloadRegisterRoute} to="/register">انشاء حساب</Link> </div>
        <div style={{ marginRight: "auto"}}><Button type="submit" onClick={()=>this.props.ErrorReset()} disabled={this.props.isLoading} waves="light"  className="blue">تسجيل</Button></div>

        </div>
  </div>

)}



 {(!this.state.PasswordResetFlag && <div className="LoginContentContentField">
        <div style={{textAlign:"center"}}>
        <img src="http://localhost:8000/media/logo.jpg" width="30%" />
          <h4>استرداد الحساب</h4>
        <h6> اســـتخدام الايميل المسجل لدى TOMEX</h6>
        </div>

        <div> <Input type="text" label="البريد الالكتروني" className="LoginText" id="username"
              onChange={e => this.props.setEmailTxt(e.target.value)} value={this.props.emailTxt} /></div>
        <div style={{paddingTop:"40px", display:"flex"}}>
        <div style={{color:"#1a73e8"}}> <Link  onClick={() =>{ this.setState({PasswordResetFlag:true, email:""});this.props.ErrorReset()}} to="#">صفحة الدخول </Link> </div>
        <div style={{ marginRight: "auto"}}><Button type="button" disabled={this.props.isLoading} onClick={this.SendPasswordReset} waves="light"  className="blue">ارسال ايميل</Button></div>

        </div>
  </div>

)}



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
    isAuthenticated: state.auth.isAuthenticated,
    isConfirmed:     state.auth.isConfirmed,
    isExist:         state.auth.isExist,
    isLoading:state.auth.isLoading,
    success:state.auth.success,
    emailTxt:state.auth.emailTxt

  };
}

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => {
      return dispatch(auth.login(username, password));
    },
    PasswordReset:(email)=>{
    return dispatch(auth.PasswordReset(email));
    },
    ErrorReset:()=>{
    return dispatch(auth.ErrorReset());
    },
    setEmailTxt:(emailTxt)=>{
    return dispatch(auth.setEmailTxt(emailTxt));
    }

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);