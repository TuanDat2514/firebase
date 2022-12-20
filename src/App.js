import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import {Button, Row, Col, Toast} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {getMessagingToken, onMessageListener} from "./firebase";

function App() {
    const [show, setShow] = useState(false);
    const [notification, setNotification] = useState('');
    const [isTokenFound, setTokenFound] = useState(true);

    useEffect(() => {
        getMessagingToken();
        const channel = new BroadcastChannel("notifications");
        console.log("chinh no", channel);
        channel.addEventListener("message", (event) => {
            console.log("Receive background: ", event.data);
            setNotification(event.data.notification);
        });
    },[])
    useEffect(() => {
        onMessageListener().then(data => {
            console.log("Receive foreground: ",data);
            setNotification(data.notification);
        })
    })
    const submit = () =>{
        onMessageListener().then(data => {
            console.log("Receive foreground: ",data)
        })
        const channel = new BroadcastChannel("notifications");
        console.log("chinh no", channel);
        channel.addEventListener("message", (event) => {
            console.log("Receive background: ", event.data);
        });
    };
    return (
        <div className="App">
            <Toast onClose={() => setShow(true)} show={true} delay={3000} autohide animation style={{
                position: 'absolute',
                top: 20,
                right: 20,
            }}>
                <Toast.Header>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded mr-2"
                        alt=""
                    />
                    <strong className="mr-auto">{notification.title}</strong>
                    <small>just now</small>
                </Toast.Header>
                <Toast.Body>{notification.body}</Toast.Body>
            </Toast>
            <header className="App-header">
                {isTokenFound &&
                    <p>Notification permission enabled 👍🏻</p>
                }
                {!isTokenFound &&
                    <p>Need notification permission</p>
                }
                <img src={logo} className="App-logo" alt="logo"/>
                <Button onClick={() => {setShow(true);submit();}}>Show Toast</Button>
            </header>
        </div>
    )
}
export default App;