# API Calls with React and Axios

## Instructions

git clone <this repo>
install node, npm
npm install axios
npm install json-server --save-dev
In root directory(apicalls) create new file "db.json" and add following:
{
"notes": [
{
"id": 1,
"content": "HTML is easy",
"important": true
},
{
"id": 2,
"content": "Browser can execute only JavaScript",
"important": false
},
{
"id": 3,
"content": "GET and POST are the most important methods of HTTP protocol",
"important": true
}
]
}

Modify package.json => scripts => "server": "json-server -p3001 -watch db.json"
React version 16.8+
npm run server
npm start (use another terminal)

### Code Explanation

Step-1: Check server functionality
Paste following code in index.js file

const promise = axios.get('http://localhost:3001/notes');
promise.then(response => {
console.log(response)
})

Check that the console displays the response properly

Step-2 Check application functionality
Paste following code in the index.js file (remove all else)

import ReactDOM from 'react-dom/client'
import axios from 'axios'
import App from './App'

axios.get('http://localhost:3001/notes').then(response => {
const notes = response.data
ReactDOM.createRoot(document.getElementById('root')).render(<App notes={notes} />)
})

Step-3 Optimize the app by moving axios.get method to the App component and using "useEffect" hook

"The Effect Hook lets you perform side effects on function components. Data fetching, setting up a subscription, and manually changing the DOM in React components are all examples of side effects. As such, effect hooks are precisely the right tool to use when fetching data from a server."

a. Remove axios.get method from index.js, which should look as follows:

import axios from 'axios';
import './index.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(<App />)

b. App component changes to following:

import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = () => {
const [notes, setNotes] = useState([])
const [newNote, setNewNote] = useState('')
const [showAll, setShowAll] = useState(true)

useEffect(() => {
console.log('effect')
axios
.get('http://localhost:3001/notes')
.then(response => {
console.log('promise fulfilled')
setNotes(response.data)
})
}, [])
console.log('render', notes.length, 'notes')

// ...
}

c. console.log statements print following which helps understanding the sequence of events:

render 0 notes
effect
promise fulfilled
render 3 notes

First, the body of the function defining the component is executed and the component is rendered for the first time. At this point render 0 notes is printed, meaning data hasn't been fetched from the server yet.

Second, the useEffect hook is executed after the component is rendered. The execution of the function results in effect being printed to the console, and the command axios.get initiates the fetching of data from the server as well as registers the following function as an event handler for the operation:

response => {
console.log('promise fulfilled')
setNotes(response.data)
})

Third, When data arrives from the server, the JavaScript runtime calls the function registered as the event handler, which prints promise fulfilled to the console and stores the notes received from the server into the state using the function setNotes(response.data).

Finally, a call to the state-updating function triggers the re-rendering of the component. As a result, render 3 notes is printed to the console, and the notes fetched from the server are rendered to the screen.

d. Make useEffect hook more compactly as follows:

const hook = () => {
console.log('effect')
axios
.get('http://localhost:3001/notes')
.then(response => {
console.log('promise fulfilled')
setNotes(response.data)
})
}

useEffect(hook, [])

we can see more clearly that the function useEffect takes two parameters. The first is a function, the effect itself. According to the documentation:

By default, effects run after every completed render, but you can choose to fire it only when certain values have changed.

So by default, the effect is always run after the component has been rendered. In our case, however, we only want to execute the effect along with the first render.

The second parameter of useEffect is used to specify how often the effect is run. If the second parameter is an empty array [], then the effect is only run along with the first render of the component.

Step-4 Add user notes to the json database by sending axios POST request
Modify the event handler "addNote" to include POST request as follows:

addNote = event => {
event.preventDefault()
const noteObject = {
content: newNote,
important: Math.random() > 0.5,
}

axios
.post('http://localhost:3001/notes', noteObject)
.then(response => {
setNotes(notes.concat(response.data))
setNewNote('')
})
}

Omit the id property since it's better to let the server generate ids for our resources!

Step-5 Add a button to each note for toggling its "importance"

Add a button to Note component as follows:

const Note = (props) => {
const label = props.note.important ? "make not important"
: "make important"
return (

<li>
{props.note.content}
<button onClick = {props.toggleImportance}>
{label}
</button>
</li>
)
}

The App Component will add an event handler for toggling each note's importance.

Individual notes stored in the json-server backend can be modified in two different ways by making HTTP requests to the note's unique URL. We can either replace the entire note with an HTTP PUT request or only change some of the note's properties with an HTTP PATCH request.

const toggleImportanceOf = id => {
const url = `http://localhost:3001/notes/${id}`
const note = notes.find(n => n.id === id)
const changedNote = { ...note, important: !note.important }

axios.put(url, changedNote).then(response => {
setNotes(notes.map(n => n.id !== id ? n : response.data))
})
}

Above, the first line defines the unique URL for each note resource based on its id. Template literals provide an easy way to interpolate variables and expressions into strings.The "dollar-bracket"-syntax is used to add parts to the string that will evaluate JavaScript expressions, e.g. the value of a variable. Template Literals use back-ticks (``) rather than the quotes ("") to define a string. With template literals, you can use both single and double quotes inside a string

The array find method is used to find the note we want to modify, and we then assign it to the note variable.

After this, we create a new object that is an exact copy of the old note, apart from the important property that has the value flipped (from true to false or from false to true). { ...note } creates a new object with copies of all the properties from the note object. When we add properties inside the curly braces after the spread object, e.g. { ...note, important: true }, then the value of the important property of the new object will be true. In our example, the important property gets the negation of its previous value in the original object. We make a copy of the note object "changedNote" because the variable "note" is a reference to an item in the "notes" array in the component's state, and we must never mutate state directly in React.

The new note is then sent with a PUT request to the backend where it will replace the old object.

The callback function sets the component's notes state to a new array that contains all the items from the previous notes array, except for the old note which is replaced by the updated version of it returned by the server.

And the Note component rendered inside the App component will change as under:

<Note
key = {note.id}
note = {note}
toggleImportance = {() => toggleImportanceOf (note.id)}  
/>

Step-6 Extracting Communication with the Backend into a Separate Module

We need to create a separate module for communicating with the backend as currently it is bunched together inside the <App /> module, in order to keep our code clean and manageable.

First we create a src/services directory and add a file there called notes.js in which we create 3 separate functions for communicating with the backend as under:

import axios from 'axios';
const baseUrl = `http://localhost:3001/notes`;

const getAll = () => {
const request = axios.get(baseUrl)
return request.then(response => response.data)
}

const create = newObject => {
const request = axios.post(baseUrl, newObject)
return request.then(response => response.data)
}

const update = (id, newObject) => {
const request = axios.put(`${baseUrl}/${id}`, newObject)
return request.then(response => response.data)
}

const noteService = {
getAll: getAll,
create: create,
update: update
}

export default noteService;

The module returns an object that has three functions (getAll, create, and update) as its properties that deal with notes. The functions directly return the promises returned by the axios methods.

The <App /> component uses import to get access to the module and we also have to update the App component to work with the changes made to our module.:

import noteService from './services/notes'
const App = () => {
// ...

useEffect(() => {
noteService
.getAll()
.then(initialNotes => {
setNotes(initialNotes)
})
}, [])

const toggleImportanceOf = id => {
const note = notes.find(n => n.id === id)
const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })

}

const addNote = (event) => {
event.preventDefault()
const noteObject = {
content: newNote,
important: Math.random() > 0.5
}

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })

}

// ...
}

Step-7 Error Handling

The rejection of a promise is handled by providing the then method with a second callback function, which is called in the situation where the promise is rejected.

The more common way of adding a handler for rejected promises is to use the catch method.

When our application makes an HTTP request, we are in fact creating a promise chain. The catch method can be used to define a handler function at the end of a promise chain, which is called once any promise in the chain throws an error and the promise becomes rejected.

But first, we will add a delete button and make it functional.

Add another button to <Note /> component as under:

import React from 'react';
import '../App.css';

const Note = (props) => {
const label = props.note.important ? "make not important"
: "make important"
const deleted = "Delete Note"
return (

<li>
{props.note.content}
<button onClick = {props.toggleImportance}>
{label}
</button>
<button onClick = {props.deleteComment}>
{deleted}
</button>
</li>
)
}

export default Note;

Add an event handler in the <App /> component:

// Event Handler for deleting note
const deleteComment = id => {
alert("the note will be permanently deleted!")
noteService
.remove(id)
.then(setNotes(notes.filter(note => note.id !== id ))
)
}

Update <ul> element in <App /> component:

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

Add following to all the functions making API calls

.catch(error => {return error})

run the application and then
Switch off the json server and try to add notes
open the console of the browser to check error message

"xhr.js:247 POST http://localhost:3001/notes net::ERR_CONNECTION_REFUSED"

Reconnect the json server, and refresh the app, and try to POST new notes. Check on console, the error message will have disappeared. 







# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
