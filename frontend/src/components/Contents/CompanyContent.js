import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {notes,owner,auth,newUsers,companyStore} from '../../actions';
import $ from 'jquery';
import { Button,Icon,Input,Dropdown,NavItem,Navbar,Row } from 'react-materialize';


 class CompanyContent extends Component {

state = {
  status: "",
  updateUserId: null,
  clickTab:{first:true,second:false,third:false, fourth:false},
  QT:"all",
  qSearch:"all"
}

 myRef = React.createRef();
componentDidMount()
{
this.props.fetchCompanyStore(this.props.urlPage,this.state.QT,this.state.qSearch);

var btns = document.getElementsByClassName("abtn");
// Loop through the buttons and add the active class to the current/clicked button
var disFlag=true;
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("TabCompactive");
     if (current.length > 0) {
    current[0].className = current[0].className.replace(" TabCompactive", "");
    }
    this.className += " TabCompactive";

                });
}

var input = document.getElementById("searchInput");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", (event)=> {
  // Cancel the default action, if needed
  event.preventDefault();
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13)
    if(!(input.value >= 65 && input.value <= 123) && (input.value != 32 && input.value != 0))
   {
    // Trigger the button element with a click
    document.getElementById("btnSearch").click();
    var current = document.getElementsByClassName("TabCompactive");
    if(current.length)
    {
        current[0].className = current[0].className.replace(" TabCompactive", "");
    }

  }
});
}

componentWillUnmount() {
 this.props.resetCompanyStore();

}
componentWillUpdate(nextProps, nextState){
if(this.state.QT!=nextState.QT || this.state.qSearch!=nextState.qSearch)
        this.props.fetchCompanyStore(nextProps.urlPage,nextState.QT,nextState.qSearch);


}


NextCompanyStore() {
    this.props.fetchCompanyStore(this.props.urlPage,this.state.QT,this.state.qSearch);
}

 handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && this.props.urlPage!=null) {
    this.props.fetchCompanyStore(this.props.urlPage);
    console.log("BOTTOM REACHED:",bottom); }
  }


render(){

return (
  <div className="content">
        <div className="AdminTaskClass">tasks</div>
        <div className="mainDiv">
            <div className="contentDiv">
                <div className="CompanyContentClass" >
        <div className="taskItem">
<div>
  <div className="FirstTask"><a className="abtn TabCompactive"
  onClick={this.state.clickTab['first']?"return false":()=>{
  this.setState({clickTab:{first:true,second:false,third:false, fourth:false},QT:"all",qSearch:"all"});
  this.props.resetCompanyStore();
  this.myRef.current.value="";

  }}>
   جميع الشراكات
   </a></div>
  {this.state.clickTab['first']&&(<span className="Pointer" style={{marginRight:"64px"}}></span>)}

 </div>

<div>
  <div className="SecondTask"><a className="abtn"
   onClick={this.state.clickTab['second']?"return false":()=>{
      this.setState({clickTab:{first:false,second:true,third:false,fourth:false},QT:"new",qSearch:"all"});
      this.props.resetCompanyStore();
      this.myRef.current.value="";
  }}>
  شراكات جديدة
  </a>
  </div>
  {this.state.clickTab['second']&&(<span className="Pointer"></span>)}
 </div>

<div>
  <div className="ThirdTask"> <a className="abtn"
  onClick={this.state.clickTab['third']?"return false":()=>{
    this.setState({clickTab:{first:false,second:false,third:true, fourth:false},QT:"wait",qSearch:"all"})
    this.props.resetCompanyStore();
    this.myRef.current.value="";


  }}>
   شراكات لم تؤكد
</a> </div>
  {this.state.clickTab['third']&&(<span className="Pointer"></span>)}
 </div>


<div>
  <div className="ThirdTask"> <a className="abtn"
  onClick={this.state.clickTab['fourth']?"return false":()=>{
      this.setState({clickTab:{first:false,second:false,third:false,fourth:true},QT:"shared",qSearch:"all"});
      this.props.resetCompanyStore();
      this.myRef.current.value="";

  }}>
   شراكات مؤكدة
</a> </div>
  {this.state.clickTab['fourth']&&(<span className="Pointer"></span>)}
 </div>

  <div className="CompanyDivSearch">
  <input id="searchInput"  ref={this.myRef} type="text" placeholder="ابحث عن الشراكات المطلوبة"/>
  <button className="btnSearch" id="btnSearch" onClick={()=>{
    if(!(this.myRef.current.value >= 65 && this.myRef.current.value <= 123) && (this.myRef.current.value != 32 && this.myRef.current.value != 0))
  {
        this.props.resetCompanyStore();
        this.setState({clickTab:{first:false,second:false,third:false,fourth:false},QT:"qs",
        qSearch:this.myRef.current.value});
  }
  }}>   <Icon left className="searchIcon">search</Icon>
</button>
  </div>
  </div>
          {this.props.companyStore.map((u, id) => (

           <div key={`note_${id}`}>
           <div><img src={u.profile_pic} width="25px" className="LogoCss"/></div>
                <div>
                <div style={{color:"#484545", justifySelf: "right"}}>
                <span>  {u.User.username} </span> <span className={u.user_type=="provider"?"":"smallColor"} style={{color:"black", fontSize:"15px"}}>  (<Icon className="smallI">business_center</Icon> {u.user_type=="provider"?"مجهز":"مستفيد"})</span>
                </div>
               <div style={{display:"flex"}}>  <i class="fa fa-mobile" style={{marginLeft: "10px"}}></i> <span style={{fontSize:"10px", color:"gray", marginRight:"9px"}}>{u.Mobile}</span></div>
               <div style={{display:"flex"}}>  <i class="fa fa-envelope" style={{    marginLeft: "10px"}}></i> <span style={{fontSize:"10px", color:"gray"}}>{u.User.email}</span></div>
               <div style={{display:"flex"}}>  <i class="fa fa-map-marker" style={{    marginLeft: "10px",  }}></i><span style={{fontSize:"10px", color:"gray",    paddingLeft: "20px",fontSize: "10px",color: "gray", textAlign: "justify", marginRight: "7px"}}>{u.Address}</span></div>

                </div>
                {(u.user_type=="provider"&&u.IsSubscribed=="no")&&(<div style={{padding: "15px"}}>
                <Button type="button" className='HeaderCompCustomBtn' waves='light' disabled={u.user_type=="client"} onClick={()=>this.props.subscribingWithCompany(u.User.id,id)}> شراكة <Icon right>share</Icon> </Button>
                 </div>)}
                   {(u.user_type=="provider"&&!u.IsSubscribed)&& (<div  style={{padding: "15px"}}>
                        <Dropdown className="PerCompCustomDropDown" style={{paddingRight:"1px"}} trigger={<Button className="HeaderCompCustomBtn">انتظار <Icon right className="waitRedIcon">watch_later</Icon></Button>}>
                            <NavItem href="#"> <Icon right>cancel</Icon>ألغاء الشراكة</NavItem>
                        </Dropdown>
                    </div>)}

                     {(u.user_type=="provider"&&u.IsSubscribed==true)&&(<div style={{padding: "15px"}}>
                <Button type="button" className='HeaderCompCustomBtn' waves='light' disabled={u.user_type=="client"}> تفاصيل <Icon right>share</Icon> </Button>
                 </div>)}
           </div>

            ))}

    {this.props.urlPage!=null&& (<div className="footerTask" onClick={()=>{
    this.setState({qSearch:"all"})
    this.myRef.current.value="";
    this.NextCompanyStore();

    }} style={{display:"flex"}}>

        <div>
      <p >
         المزيد من الشركات .....
       </p>
       </div>
        <div>

         {this.props.isLoading && (<i className="fa fa-cog fa-spin fa-3x fa-fw customSpainner" style={{marginTop:"0px", marginRight:"300px", color:"#dad5d5", fontSize:"2em"}}></i>)}

       </div>

        </div>
        )}

        </div>
            </div>
            <div className="adDiv"> ad div

            </div>
        </div>


        </div>
)

} }



const mapStateToProps = state => {
  return {
    companyStore: state.companyStore.companyStore,
    user: state.auth.user,
    isAuth:state.auth,
    urlPage:state.companyStore.urlPage,
    isLoading: state.companyStore.isLoading,
  }
}

const mapDispatchToProps = dispatch => {
  return {

    fetchCompanyStore: (urlPage,QT,qSearch) => {
       dispatch(companyStore.fetchCompanyStore(urlPage,QT,qSearch));
    },

    subscribingWithCompany:(providerID,index)=>{
       dispatch(companyStore.subscribingWithCompany(providerID,index))
    },

    resetCompanyStore:()=>{
        dispatch(companyStore.resetCompanyStore())
    }
}
}
export default connect(mapStateToProps, mapDispatchToProps)(CompanyContent);
