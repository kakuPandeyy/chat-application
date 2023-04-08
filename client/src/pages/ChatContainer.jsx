import React, { useState,useEffect,useContext } from 'react'
import styled from 'styled-components'
import ChatHeader from '../components/ChatHeader'
import MsgInput from '../components/MsgInput'
import ChatDisplay from '../components/ChatDisplay'


export default function ChatContainer({contact,welcome,userThemeDark,currentUserId,socket,arrivalMsg,showOnline}) {
 
const [msgDataStore,setmsgDataStore] = useState([])

 function  msgAndStore ( data){
  setmsgDataStore(data)
}


  return (
    <>
    <ChatHeader contact={contact} welcome={welcome} userThemeDark={userThemeDark}/>

<ChatDisplay userThemeDark={userThemeDark} contact={contact}  welcome={welcome} currentUserId={currentUserId} msgDataStore={msgDataStore} socket={socket} />

<MsgInput userThemeDark={userThemeDark} contact={contact}  welcome={welcome} currentUserId={currentUserId} msgAndStore={msgAndStore} socket={socket}  />

    </>

  )
}
