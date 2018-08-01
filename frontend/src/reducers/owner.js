const initialState =[
{name:"hakim"}
];

export default function notes (state=initialState,action){
let nameList = state.slice();
        switch(action.type)
            {
                case 'DELETE_NAME':
                    nameList.splice(action.id,1)
                    return nameList;
                default:
                return state;
            }
}

