
export const fetchNotes=()=>{
return (dispatch,getState)=>{
 const token = getState().auth.token;

    let headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }
return fetch('/api/note/',{headers,})
       .then(res=>res.json())
       .then(notes=>{

       dispatch({
       type:'FETCH_NOTES',
       notes
       })
       })


}

}


export const addNotes = text => {
  return (dispatch,getState) => {
  const token = getState().auth.token;

    let headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    let body = JSON.stringify({text, });
    return fetch("/api/note/", {headers, method: "POST", body})
      .then(res => res.json())
      .then(note => {
        return dispatch({
          type: 'ADD_NOTE',
          note
        })
      })
  }
}


export const updateNotes = (index, text) => {
  return (dispatch, getState) => {

    const token = getState().auth.token;

    let headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    let body = JSON.stringify({text, });
    let noteId = getState().notes[index].id;

    return fetch(`/api/note/${noteId}/`, {headers, method: "PUT", body})
      .then(res => res.json())
      .then(note => {
        return dispatch({
          type: 'UPDATE_NOTE',
          note,
          index
        })
      })
  }
}


export const deleteNotes= (index)=>{
  return(dispatch,getState)=>{
const token = getState().auth.token;

    let headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

  let noteId= getState().notes[index].id;

  return fetch(`/api/note/${noteId}`,{headers,method:"DELETE"})
  .then(res=>{
  if(res.ok)
  {
    return dispatch({
    type:"DELETE_NOTE",
    index
    })
  }

  })


  }


}


