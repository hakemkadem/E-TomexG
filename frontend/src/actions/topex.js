
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




//
//export const addNotes = text => {
//  return (dispatch,getState) => {
//  const token = getState().auth.token;
//
//    let headers = {
//      "Content-Type": "application/json",
//    };
//
//    if (token) {
//      headers["Authorization"] = `Token ${token}`;
//    }
//
//    let body = JSON.stringify({text, });
//    return fetch("/api/note/", {headers, method: "POST", body})
//      .then(res => res.json())
//      .then(note => {
//        return dispatch({
//          type: 'ADD_NOTE',
//          note
//        })
//      })
//  }
//}
//
//
//export const updateNotes = (index, text) => {
//  return (dispatch, getState) => {
//
//    const token = getState().auth.token;
//
//    let headers = {
//      "Content-Type": "application/json",
//    };
//
//    if (token) {
//      headers["Authorization"] = `Token ${token}`;
//    }
//
//    let body = JSON.stringify({text, });
//    let noteId = getState().notes[index].id;
//
//    return fetch(`/api/note/${noteId}/`, {headers, method: "PUT", body})
//      .then(res => res.json())
//      .then(note => {
//        return dispatch({
//          type: 'UPDATE_NOTE',
//          note,
//          index
//        })
//      })
//  }
//}
//
//
//export const deleteNotes= (index)=>{
//  return(dispatch,getState)=>{
//const token = getState().auth.token;
//
//    let headers = {
//      "Content-Type": "application/json",
//    };
//
//    if (token) {
//      headers["Authorization"] = `Token ${token}`;
//    }
//
//  let noteId= getState().notes[index].id;
//
//  return fetch(`/api/note/${noteId}`,{headers,method:"DELETE"})
//  .then(res=>{
//  if(res.ok)
//  {
//    return dispatch({
//    type:"DELETE_NOTE",
//    index
//    })
//  }
//
//  })
//
//
//  }
//
//
//}


