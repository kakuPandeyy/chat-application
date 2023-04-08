import React,{useEffect,useRef} from 'react'

import StyleChatDisplay from '../style/chatCompStyle/StyleChatDisplay'

import {v4 as uuidv4} from "uuid";
export default function ChatDisplay({msgDataStore}) {


  const bottomRef = useRef()
 
  const scrollDown = ()=>{
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
    const myDiv = bottomRef.current
    myDiv.scrollTop = myDiv.scrollHeight;
    }
  

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
