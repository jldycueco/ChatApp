import React, { useState, useEffect, useRef } from 'react';
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
import Message from '../Message/index';

let socket;

function Chat({history, location}) {
  const ENDPOINT = 'chatapp-jdd.herokuapp.com';
  const [users, setUsers] = useState('');
  const [messageList, setMessageList] = useState([]);
  const messagesEndRef = useRef(null);

  let name;
  let room;

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

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
      scrollToBottom()
    })

    socket.on("roomUsers", ({ users }) => {
      setUsers(users);
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
          <Link to='/'>
            <button>Leave Room</button>
          </Link>
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
              <Message message = {message} name = {name} key ={index} />
            ))}
            <div ref={messagesEndRef} />
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
