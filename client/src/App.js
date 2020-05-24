import React from 'react';
import io from 'socket.io-client';

function App() {

  const socket = io('http://127.0.0.1:5000');
  console.log(socket);

  return (
    <>  
      <h1>Chat App</h1>
    </>
  )
}

export default App;
