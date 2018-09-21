import React, { Component } from 'react';
import {Link, Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import {auth} from "../actions";



const Confirmation = () => {
  return (
  <div style={{textAlign:'center'}}>
  <h2>نشكر تفاعلكم مع نظام</h2>
  <h2>TOTEX</h2>
   <h2> سيتم التأكد من صحة المعلومات الخاصة بكم ليتم التواصل معكم بشأن تفعيل حسابكم.</h2>
  </div>
  )
}


export default (Confirmation);