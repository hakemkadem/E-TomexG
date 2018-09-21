import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {notes,owner,auth,newUsers} from '../../actions';
import $ from 'jquery';
import { Button } from 'react-bootstrap';


 class CompanyContent extends Component {

state = {
  status: "",
  updateUserId: null,
}


componentDidMount()
{
this.props.fetchNewUser();
}


UserStatusUpdate(id) {
  this.props.userActivation(id, true);
}



render(){
let partialurl1="karam.png";
let partialurl2="2.png";
let partialurl3="3.png";
let partialurl4="4.png";
let partialurl5="5.png";
let partialurl6="6.png";
let partialurl7="7.png";
let partialurl8="8.png";
let partialurl9="9.png";

let url1 ="/static/bundles/media/"+partialurl1;
let url2 ="/static/bundles/media/"+partialurl2;
let url3 ="/static/bundles/media/"+partialurl3;
let url4 ="/static/bundles/media/"+partialurl4;
let url5 ="/static/bundles/media/"+partialurl5;
let url6 ="/static/bundles/media/"+partialurl6;
let url7 ="/static/bundles/media/"+partialurl7;
let url8 ="/static/bundles/media/"+partialurl8;
let url9 ="/static/bundles/media/"+partialurl9;


return (
  <div className="content">
        <div className="AdminTaskClass">tasks</div>

        <div className="CompanyContentClass">

        <div className="taskItem">task</div>
        <div>
                <div><img src={url1} width="25px" className="LogoCss"/></div>
                <div>
                <span>شركة البارقة</span>
                <span>كربلاء - شارع القنصلية</span>
                </div>
                <div><button> اشتراك </button></div>
        </div>

        <div>
                <div><img src={url2} width="25px" className="LogoCss"/></div>
                <div>
                <span>شركة البارقة</span>
                <span>كربلاء - شارع القنصلية</span>
                </div>
                <div><button> اشتراك </button></div>
        </div>


         <div>
                <div><img src={url3} width="25px" className="LogoCss"/></div>
                <div>
                <span>شركة البارقة</span>
                <span>كربلاء - شارع القنصلية</span>
                </div>
                <div><button> اشتراك </button></div>
        </div>


         <div>
                <div><img src={url4} width="25px" className="LogoCss"/></div>
                <div>
                <span>شركة البارقة</span>
                <span>كربلاء - شارع القنصلية</span>
                </div>
                <div><button> اشتراك </button></div>
        </div>


         <div>
                <div><img src={url5} width="25px" className="LogoCss"/></div>
                <div>
                <span>شركة البارقة</span>
                <span>كربلاء - شارع القنصلية</span>
                </div>
                <div><button> اشتراك </button></div>
        </div>


         <div>
                <div><img src={url6} width="25px" className="LogoCss"/></div>
                <div>
                <span>شركة البارقة</span>
                <span>كربلاء - شارع القنصلية</span>
                </div>
                <div><button> اشتراك </button></div>
        </div>


         <div>
                <div><img src={url7} width="25px" className="LogoCss"/></div>
                <div>
                <span>شركة البارقة</span>
                <span>كربلاء - شارع القنصلية</span>
                </div>
                <div><button> اشتراك </button></div>
        </div>


         <div>
                <div><img src={url8} width="25px" className="LogoCss"/></div>
                <div>
                <span>شركة البارقة</span>
                <span>كربلاء - شارع القنصلية</span>
                </div>
                <div><button> اشتراك </button></div>
        </div>


         <div>
                <div><img src={url9} width="25px" className="LogoCss"/></div>
                <div>
                <span>شركة البارقة</span>
                <span>كربلاء - شارع القنصلية</span>
                </div>
                <div><button> اشتراك </button></div>
        </div>





        </div>
        </div>
)

} }



const mapStateToProps = state => {
  return {
    newUsers: state.newUsers.newUsers,
    user: state.auth.user,
    isAuth:state.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchNewUser: () => {
      dispatch(newUsers.fetchNewUser());
    }
    ,
    userActivation: (id, status) => {
       dispatch(newUsers.userActivation(id, status));
    },
}
}
export default connect(mapStateToProps, mapDispatchToProps)(CompanyContent);
