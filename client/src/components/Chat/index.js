import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  ChatContainer, 
  ChatHeader, 
  Spacer, 
  Spacer2, 
  ChatMain, 
  ChatSidebar, 
  ChatSidebarContent, 
  ChatMessages, 
  ChatFormContainer,
  ChatForm,
  ChatInput
} from './style';

let socket;

function Chat({history, location}) {
  const ENDPOINT = 'http://127.0.0.1:5000';
  const [users, setUsers] = useState('');
  const [messageList, setMessageList] = useState([]);
  let name;
  let room;

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: ({message}, {resetForm}) => {
      if (message) {
        socket.emit('sendMessage', message);
        resetForm();
      }
    },
  });

  if (location.state) {
    name = location.state.name;
    room = location.state.room;
  } else {
    history.push('/');
  }

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [name, room])

  useEffect(() => {
    socket.on('newMessage', (msg) => {
      setMessageList(messageList => [...messageList, msg])
    })

    socket.on("roomUsers", ({ users }) => {
      setUsers(users);
      console.log(users);
    });
  }, [])

  return (
    <>
      <ChatContainer>
        <ChatHeader>
          <FontAwesomeIcon icon="smile" size="lg"/>
          <Spacer />
          <h1>Chat App</h1>
          <Spacer2 />
          <Link to='/'>Leave Room</Link>
        </ChatHeader>
        <ChatMain>
          <ChatSidebar>
            <ChatSidebarContent>
              <FontAwesomeIcon icon = "comments" size="sm"/>
              <Spacer />
              Room Name: {room}
            </ChatSidebarContent>
            <ChatSidebarContent>
              <FontAwesomeIcon icon = "users" size ="sm"/>
              <Spacer />
              Users
            </ChatSidebarContent>
              <ul>
                {users.length > 0 && users.map((user, index) => (
                  <li key={index}>
                    {user.username}
                  </li>
                ))}
              </ul>
          </ChatSidebar>
          <ChatMessages>
            {messageList.length > 0 && messageList.map((message, index) => (
              <div key={index}>
                <p>{message.msg} - {message.username} {message.time}</p>
              </div>
            ))}
          </ChatMessages>
        </ChatMain>
        <ChatFormContainer>
          <ChatForm onSubmit={formik.handleSubmit}>
            <ChatInput
              name="message"
              {...formik.getFieldProps('message')}
            />
            <button type='submit'>
              <FontAwesomeIcon icon="paper-plane" />
              <Spacer />
              Send
            </button>
          </ChatForm>
        </ChatFormContainer>
      </ChatContainer>
    </>
  )
}

export default Chat;
