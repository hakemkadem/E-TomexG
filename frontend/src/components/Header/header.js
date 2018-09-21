import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link,Route,Redirect,BrowserRouter} from 'react-router-dom';
import {notes,owner,auth} from '../../actions';
import $ from 'jquery';


 class Header extends Component {
         state = { hover1: false , hover2:false, clickedOutside: true};
         componentDidMount() {
            document.addEventListener("mousedown", this.handleClickOutside);
                             }

         componentWillUnmount() {
            document.removeEventListener("mousedown", this.handleClickOutside);
                                }

        myRef = React.createRef();
        handleClickOutside = e => {
                if (!this.myRef.current.contains(e.target)) {
                        this.setState({ clickedOutside: true });

                        }

                      };
        handleClickInside = () => {
        this.redirectToTarget();
          if(this.state.clickedOutside)
                this.setState({ clickedOutside: false });
            else
                this.setState({ clickedOutside: true });
            }
        hoverOn(t){
        if(t=='1')
          this.setState({ hover1: true });
        if(t=='2')
          this.setState({ hover2: true });
        }
        hoverOff(t){
         if(t=='1')
          this.setState({ hover1: false });
        if(t=='2')
          this.setState({ hover2: false });
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

        let AdminE;
        let ProviderElement;

             if(this.props.auth.isSuperuser){
                 AdminE= (

                              <div onClick={this.redirectToTarget}>
                               <Link  onClick={this.reloadAdminRoute} to="/Myadmin">
                                   <div><img src="/static/bundles/media/RDLOGO.png" width="25px" className="LogoCss"/></div>
                                   <div style={{marginTop: '-12px'}}>المدير</div>
                               </Link>
                              </div>
               )
}
               if(this.props.auth.CustomerType!='client'){

               ProviderElement =(<div>
                              <Link  onClick={this.reloadProviderRoute} to="/company">
                            <div><img src="/static/bundles/media/RDLOGO.png" width="25px" className="LogoCss"/></div>
                            <div style={{marginTop: '-12px'}}>المجهز</div>
                            </Link>
                            </div>)
               }


        return (
            <div className="header">
                <div><img src="/static/bundles/media/RDLOGO.png" width="25px" style={{borderRadius:'50px'}} /></div>
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

                 {!this.state.clickedOutside&&( <div  className="MainAppCorner">
                        <div className="AppCorner"
                        aria-label="Google apps"
                        aria-hidden="false"
                        role="region">
                        {AdminE}

                        {ProviderElement}

                             <div>
                            <div><img src="/static/bundles/media/RDLOGO.png" width="25px" className="LogoCss"/></div>
                            <div style={{marginTop: '-12px'}}>العميل</div>
                            </div>


                        </div>
                        </div>
)}
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
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);