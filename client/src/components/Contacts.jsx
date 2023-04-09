import React, { useState } from 'react';
import {ThemeProvider} from 'styled-components';
import theme from '../style/theme';
import StyledContacts from '../style/StyledContacts';
import {RiRadioButtonLine} from 'react-icons/ri'

export default function Contacts({contact,getSelected,userThemeDark,showOnline}) {
  const [chatSelected,setChatSelected] = useState(undefined)

function  justMe(){
  getSelected(chatSelected)
}
justMe()



  return (
    <StyledContacts userThemeDark={userThemeDark} >
      <ThemeProvider theme={theme}> 
 { contact.map(
  (contact,index)=>{
    return(
      <div index={index} className={`contact-container ${chatSelected===index?"selected-chat":"" }`} onClick={()=>{
        setChatSelected(index)
      }} >
       { contact.myProfile ? <img src={contact.avatarImage} alt=""  />:<img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt=""  />}  
 
<div className="username"><h3>{contact.username}</h3></div>
   {showOnline.map((v)=>{
    return( 
      <>
      {  v.online&& v.userId===contact._id && <RiRadioButtonLine className='onlineIndicator' />}
      </>
      
     )
   })}
      </div>
     
    )
  }
 ) }

</ThemeProvider>
    </StyledContacts>
  )
}

