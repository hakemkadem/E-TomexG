import queryString from 'query-string'
/*Companies Store*/
export const fetchCompanyStore=(url,QT,qSearch)=>{
return (dispatch,getState)=>{
dispatch({type:'FETCHING_COMPANY_STORE'});
const token = getState().auth.token;
let headers = {"Content-Type": "application/json",}
if(token)
    {
        headers["Authorization"] = `Token ${token}`;
    }

    if(qSearch!="all")
        url='http://localhost:8000/api1/allcustomers/';

    var Allurl = new URL(url);
    let paramy = new URL(url).searchParams;

    var params = paramy.get('page')?
    {QT,page:paramy.get('page'),qSearch}:
    {QT,qSearch}
    Allurl.search = new URLSearchParams(params)

return fetch(Allurl,{headers,})
       .then(res=>res.json())
       .then(companyStore=>{
       dispatch({ type:'FETCH_COMPANY_STORE',companyStore})
       })
}
}
export const subscribingWithCompany=(ProviderID,index)=>{
return (dispatch,getState)=>{
dispatch({type:'SUBSCRIBING_WITH_COMPANY'});
const token = getState().auth.token;
let headers = {"Content-Type": "application/json",}
let body= JSON.stringify({ProviderID});

if(token)
    {
        headers["Authorization"] = `Token ${token}`;
    }

return fetch('/api1/SubscriptionRequest',{headers,body, method:"POST"})
       .then(res=>res.json())
       .then(company=>{
       dispatch({ type:'SUBSCRIBED_WITH_COMPANY',company,index})})
}

    }
export const resetCompanyStore=()=>{
return (dispatch)=>{
return dispatch({type:'REFETCHING_COMPANY_STORE'})
}
}