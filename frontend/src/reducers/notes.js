const initialState =[];
export default function notes (state=initialState,action){
let noteList = state.slice();
        switch(action.type)
            {

                case 'FETCH_NOTES':
                    state = [];
                    return [...state,...action.notes];
                case 'ADD_NOTE':
                    return [...state,action.note];
                case 'UPDATE_NOTE':
                    let NoteToUpdate=noteList[action.index];
                    NoteToUpdate.text=action.note.text;
                    noteList.splice(action.index,1,NoteToUpdate);
                    return noteList;
                case 'DELETE_NOTE':
                    noteList.splice(action.index,1);
                    return noteList;
                default:
                return state;
            }
}

