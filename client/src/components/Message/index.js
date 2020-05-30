import React from 'react';
import { 
  MessageContainer, 
  SentText,
  MessageBox,
  MessageText 
} from './style';

const Message = ({ message, name }) => {
  let sentByUser = false;

  if (message.username === name) {
    sentByUser = true;
  }

  return ( 
    <>
      { sentByUser ? 
        (
          <MessageContainer primary>
            <SentText primary>
              {message.username}
            </SentText>
            <MessageBox primary>
              <MessageText primary>
                {message.msg}
              </MessageText>
            </MessageBox>
          </MessageContainer>
        ) 
        : 
        (
          <MessageContainer>
            <MessageBox>
              <MessageText>
                {message.msg}
              </MessageText>
            </MessageBox>
            <SentText>{message.username}</SentText>
          </MessageContainer>
        )
      }
    </>
  );
}
 
export default Message;