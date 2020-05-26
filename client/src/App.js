import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

function App() {
  // const [state, setState] = useState({
  //   message: '',
  //   messageList: []
  // })
  const socket = io('http://127.0.0.1:5000');

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([ ...messages, message ]);
    });
  }, [socket, messages]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  }

  const handleSubmit = (e) => { 
    e.preventDefault();
    if (message) {
      socket.emit('sendMessage', message)
      setMessage('');
    }
  }

  return (
    <>  
      <h1>Chat App</h1>
      <ul id="messages">
        {messages.map((message, index) => (
          <li key={index}>
            {message}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
      <input
        className="input"
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={handleChange}
      />
        <button>Send</button>
      </form>
    </>
  )
}

export default App;
