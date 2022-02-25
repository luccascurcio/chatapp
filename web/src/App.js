import React, {useState, useEffect} from 'react';
import ioclient from 'socket.io-client';
import './App.css';

import {  ChannelsSelection,
          MessengerContainer,
          ChatContainer,
          NameLabel,
          MessageSpan,
          MessageLabel,
          MessengerInputMessage,
          SendButton,
          ChatMessageContainer }
from './styled-components'

const socket = ioclient.connect('http://localhost:3333')

function App() {

  const [channels, setChannels] = useState([]) //state for the list of channels available
  const [chatChannel, setChatChannel] = useState('1'); //state for selected channel. default channel is CHANNEL 1
  const [chatName, setChatName] = useState(''); //state for the current name
  const [chatMessage, setChatMessage] = useState(''); //state for the current message
  const [chat, setChat] = useState([]); //state for the chat log

  useEffect(() => {
    //FETCH CHANNELS AVAILABLE
    async function getChannels() {
      const getChannels = await fetch( 'http://localhost:3333/channel', {method: 'GET'} )
      const channelsJson = await getChannels.json()
      setChannels(channelsJson)
      return;
    }
    getChannels();
    
    //FETCH HISTORY OF CHAT
    async function getChatHistory() {
      const chatHistory = await fetch( `http://localhost:3333/chat/${chatChannel}`, {method: 'GET'} )
      const historyJson = await chatHistory.json()
      setChat(historyJson)
      return;
    }
    getChatHistory();
    
    // UPDATE CHAT LOG WITH LIVE CHAT (socket)
    socket.on('message', ({ channel, name, message }) => {
      setChat([...chat, { channel, name, message }])
    })
  },[chat, chatChannel])

  //FUNCTION - change Channel Selection
  const changeChannel = (e) => {
    setChatName('');
    setChatMessage('');
    setChat([]);
    setChatChannel(e.target.value);
  }
  
  //FUNCTION - Send message action
  const onSubmit = async e => {
    e.preventDefault();
    
    socket.emit('message', { chatChannel, chatName, chatMessage })

    const savedChat = await fetch(
      'http://localhost:3333/chat', {
        method: 'POST',
        body: JSON.stringify({ channel: chatChannel, name: chatName, message: chatMessage }),
        headers: {'Content-Type': 'application/json'}
      }
    )
    setChatMessage('');
    setChat([...chat, { channel: savedChat.channel, name: savedChat.name, message: savedChat.message}])
  }

  return (
    <div className="App">
      <div>
        <ChannelsSelection id="channels" onChange={(e) => changeChannel(e)}>
        {channels.map(( record, index) => { 
            return (<option key={index} value={record.id}>{record.name}</option>)
          })}
        </ChannelsSelection>
      </div>
      <ChatContainer>
        <h1>Chat</h1>
        {chat.length > 0 ? (
          chat.map(( record, index) => { 
            return (<ChatMessageContainer key={index}><NameLabel>{record.name}: <MessageSpan>{record.message}</MessageSpan></NameLabel></ChatMessageContainer>)
          })) : (
            <label>No History of messages in this Channel</label>
          )
        }
      </ChatContainer>
      <form onSubmit={onSubmit}>
        <MessengerContainer>
          <div>
            <MessageLabel>Name: </MessageLabel>
          </div>
          <div>
            <input name="name" onChange={(e) => setChatName(e.target.value)} value={chatName} label="Name" />
          </div>
          <br />
          <div>
            <MessageLabel>Message: </MessageLabel>
          </div>
          <div>
            <MessengerInputMessage name="message" onChange={(e) => setChatMessage(e.target.value)} value={chatMessage} label="Message" />
          </div>
          <SendButton>Send</SendButton>
        </MessengerContainer>
      </form>

    </div>
  );
}

export default App;
