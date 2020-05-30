import styled from 'styled-components';

export const MessageContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 5%;
  margin-top: 3px;
  justify-content: ${props => props.primary ? "flex-end" : "flex-start"};
`;

export const SentText = styled.p`
  display: flex;
  align-items: center;
  font-family: Helvetica;
  color: #828282;
  letter-spacing: 0.3px;
  padding: ${props => props.primary ? '0 10px 0 0' : '0 0 0 10px'};
`

export const MessageBox = styled.div`
  background: ${props => props.primary ? "#2979FF" : "#F3F3F3"};
  border-radius: 20px;
  padding: 5px 20px;
  color: white;
  display: inline-block;
  max-width: 80%;
`
export const MessageText = styled.p `
  width: 100%;
  letter-spacing: 0;
  float: left;
  font-size: 1.1em;
  word-wrap: break-word;
  color: ${props => props.primary ? "white" : "#353535"}
`
