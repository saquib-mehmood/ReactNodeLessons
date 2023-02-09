import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


const NoteCard = (props) => {
   return (
     <Card style={{ maxWidth: '12rem', height: 'auto', margin: 5 }}>
      {/* <Card.Img variant="top" 
        src="./logo192.png" 
      /> */}
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