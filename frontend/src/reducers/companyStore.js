/* this code is not good to use when the app needs to reset it reducer
const initialState={
companyStore:[],
isLoading:true,
test:[],
urlPage:"http://localhost:8000/api1/allcustomers/"
}
*/

export default function companyStore (state = {
companyStore:[],
isLoading:true,
urlPage:"http://localhost:8000/api1/allcustomers/"
},action){
let storeCompanyList = state.companyStore.slice();
let Myvar ={}


switch(action.type){

case "FETCHING_COMPANY_STORE":
    return {...state, isLoading:true}

case "FETCH_COMPANY_STORE":
    for (var i =0; i<action.companyStore.results.length; i++)
        state.companyStore.push(action.companyStore.results[i]);
    return {...state,isLoading:false, urlPage:action.companyStore.next}

case "SUBSCRIBING_WITH_COMPANY":
        return {...state,isLoading:true}

case "SUBSCRIBED_WITH_COMPANY":
        let UpdatedCompany = storeCompanyList[action.index];
        console.log(UpdatedCompany);
        UpdatedCompany.IsSubscribed=action.company.IsSubscribed;
        storeCompanyList.splice(action.index,1,UpdatedCompany);
        return {...state,companyStore:storeCompanyList,isLoading:false}
default:
 return state;
}

}