import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const ChatContainer = styled.div`
  max-width: 1100px;
	background: #fff;
	margin: 30px auto;
	overflow: hidden;
`
const ChatHeader = styled.header`
  background: #667aff;
  color: #fff;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Spacer = styled.div`
  padding: 0px 5px
`

const Spacer2 = styled.div`
  flex: 1;
`
const ChatMain = styled.main`
	display: grid;
  grid-template-columns: 1fr 3fr;
  @media (max-width: 700px) {
    display: block;
  }
`

const ChatSidebar = styled.div`
  background: #7386ff;
  color: #fff;
  padding: 20px 20px 60px;
  overflow-y: scroll;
  @media (max-width: 700px) {
    display: none;
  }
`

const ChatSidebarContent = styled.h3`
  display: flex;
`

const ChatMessages = styled.div`
	padding: 30px;
	height: 250px;
	overflow-y: scroll;
`

const ChatFormContainer = styled.div`
	padding: 20px 30px;
  background-color: #667aff;
`

const ChatForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`

const ChatInput = styled.input`
  font-size: 16px;
	padding: 5px;
	height: 40px;
  flex: 1;
  border-radius: 10px
`

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
