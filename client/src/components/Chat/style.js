import styled from 'styled-components';

export const ChatContainer = styled.div`
  max-width: 1100px;
	background: #fff;
	margin: 30px auto;
	overflow: hidden;
`
export const ChatHeader = styled.header`
  background: #667aff;
  color: #fff;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Spacer = styled.div`
  padding: 0px 5px
`

export const Spacer2 = styled.div`
  flex: 1;
`
export const ChatMain = styled.main`
	display: grid;
  grid-template-columns: 1fr 3fr;
  @media (max-width: 700px) {
    display: block;
  }
`

export const ChatSidebar = styled.div`
  background: #7386ff;
  color: #fff;
  padding: 20px 20px 60px;
  overflow-y: scroll;
  @media (max-width: 700px) {
    display: none;
  }
`

export const ChatSidebarContent = styled.h3`
  display: flex;
`

export const ChatMessages = styled.div`
	padding: 30px;
	height: 250px;
	overflow-y: scroll;
`

export const ChatFormContainer = styled.div`
	padding: 20px 30px;
  background-color: #667aff;
`

export const ChatForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ChatInput = styled.input`
  font-size: 16px;
	padding: 5px;
	height: 40px;
  flex: 1;
  border-radius: 10px
`