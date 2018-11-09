import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {notes,owner,auth,companyStore} from '../../actions';
import $ from 'jquery';
import CompanyContent from './CompanyContent';


class CompanyHome extends Component {

 state = { Costhover1: false , Costhover2:false, clickSelection1:true, clickSelection2:false};

componentDidMount()
{}


  CustomhoverOn(t){
        if(t=='1')
        {
          this.setState({ Costhover1: true });

          }
        if(t=='2')
          this.setState({ Costhover2: true });
        }
  CustomhoverOff(t){
         if(t=='1')
          this.setState({ Costhover1: false });
        if(t=='2')
          this.setState({ Costhover2: false });
        }

ClickSelectionFunc(t){
if(t=='1')
{
this.setState({ clickSelection1: true,clickSelection2: false });
this.props.fetchNewUser();
}
else

{
this.setState({ clickSelection1: false,clickSelection2: true });
}
}

render(){
let spinnerElem;
if(this.props.companyStore.isLoading)
    {
    spinnerElem =  (<div className="BackSpinner">
 <i className="fa fa-cog fa-spin fa-3x fa-fw customSpainner"></i>
 <br/>
 جار التحميل...
 </div>)

    }
return (
 <div className="Admincontainer">

 <div className="AdminRMenu">
    <div className={ this.state.Costhover1||this.state.clickSelection1 ?"CustomerhoverOn" :"CustomerhoverOff"}
                            onMouseEnter={()=>this.CustomhoverOn('1')}
                            onMouseLeave={()=>this.CustomhoverOff('1')}
                            onClick     ={()=>this.ClickSelectionFunc('1')}
                            >

            <div><i className="fa fa-handshake-o"  aria-hidden="true"></i></div>
            <div>عملاء جدد</div>
    </div>

      <div className={this.state.Costhover2||this.state.clickSelection2 ?"CustomerhoverOn" :"CustomerhoverOff"}
                            onMouseEnter={()=>this.CustomhoverOn('2')}
                            onMouseLeave={()=>this.CustomhoverOff('2')}
                            onClick     ={()=>this.ClickSelectionFunc('2')}
                            >
            <div><i class="fa fa-users" aria-hidden="true"></i></div>
            <div>عملاء سابقين</div>
    </div>

 </div>

<CompanyContent/>
    </div>

)

}

}

const mapStateToProps = state => {
  return {
    companyStore: state.companyStore,
    user: state.auth.user,
    isAuth:state.auth,
  }
}


export default connect(mapStateToProps)(CompanyHome);


