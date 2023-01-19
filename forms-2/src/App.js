import React, {useState} from 'react';
import Note from './components/Note';
import Form from './components/Form';
import './App.css';


const App = (props) => {
  // Initial state
  const[notes, setNotes] = useState(props.notes) // if starting with an empty list of notes "useState([])"
  // User submitted notes - state object
  const[userNote, setUserNote] = useState("")
  // Add functionality for showing "All" or "Important" notes - state object
  const[showAll, setShowAll] = useState(true);
  
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

  // Filter "notes" array
  const notesToShow = showAll ? notes : notes.filter(note =>
    note.important);
  // Event handler for toggling between "all" notes and "important" notes
  const handleClick = () => setShowAll(!showAll);
  
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick = {handleClick}>
          show{showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {
          notesToShow.map(note => 
          <Note key = {note.id} note = {note} />
          )}
      </ul>
      <Form handleSubmit = {addNote} 
      inputValue = {userNote}
      handleChange = {handleNoteChange} 
      />
    </div>
  )
}

export default App;
