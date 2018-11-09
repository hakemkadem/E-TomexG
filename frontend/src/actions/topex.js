
export const fetchNewUser=()=>{
return (dispatch,getState)=>{
 dispatch({type:'FETCHING_NEWUSER'});
 const token = getState().auth.token;
    let headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }
return fetch('/api1/newuser/',{headers,})
       .then(res=>res.json())
       .then(newUsers=>{
       dispatch({
       type:'FETCH_NewUser',
       newUsers
       })
       })


}

}
export const userActivation = (index, is_staff) => {
  return (dispatch, getState) => {
  dispatch({type: 'FETCHING_NEWUSER'});
    const token = getState().auth.token;
    let headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }
    let body = JSON.stringify({is_staff, });
    let userId = getState().newUsers.newUsers[index].User.id;

    return fetch(`/api1/useractive/${userId}/`, {headers, method: "PATCH", body})
      .then(res => res.json())
      .then(newUsers => {
        return dispatch({
          type: 'UPDATE_NewUser',
          newUsers,
          index
        })
      })
      .then(()=>{
       let CustomerType = getState().newUsers.newUsers[index].User.id;
       body = JSON.stringify({"UserID":userId });
       return fetch('/api1/CustomerCreation/', {headers, method: "PATCH", body})
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
