import React, { Component } from 'react';
import {connect} from 'react-redux';
import {notes,owner,auth} from '../actions';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class PonyNote extends Component {
state = {
  text: "",
  updateNoteId: null,
  name:"",
   items: ["hello", "world", "click", "me"]
}

componentDidMount()
{
    this.props.fetchNotes();
    this.clickMe();
}

clickMe = ()=> {
   $('#h2').on('click', function(){
     $(this).css('color','red');
   });
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


  handleAdd=()=> {
    const newItems = this.state.items.concat([prompt("Enter some text")]);
    this.setState({ items: newItems });
  }

  handleRemove=(i)=> {
    let newItems = this.state.items.slice();
    newItems.splice(i, 1);
    this.setState({ items: newItems });
  }

  render() {
   let AdminEl;
     if(this.props.isAuth.isSuperuser){
       AdminEl= (
        <Link to="/admin">admin</Link>
        )
        }

 const items = this.state.items.map((item, i) => (
      <div  onClick={() => this.handleRemove(i)}>
        {item}
      </div>
    ));

    return (
      <div>


<button onClick={this.handleAdd}>Add Item</button>
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {items}
        </ReactCSSTransitionGroup>


      <i className="fa fa-plus"></i>
        <h2 id="h2">Welcome to PonyNote!</h2>
        <hr />
<div style={{textAlign: "right"}}>
          {this.props.user.username} (<a onClick={this.props.logout}>logout</a>)

       {AdminEl}
        </div>
        <h3>Notes of Redux</h3>

        <h3>Add new note ddd ok ok </h3>
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


          </tbody>
        </table>
      </div>

    )
  }
}



const mapStateToProps = state => {
  return {
    notes: state.notes,
    user: state.auth.user,
    isAuth:state.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchNotes: () => {
      dispatch(notes.fetchNotes());
    },
    addNote: (text) => {
      return dispatch(notes.addNotes(text));
    },
    updateNote: (id, text) => {
      return dispatch(notes.updateNotes(id, text));
    },
    deleteNote: (id) => {
      dispatch(notes.deleteNotes(id));
    },
    logout: () => dispatch(auth.logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PonyNote);