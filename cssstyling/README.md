# CSS Styling in React with Bootstrap, stylesheet and inline styles

## Instructions

git clone <this repo>
install node, npm
npm install axios
npm install json-server --save-
npm install react-bootstrap bootstrap
In root directory(cssstyling) create new file "db.json" and add following:
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

After importing react-bootstrap and bootstrap, paste the following link to the bootstrap stylesheet in index.html head:

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
      integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous" />
 
 Then, create new components or modify the existing components as the case may be as follows:

### App.js

import React, {useEffect, useState} from 'react';
import Note from './components/Note';
import Form from './components/Form';
import NavBar from './components/Navbar';
import NoteCard from './components/NoteCard';
import Footer from './components/Footer';
import noteService from './services/notes';
import './App.css';

const App = () => {
........

.............
return (

<div>
<div>
<NavBar />
</div>
<div>
<NoteCard 
          toggleShow = {handleClick}
          showAll = {showAll}
        />
</div>
<ul>
{
notesToShow.map(note =>
<Note
key = {note.id}
note = {note}
toggleImportance = {() => toggleImportanceOf(note.id)}
deleteComment = {() => deleteComment(note.id)}
/>
)}
</ul>
<Form handleSubmit = {addNote} 
      inputValue = {userNote}
      handleChange = {handleNoteChange} 
      />
<div>
<Footer />
</div>
</div>
)
}

### Navbar.js

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavBar = () => {
return (
<Navbar style = {{backgroundColor: "#F0F0F0"}} expand="lg">
<Container>
<Navbar.Brand style = {{paddingLeft:0}} href="#home">
<img
              alt=""
              src="./logo192.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
React-Notebook
</Navbar.Brand>
<Navbar.Toggle aria-controls="basic-navbar-nav" />
<Navbar.Collapse id="basic-navbar-nav">

<Nav className="me-auto">
<Nav.Link href="#home">Home</Nav.Link>
<Nav.Link href="#link">Link</Nav.Link>
<NavDropdown title="Dropdown" id="basic-nav-dropdown">
<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
<NavDropdown.Item href="#action/3.2">
Another action
</NavDropdown.Item>
<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
<NavDropdown.Divider />
<NavDropdown.Item href="#action/3.4">
Separated link
</NavDropdown.Item>
</NavDropdown>
</Nav>
</Navbar.Collapse>
</Container>
</Navbar>
);
}

export default NavBar;

### Note.js

import React from 'react';
import Button from "react-bootstrap/Button";

const Note = (props) => {
const label = props.note.important ? "make not important"
: "make important"
const deleted = "Delete Note"
return (

<li>
{props.note.content}
<Button variant = "primary" style = {{margin: 10}}
onClick = {props.toggleImportance}>
{label}
</Button>
<Button variant = "danger" style = {{margin: 10}}
onClick = {props.deleteComment}>
{deleted}
</Button>
</li>
)
}

export default Note;

### NoteCard.js

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const NoteCard = (props) => {
return (
<Card style={{ maxWidth: '12rem', height: 'auto', margin: 5 }}>
{/_ <Card.Img variant="top"
src="./logo192.png"
/> _/}
<Card.Body>
<Card.Title>Notes</Card.Title>
<Card.Text>
Some important notes to demonstrate the use of CSS and react-bootstrap
</Card.Text>
<Button variant = "info" 
            onClick = {props.toggleShow}>
show{props.showAll ? "important" : "all"}
</Button>
</Card.Body>
</Card>
);
}

export default NoteCard

### Footer.js

import React from 'react';

const Footer = () => {
const footerStyle = {
backgroundColor: '#EFF3F4',
color: 'black',
fontStyle: 'italic',
fontSize: 16,
maxWidth: '100%',
border: '2px solid grey',
margin: 5
}
return (

<div style={footerStyle}>
<br />
<em>React Notebook Application, Saquib Mehmood (C) 2023</em>
</div>
)
}

export default Footer

### App.css

body {
background-color: #f3f3f34b;
color: #131212;
padding: 40px;
font-family: Sans-Serif;
text-align: justify;
}

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
