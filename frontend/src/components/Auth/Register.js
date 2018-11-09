import React, {Component} from "react";
import {connect} from "react-redux";
import {Link, Redirect,BrowserRouter} from "react-router-dom";
import {auth} from "../../actions";
import $ from "jquery";
import {Button, Icon,Input,Row,ProgressBar} from 'react-materialize'

class Register extends Component {


  state = {
    username: "",
    password: "",
    address:"",
    license:"",
    user_type:"client",
    logo:"",
    licenseDoc:"",
    TheEmail:"",

  }

  onSubmit = e => {
    e.preventDefault();
    this.props.register(
     this.state.username,
     this.state.password,
     this.state.address,
     this.state.license,
     this.state.user_type,
     this.state.logo,
     this.state.licenseDoc,
     this.state.TheEmail,

     );
  }


 reloadLoginRoute = () => {
            BrowserRouter.push({ pathname: '/empty' });
            BrowserRouter.replace({ pathname: '/login' });
        }

render(){

return(

<div className="RegisterContent">

        <div className="RegHeader">
        {this.props.isLoading &&
         (<ProgressBar color="blue" className="blue" />)
         }
        </div>
        <div className="RegContent">


        <div className=" RegContentHeader">
            <div className={this.props.errors.length >1? " RegValidation":" RegDeValidation"}>
              {this.props.errors.length > 1 && (this.props.errors[1].message )}
            </div>
        </div>

 <form onSubmit={this.onSubmit}>
 {this.props.isExist &&<div className="RegContentContent UserWaitActivation">

 السلام عليكم....
 <br/>
 فريق توبكس يحييكم ويتمنى لكم طيب الاوقات. سيتم تفعيل حسابكم للدخول الى منظومة توبكس لمعلومات. لمعلومات اكثر اتصل على 07821070993

 </div>}
         { !this.props.isExist &&   <div className="RegContentContent">

            <div>   <h5>انشاء حساب في منظومة TOPEX</h5>  </div>
            <br/>

            <div>
                    <Input  s={12} label=" اسم المستخدم" autocomplete="off"
                          type="text" id="username" spellcheck="false"
                          onChange={e => this.setState({username: e.target.value})} />
            </div>

            <div>


                    <Input s={12} label="الرمز السري" autocomplete="off"
                          type="password" id="password" spellcheck="false"
                          onChange={e => this.setState({password: e.target.value})} />
            </div>


            <div>

                      <Input type="email" label="البريد الالكتروني" s={12}
                          type="text" id="TheEmail"
                          onChange={e => this.setState({TheEmail: e.target.value})} />
            </div>


            <div>

                    <Input type="text" label="العنوان المكاني" s={12}
                          id="address"
                         onChange={e => this.setState({address: e.target.value})} />

            </div>


            <div>


            <Input type="text" label="رقم الاجازة السياحية" s={12}
                          id="license"
                          onChange={e => this.setState({license: e.target.value})} />
            </div>


            <div>
                <Input label="تحميل"  s={12} multiple placeholder="يرجة تحميل شعار الشركة بصيغة PNG"

                        type="file"
                        multiple={false}
                        accept=".jpg,.jpeg,.png"
                        onChange={e => this.setState({logo: e.target.files[0]})

                        }
                      />
            </div>

            <div>
            <Input label="تحميل"  s={12} multiple placeholder="يرجى تحميل رخصة الشركة بصيغة PDF"

                        type="file"
                        multiple={false}
                        accept="*"
                        onChange={e => this.setState({licenseDoc: e.target.files[0]})

                        }

                      />
            </div>


            <div style={{borderBottom:"1px solid #f1f1f1", width: "410px", color:"gray"}}>
              <h6>اختر نوع الحساب المراد تفعيله:</h6>
                <Input type="radio" name="Type" value="client"  label='مستفيد'
                 checked ={this.state.user_type ==='client'} className='with-gap'
                 onChange={e => this.setState({user_type: e.target.value})}
                 />
                <Input type="radio" name="Type" value="provider" label='مجهز'
                checked ={this.state.user_type ==='provider'} className='with-gap'
                       onChange={e => this.setState({user_type: e.target.value})}/>

            </div>
                <br/>


            <div className="RegBtn" style={{display: "flex"}}>
             <p style={{marginLeft:"auto",    fontSize: "13px",color: "gray",fontWeight:"bold"}}>
               هل تملك حساب مسبقا؟ <Link onClick={this.reloadLoginRoute} to="/login">دخول</Link>
             </p>
             <Button type="submit" waves="light"  className="blue">تسجيل <Icon left>cloud</Icon></Button>
            </div>


            </div>}
              </form>

            <div className="RegContentContent">
                <div> <img   src="http://localhost:8000/media/Logo/Logo.png" width="200px"/> </div>
                { !this.props.isExist && <div style={{
                 textAlign: "center",
                color: "rgb(115, 113, 113)",
                fontSize: "16px",
                paddingRight:"20px",
                paddingLeft:"20px",
                fontWeight: "bold"}}>انشاء حساب واحد فقط.
                     يمكنك من رؤية المنتجات السياحية لشركات العراق
                </div>}

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
    isExist: state.auth.isExist,
    isLoading:state.auth.isLoading
  };
}

const mapDispatchToProps = dispatch => {
  return {
    register: (username, password,address,license,user_type,logo,licenseDoc,TheEmail) => dispatch(auth.register(username, password,address,license,user_type,logo,licenseDoc,TheEmail)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);