import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {notes,owner,auth,newUsers} from '../../actions';
import $ from 'jquery';
import { Button } from 'react-bootstrap';


 class NewUsers extends Component {

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


return (
  <div className="content">
        <div className="AdminTaskClass">tasks</div>
        <div className="AdminContentClass">
        <table className="UserWaitingTable">
        <thead>


          <tr>
            <th>ت</th>
            <th>معلومات الشركة</th>

            <th>نوع الاشتراك</th>
            <th>رمز الاجازة</th>
            <th>العنوان</th>
            <th>البريد الالكتروني</th>
            <th>الموبايل</th>
            <th>الحالة</th>
            <th>التفاصيل</th>
        </tr>
        </thead>

        <tbody>

         {this.props.newUsers.map((u, id) => (
           <tr key={`note_${id}`}>
            <td>{id+1}</td>
            <td><img src={u.profile_pic} width="100px"/>
           <br/>{u.User.username}
            </td>

            <td>{u.user_type}</td>
            <td>{u.license} </td>
            <td>{u.Address}</td>
            <td>{u.User.email}</td>
            <td>{u.Mobile}</td>
            <td>
           { !u.User.is_staff?
            <span>انتظار</span>: <span>مفعل</span>}


            </td>
            <td><Button  bsStyle={u.User.is_staff?"primary":"danger"} onClick={()=>this.UserStatusUpdate(id)}>تفعيل</Button></td>

           </tr>
            ))}
        </tbody>
        </table>

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
export default connect(mapStateToProps, mapDispatchToProps)(NewUsers);
