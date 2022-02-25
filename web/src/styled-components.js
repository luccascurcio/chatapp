import styled from 'styled-components'

export const ChannelsSelection = styled.select`
    width: 20%;
    background-color: #e3e3e3;
    border-radius: 3px;
    margin: 5px 5px;
    padding: 10px;
    position: relative;
    display: inline-block;
    height: auto;
    max-height: 90%;
    flex-direction: column;
`
export const ChatMessageContainer = styled.div`
    border: 2px solid #dedede;
    background-color: #f1f1f1;
    border-radius: 5px;
    padding: 10px;
    margin: 10px 0;
`

export const MessengerContainer = styled.div`
    position: absolute;
    bottom: 0px;
    width: 100%;
    padding: 18px;
    background-color: #e3e3e3;
`

export const MessengerInputMessage = styled.textarea`
    height: 80px;
    width: 50%;
    background-color: white;
    border: 1px solid white;
    padding: 0px 18px;
    outline: none;
    font-size: 15px;
    resize: none;
`

export const ChatContainer = styled.div`
    align-items: center;
    height: 100%;
    width: 100%;
    overflow-wrap: break-word;
`

export const NameLabel = styled.label`
    color: #0079bf;
    font-family: Arial, Helvetica, sans-serif;
`

export const MessageLabel = styled.label`
    color: black;
    align-content: center;
    font-family: Arial, Helvetica, sans-serif;
`

export const MessageSpan = styled.span`
    color: black;
`

export const SendButton = styled.button`
    height: 42px;
    /* background-color: #74992e; */
    border: 1px solid white;
    padding: 0px 18px;
    cursor: pointer;
    margin-left: 10px;
    background: rgb(0, 196, 65);
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.23s;
    :hover {
        background: rgb(0, 180, 50);
    }
`