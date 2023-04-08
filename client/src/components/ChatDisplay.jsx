import React,{useEffect,useState,useRef} from 'react'
import styled from 'styled-components'
import StyleChatDisplay from '../style/chatCompStyle/StyleChatDisplay'
import axios from 'axios'
import {v4 as uuidv4} from "uuid";
export default function ChatDisplay({contact,welcome,userThemeDark,currentUserId,msgDataStore}) {


  const bottomRef = useRef()
  const scrollBtn = useRef()
  const scrollDown = ()=>{
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
    const myDiv = bottomRef.current
    myDiv.scrollTop = myDiv.scrollHeight;
    }

//  useEffect(()=>{
// console.log(msgDataStore)
//  },[])
  

    useEffect(()=>{
      scrollDown()
    },[msgDataStore])

  return (
    <StyleChatDisplay  ref={bottomRef}> 

         {msgDataStore.map((msg)=>{
          return(

<div key={uuidv4()} className={`message ${msg.fromSelf? "sender":"reciver"}`}>
   <div className="content">{msg.message}</div>   
    </div>

          )
    
         

         })} 
          <div className="lastSpace"></div>
  </StyleChatDisplay>
 
  )
}
