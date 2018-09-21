const initialState ={
newUsers:[],
isLoading: true,
};
export default function newUsers (state=initialState,action){
let newUsersList = state.newUsers.slice();
        switch(action.type)
            {
                case 'FETCHING_NEWUSER':
                    return {...state, isLoading:true};
                case 'FETCH_NewUser':
                    state = {};
                    return {...state,newUsers:action.newUsers,isLoading: false};
                case 'ADD_NewUser':
                    return [...state,action.newUsers];
                case 'UPDATE_NewUser':

                    let UserToUpdate=newUsersList[action.index];
                    console.log(newUsersList[action.index]);
                    console.log(action.newUsers);

                    UserToUpdate.User.is_staff=action.newUsers.is_staff;
                    newUsersList.splice(action.index,1,UserToUpdate);
                   return {...state,newUsers:newUsersList,isLoading: false};
                case 'DELETE_NewUser':
                    newUsersList.splice(action.index,1);
                    return {...state,newUsers:newUsersList,isLoading: false};
                default:
                return state;
            }
}

