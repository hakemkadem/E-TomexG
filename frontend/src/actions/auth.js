export const loadUser = () => {
  return (dispatch, getState) => {
    dispatch({type: "USER_LOADING"});
    const token = getState().auth.token;

    let headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Token ${token}`;

    }
//    if(token!=null)
    return fetch("/api/auth/user/", {headers, })
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status == 200) {
          dispatch({type: 'USER_LOADED', data: res.data });

          return res.data;
        } else if (res.status >= 400 && res.status < 500) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        }
      })
  }
}
export const login = (username, password) => {
  return (dispatch, getState) => {
    dispatch({type: "USER_LOGINNING"});
    let headers = {"Content-Type": "application/json"};
    let body = JSON.stringify({username, password});

    return fetch("/api/auth/auth_login/", {headers, body, method: "POST"})
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({type: 'LOGIN_SUCCESSFUL', data: res.data });
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        } else {
          dispatch({type: "LOGIN_FAILED", data: res.data});
          throw res.data;
        }
      })
  }
}
export const register = (username, password,address,license,user_type,profile_pic,licenseDoc,TheEmail) => {
  return (dispatch, getState) => {
    dispatch({type:'REGISTRATION_PROCESSING'});
    let headers = {};
    let formData = new FormData();
    formData.append('username',username);
    formData.append('password',password);
    formData.append('address',address);
    formData.append('license',license);
    formData.append('user_type',user_type);
    formData.append('profile_pic',profile_pic);
    formData.append('license_pdf',licenseDoc);
    formData.append('TheEmail',TheEmail);

    let body =formData;

    return fetch("/api/auth/register/", { credentials: 'include', headers, body, method: "POST"})
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({type: 'REGISTRATION_SUCCESSFUL', data: res.data });
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        } else {
          dispatch({type: "REGISTRATION_FAILED", data: res.data});
          throw res.data;
        }
      })
  }
}
export const logout = () => {
  return (dispatch, getState) => {

   const token = getState().auth.token;
   console.log(token)
   let headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    return fetch("/auth/token/logout/", {headers, body: "", method: "POST"})
      .then(res => {
        if (res.status === 204) {
          return {status: res.status, data: {}};
        } else if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 204) {
          dispatch ({type:'LOGOUT'})
          dispatch({type: 'LOGOUT_SUCCESSFUL'});
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        }
      })
  }
}
export const PasswordReset = (email) => {
  return (dispatch, getState) => {
    dispatch({type: "EMAILSENDING_LOADING"});

    let headers = {
      "Content-Type": "application/json",
    };
    let body = JSON.stringify({email});
    return fetch("/api/resetPassword/", {headers,body, method: "POST" })
      .then(res => {
          console.log(res.status)
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status == 200) {
            if(res.data.status==404)
                 dispatch({type: "PASSWORDRESET_ERROR", data: res.data});
            else
                 dispatch({type: 'PASSWORD_RESETTED' });
          return res.data;
        } else if (res.status >= 400 && res.status < 500) {
          dispatch({type: "PASSWORDRESET_ERROR", data: res.data});
          throw res.data;
        }
      })
  }
}
export const ConfirmRSC = (index,ClientID) => {
  return (dispatch, getState) => {
     dispatch({ type: 'SET_LOADING_PER_COMP_REQ',id:index});

   const token = getState().auth.token;
    let headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }
    let body = JSON.stringify({ClientID});
    return fetch("/api1/ConfirmRSC", {headers,body, method: "PATCH" })
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status == 200) {
            if(res.data.status==404)
                 dispatch({type: "CONFIRMRSC_ERROR", data: res.data});
            else
                 dispatch({type: 'CONFIRMRSC_RECIEVED', data: res.data });
          return res.data;
        } else if (res.status >= 400 && res.status < 500) {
          dispatch({type: "PASSWORDRESET_ERROR", data: res.data});
          throw res.data;
        }
      })
  }
}
export const fetchCountRSC=()=>{
return (dispatch,getState)=>{
 dispatch({type:'FETCHING_CountRSC'});
 const token = getState().auth.token;
    let headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }
return fetch('/api1/CountRSC',{headers,})
       .then(res=>res.json())
       .then(CountRSC=>{
       dispatch({
       type:'FETCH_CountRSC',
       CountRSC
       })
       })


}

}
export const fetchConfirmCompReq=()=>{
return (dispatch,getState)=>{
 dispatch({type:'FETCHING_ConfirmCompReq'});
 const token = getState().auth.token;
    let headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }
return fetch('/api1/ConfirmCompReq',{headers,})
       .then(res=>res.json())
       .then(ConfirmCompReq=>{
       dispatch({
           type:'FETCH_ConfirmCompReq',
       ConfirmCompReq
       })
       })


}
}
export const LoadingPerCompReq=(id)=>{
return (dispatch) => {
    dispatch({ type: 'SET_LOADING_PER_COMP_REQ',id:id});
}
}

//test
export const resetPasswordConfirm = (uid,token, new_password) => {
  return (dispatch, getState) => {
    dispatch({type: "PASSCONFIRM_LOGINNING"});
    let headers = {"Content-Type": "application/json"};
    let body = JSON.stringify({uid,token,new_password});

    return fetch("/api/confirmResetPassword/", {headers, body, method: "POST"})
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({type: 'PASSCONFIRM_SUCCESSFUL', data: res.data });
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          dispatch({type: "PASSCONFIRM_ERROR", data: res.data});
          throw res.data;
        } else {
          dispatch({type: "PASSCONFIRM_FAILED", data: res.data});
          throw res.data;
        }
      })
  }
}
export const setEmailTxt=(txt)=>{
return (dispatch, getState) => {
    dispatch({ type: 'SET_EMAIL_TXT', data: txt });
}
}
export const setUIDTxt=(txt)=>{
return (dispatch, getState) => {
    dispatch({ type: 'SET_UID_TXT', data: txt });
}
}
export const setTokenTxt=(txt)=>{
return (dispatch, getState) => {
    dispatch({ type: 'SET_TOKEN_TXT', data: txt });
}
}
export const setNewPassTxt=(txt)=>{
return (dispatch, getState) => {
    dispatch({ type: 'SET_NEWPASS_TXT', data: txt });
}
}
export const ErrorReset=()=>{
 return (dispatch, getState) => {
    dispatch({type: "ERRORS_RESET"});
}
}