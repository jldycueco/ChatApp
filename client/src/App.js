import React from 'react';
import io from 'socket.io-client';

function App() {

  const socket = io();
  console.log(socket);

  return (
    <>  
      <h1>Chat App</h1>
    </>
  )
}

export default App;
