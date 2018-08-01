import React, { Component } from 'react';
import {connect} from 'react-redux';
import {notes,owner} from '../actions';

class PonyNote extends Component {
state = {
  text: "",
  updateNoteId: null,
  name:""
}

componentDidMount()
{
    this.props.fetchNotes();
}

resetForm = () => {
  this.setState({text: "", updateNoteId: null});
}

selectForEdit = (id) => {
  let note = this.props.notes[id];
  this.setState({text: note.text, updateNoteId: id});
}

submitNote = (e) => {
  e.preventDefault();
  if (this.state.updateNoteId === null) {
    this.props.addNote(this.state.text);
  } else {
    this.props.updateNote(this.state.updateNoteId, this.state.text);
  }
  this.resetForm();
}

  render() {
    return (
      <div>
        <h2>Welcome to PonyNote!</h2>
        <hr />

        <h3>Notes of Redux</h3>

        <h3>Add new note ddd </h3>
<form onSubmit={this.submitNote}>
  <input
    value={this.state.text}
    placeholder="Enter note here..."
    onChange={(e) => this.setState({text: e.target.value})}
    required />
  <input type="submit" value="Save Note" />
   <button onClick={this.resetForm}>Reset</button>
</form>

        <table>
          <tbody>
            {this.props.notes.map((note, id) => (
              <tr key={`note_${id}`}>
                <td>{note.text}</td>
                <td><button onClick={() => this.selectForEdit(id)}>edit</button></td>
                <td><button onClick={() => this.props.deleteNote(id)}>delete</button></td>

              </tr>
            ))}

            {this.props.owners.map((note, id) => (
              <tr key={`note_${id}`}>
                <td>{note.name}
                                {console.log(this.props.owners)}

                </td>
                <td><button onClick={() => this.selectForEdit(id)}>edit</button></td>
                <td><button onClick={() => this.props.deleteName(id)}>delete</button></td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    )
  }
}



const mapStateToProps = state => {
  return {
    notes:  state.notes,
    owners: state.owner
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
   fetchNotes: ()=>{
    dispatch(notes.fetchNotes())
    },
   addNote: (text) => {
      dispatch(notes.addNotes(text));
    },
    updateNote: (id, text) => {
      dispatch(notes.UpdateNotes(id, text));
    },
    deleteNote: (id) => {
      dispatch(notes.DeleteNotes(id));
    },
    deleteName: (id) => {
      dispatch(owner.DeleteNames(id));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PonyNote);