import React, {useState} from 'react';
import Note from './components/Note';
import './App.css';


const App = (props) => {
  // Initial state
  const[notes, setNotes] = useState(props.notes) // if starting with an empty list of notes "useState([])"
  // User submitted notes
  const[userNote, setUserNote] = useState("")

  // event handler for form submit
  const addNote = (event) => {
    event.preventDefault() // prevents default form submission
    const noteObject = {
      content: userNote,
      date: new Date().toISOString,
      important: Math.random() > 0.5,
      id: notes.length+1,
    }
    setNotes(notes.concat(noteObject)) // add userNote to notes array => returns new array
    setUserNote("") // reset input for new user note
  }

  // event handler for input change
  const handleNoteChange = (event) => {
    console.log (event.target.value) // to log input to console
    setUserNote(event.target.value)

  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {
          notes.map(note => 
          <Note key = {note.id} note = {note} />
          )}
      </ul>
      <form onSubmit = {addNote}>
        <input
          value = {userNote}
          onChange = {handleNoteChange}
         />
        <button type = "submit">save</button>
      </form>
    </div>
  )
}

export default App;
