
import React, {useEffect, useState} from 'react';
import Note from './components/Note';
import Form from './components/Form';
import './App.css';
import noteService from './services/notes';
// import axios from 'axios';


const App = () => {
  // Initial state
  const[notes, setNotes] = useState([]) // if starting with an empty list of notes "useState([])"
  // User submitted notes - state object
  const[userNote, setUserNote] = useState("")
  // Add functionality for showing "All" or "Important" notes - state object
  const[showAll, setShowAll] = useState(true);

    // useEffect hook for fetching data from server
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
      .catch(error => {return error})
  }, [])
  
// event handler for form submit
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: userNote,
      important: Math.random() > 0.5
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setUserNote('')
      })
      .catch(error => {return error})
  }  

  // event handler for input change
  const handleNoteChange = (event) => {
    // console.log (event.target.value) // to log input to console
    setUserNote(event.target.value)
  }

  // Filter "notes" array by "important"
  const notesToShow = showAll ? notes : notes.filter(note =>
    note.important);
  // Event handler for toggling between "all" notes and "important" notes
  const handleClick = () => setShowAll(!showAll);

  // Event handler for toggling each note's importance
  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {return error})
  }

  // Event Handler for deleting note
  const deleteComment = id => {
    alert("the note will be permanently deleted!")
    noteService
      .remove(id)
      .then(setNotes(notes.filter(note => note.id !== id ))
      )
  }
  
  return (
    <div>
      <h1>Notebook</h1>
      <div>
        <button onClick = {handleClick}>
          show{showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {
          notesToShow.map(note => 
          <Note 
            key = {note.id} 
            note = {note} 
            toggleImportance = {() => toggleImportanceOf(note.id)} 
            deleteComment =  {() => deleteComment(note.id)}
            />
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
