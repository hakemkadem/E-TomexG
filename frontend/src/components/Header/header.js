import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link,Route,Redirect,BrowserRouter} from 'react-router-dom';
import {notes,owner,auth} from '../../actions';
import $ from 'jquery';
import ReactLoading from 'react-loading';
import {Button, Icon,Input,Row,ProgressBar,Badge,Dropdown,NavItem,CollapsibleItem,Collapsible} from 'react-materialize'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
const bntStyle = {


    lineHeight: "33px",
    padding: "0px 0.5rem 0px 0.5rem"

};

const SpnStyle = {

    fontSize: "10px",
    color: "white",
    borderRadius: "4px",
    padding: "0px",
    top: "1px",
    position: "absolute",
    left: "10px",
    fontWeight: "bold"

};
 class Header extends Component {
         state = {
         hover1: false,
         hover2:false,
         hover3:false,
         clickedOutside: true,
         clickedOutsideCompReq: true,
         loading:[false,false,false],
        };
         componentDidMount() {
            document.addEventListener("mousedown", this.handleClickOutside);
            document.addEventListener("mousedown", this.handleClickReqCompOutside);
            this.props.fetchCountRSC();
                             }

         componentWillUnmount() {
            document.removeEventListener("mousedown", this.handleClickOutside);
            document.removeEventListener("mousedown", this.handleClickReqCompOutside);
                                }


componentWillUpdate(nextProps, nextState){
}


        myRef = React.createRef();
        myRefReqComp = React.createRef();
        handleClickOutside = e => {
                if (!this.myRef.current.contains(e.target)) {
                        this.setState({ clickedOutside: true });

                        }

                      };

        handleClickReqCompOutside = e => {
                if (!this.myRefReqComp.current.contains(e.target)) {
                        this.setState({ clickedOutsideCompReq: true });
                        }

                      };



        handleClickInside = () => {
        this.redirectToTarget();
          if(this.state.clickedOutside)
                this.setState({ clickedOutside: false });
            else
                this.setState({ clickedOutside: true });




            }
              handleClickInsideCompReq = () => {
        this.redirectToTarget();

          if(this.state.clickedOutsideCompReq)
                this.setState({ clickedOutsideCompReq: false });
            else
                this.setState({ clickedOutsideCompReq: true });


            }
        hoverOn(t){
        if(t=='1')
          this.setState({ hover1: true });
        if(t=='2')
          this.setState({ hover2: true });
        if(t=='3')
          this.setState({ hover3: true });
        }
        hoverOff(t){
         if(t=='1')
          this.setState({ hover1: false });
        if(t=='2')
          this.setState({ hover2: false });
        if(t=='3')
          this.setState({ hover3: false });
        }
        redirectToTarget = () => {
          // return <Redirect to='/admin' />
//console.log("Hi from redirect")
            }
        reloadAdminRoute = () => {
            BrowserRouter.push({ pathname: '/empty' });
            BrowserRouter.replace({ pathname: '/Myadmin' });
        }
          reloadProviderRoute = () => {
            BrowserRouter.push({ pathname: '/empty' });
            BrowserRouter.replace({ pathname: '/provider' });
        }



        render(){

        let RequiredCompanies;
        if(!this.props.ReqCompisLoading)
            {
            RequiredCompanies =(
            <div className="CompaniesRequestContent" >
                 {this.props.ConfirmCompReq.map((u, id) => (
                                        <div style={{display:"flex"}} key={`note_${id}`}>
                                            <div style={{
                                                     border: "1px solid rgba(3, 31, 53, 0.15)",
                                                     borderRadius: "10px",
                                                     marginLeft: "10px",
                                                           }} >

                                            <img src={u.profile_pic}  width="50px"
                                            style={{borderRadius:'50px'}} />
                                            </div>
                                            <div style={{ display:"grid"}}>
                                                <div style={{fontSize: "14px",
                                                            color: "#2196F3",
                                                            justifySelf: "right"}}>{u.User.username} </div>
                                                 <div style={{fontSize: "11px",
                                                            color: "gray",
                                                            justifySelf: "right"}}>{u.Address.substring(0, 30)}...</div>


                                            </div>
                                            <div  style={{marginRight: "auto", display:"flex"}}>
                                            <Button className="btnCat2" disabled={u.loading}
                                            onClick={()=>{this.props.AcceptPerCompReq(id,u.User.id)}}>
                                            قبول</Button>
                                            <Button className="btnCat3" >رفض</Button>
                                             {u.loading&&(
                                              <ReactLoading type='bars' className="ReactLoadingStyle1" />
                                              )}
                                            </div>
                                        </div>

            ))}
                 <div className="SeeMoreReqComp">رؤية المزيد</div>
            </div>
            )
            }

        else
            {
             RequiredCompanies =(  <div className="CompaniesRequestContent" >
                 <div style={{display:"grid", justifyContent: "center"}}>

                    <ReactLoading type='bars' className="ReactLoadingStyle2" />

                   </div>
                  </div>
                  )
            }


        let AdminE;
        let ProviderElement;
             if(this.props.auth.isSuperuser){
                 AdminE= (

                              <div onClick={this.redirectToTarget}>
                               <Link  onClick={this.reloadAdminRoute} to="/Myadmin">
                                   <div><img src="/media/Logo/6a6147cad9df4b7ca52bfaa210175173.png" width="25px" className="LogoCss"/></div>
                                   <div style={{marginTop: '-12px'}}>المدير</div>
                               </Link>
                              </div>
               )
}
               if(this.props.auth.CustomerType!='client'){

               ProviderElement =(<div>
                              <Link  onClick={this.reloadProviderRoute} to="/company">
                            <div><img src="/media/Logo/48e98f356c094454ad5d87e2135699ef.png" width="25px" className="LogoCss"/></div>
                            <div style={{marginTop: '-12px'}}>المجهز</div>
                            </Link>
                            </div>)
               }


        return (
            <div className="header">
                <div><img src="/media/Logo/abeb10922f2e42bbb5a21322f6b69d93.png" width="25px" style={{borderRadius:'50px'}} /></div>
                <div><i
                 className={ this.state.hover1 ?
                 "fa fa-bell hoverOn" : "fa fa-bell hoverOff"}
                              onMouseEnter={()=>this.hoverOn('1')}
                              onMouseLeave={()=>this.hoverOff('1')}></i></div>

                        <div ref={this.myRef} >
                        <i onClick={this.handleClickInside}
                         className={ this.state.hover2 ?
                          "fa fa-th  hoverOn" :
                          "fa fa-th  hoverOff"}
                                    onMouseEnter={()=>this.hoverOn('2')}
                                    onMouseLeave={()=>this.hoverOff('2')}
                        ></i>
                        <ReactCSSTransitionGroup
                           transitionName="example"
                           transitionEnterTimeout={200}
                           transitionLeaveTimeout={200}
                           >
                         {!this.state.clickedOutside&&(

                          <div className="MainAppCorner" >

                                <div className="AppCorner"
                               RDLOGO aria-label="Google apps"
                                aria-hidden="false"
                                role="region">
                                {AdminE}

                                {ProviderElement}

                                     <div>
                                    <div><img src="/media/Logo/b50542ec4e704af9a8e868015d09cfd6.jpg" width="25px" className="LogoCss"/></div>
                                    <div style={{marginTop: '-12px'}}>العميل</div>
                                    </div>


                                </div>

                                </div>

        )}

         </ReactCSSTransitionGroup>

                        </div>

<div  ref={this.myRefReqComp}>
<Badge className="CustomBadgeClass">{this.props.CountRSC}</Badge>
                            <i className={"hoverOff myHov fa fa-handshake-o" }
                                  onClick={()=>{
                                  this.handleClickInsideCompReq();
                                  if(this.state.clickedOutsideCompReq)
                                         this.props.fetchConfirmCompReq();

                                 }}
                                  onMouseEnter={()=>this.hoverOn('3')}
                                  onMouseLeave={()=>this.hoverOff('3')}>
                            </i>


             <ReactCSSTransitionGroup
                           transitionName="example"
                           transitionEnterTimeout={200}
                           transitionLeaveTimeout={200}>

                           {!this.state.clickedOutsideCompReq&&(<div className="CompaniesRequestContainer">
                                        <div className="CompaniesRequestHeader">طلب شراكات</div>
                                             {RequiredCompanies}
                                         </div>
                                )}
         </ReactCSSTransitionGroup>
</div>

                <div style={{ marginRight: "40px"}}>
                <Dropdown  className="HeaderCompCustomDropDown" style={{paddingRight:"1px"}} trigger={
                   <Button className="red HeaderCompCustomBtn" style={bntStyle}>شراكات العمل<Icon left>arrow_drop_down</Icon> <Icon right>business_center</Icon></Button>
                      }>
                      <li>
                      <Link right to="/company">
                       <div style={{display:"flex"}}>
                      <span class="fa fa-share-alt" aria-hidden="true" style={{margin: "5px 0px 0px 9px"}}></span>
                       <span>شراكات جديدة </span>
                      <span className="Headerspanlbl" >3</span>
                      </div>

                      </Link>
                      </li>
                      <NavItem>
                      <div style={{display:"flex"}}>
                      <span class="fa fa-handshake-o" aria-hidden="true" style={{margin: "5px 0px 0px 9px"}}></span>
                       <span>شراكات منفذة</span>
                      <span className="Headerspanlbl" >3</span>
                      </div>

                      </NavItem>
                      <NavItem divider />
                      <NavItem>

                       <div style={{display:"flex"}}>
                       <Icon right>business</Icon>
                       <span>شراكات مميزة </span>
                      <span className="Headerspanlbl" >3</span>
                      </div>
                      </NavItem>
                    </Dropdown>


               { false &&  (<Link  onClick={this.reloadProviderRoute} to="/company">
                <Button className="red" waves="light" style={bntStyle}>  الشركات<span style={SpnStyle}>({this.props.auth.CompanyNo})</span> <Icon right>business_center</Icon></Button>
               </Link>)}
                </div>
                <div className="topex"> <Link  to="/">TOPEX </Link></div>

            </div>
        )
    }

}


const mapStateToProps = state => {
  return {
    notes: state.notes,
    user: state.auth.user,
    auth:state.auth,
    CountRSC:state.auth.CountRSC,
    ConfirmCompReq:state.auth.ConfirmCompReq,
    ReqCompisLoading:state.auth.ReqCompisLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
   fetchCountRSC: () => {
      dispatch(auth.fetchCountRSC());
    },
     fetchConfirmCompReq: () => {
      dispatch(auth.fetchConfirmCompReq());
    },
    AcceptPerCompReq:(index,ID)=>{
    dispatch(auth.ConfirmRSC(index,ID));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);