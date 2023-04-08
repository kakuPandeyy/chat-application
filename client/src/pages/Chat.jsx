import React, { useEffect,useState,useRef }  from 'react'
import { useNavigate } from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import {CiLogout} from 'react-icons/ci'
import { BiMenuAltRight } from 'react-icons/bi';
import logo from "../assets/logo.png";
import axios from 'axios';
import { getContactRouter,host } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import theme from '../style/theme';
import Swich from '../components/Swich';
import Conntainer from '../style/ChatStyle';
import Welcome from '../components/Welcome'; 
import ChatContainer from './ChatContainer';
import Search from '../components/Search';
import { io } from 'socket.io-client';
export const ReciveMsg = React.createContext() 
export default function Chat() {
  const navigate = useNavigate()
  const [userThemeDark,setuserThemeDark] = useState(false)

  const [contact,setContact] = useState([]);
  const [currentUserName,setCurrentUserName] = useState()
  const [currentUserImage,setCurrentUserImage] = useState()
  const [currentUserId,setCurrentUserId] = useState()
  const [myProfile,setMyProfile] = useState()
  const [welcome,setWelcome] = useState()
  const [searchInput,setSearchInput] = useState()
  const [searchFilter, setSearchFilter] = useState(undefined)
  const [ searchOn,setSearchOn ] = useState(false)
  const [arrivalMsg,setArrivalMsg] =useState()
  const [adjustMoblie, setAdjustMoblie] = useState(false)
  const [showOnline,setShowOnline] = useState([])
  const [renderOnline,setRenderOnline] = useState(false)
const socket = useRef()

async function logOut(){
  try {
  await localStorage.removeItem("chat-app-user")
  navigate("/login")
  } catch (error) {
    alert("try again")
  }
 

}


useEffect(()=>{
 
  setAdjustMoblie(true) 
  
},[welcome])

useEffect(()=>{

    if ( !localStorage.getItem("chat-app-user")) {
        navigate("/login")
       }else{
        setUserData()
        async function setUserData(){
try {
  const localData=  await JSON.parse(localStorage.getItem("chat-app-user")) 
  setCurrentUserName(localData.username)
  setCurrentUserId(localData._id)
  setCurrentUserImage(localData.avatarImage)
  setMyProfile(localData.myProfile)
  setRenderOnline(true)
  if (localData.avatarImage) {
    
       const data = await axios.get(  `${getContactRouter}/${localData._id}` )
       setContact(data.data.contacts)

       
         }else{
          navigate("/setAvatar")
         }
} catch (error) {

 
}
        }
       }
 
 
},[])

useEffect(()=>{
if(searchInput===""){
  setSearchOn(false)
}else{
  const result = contact.filter((per)=>{
    setSearchOn(true)
 return per.username.includes(searchInput)
 
 
  })
  setSearchFilter(result)
}
},[searchInput])


const getSelected = (data)=>{
setWelcome(data)


}

 useEffect(()=>{
if (currentUserId) {

   socket.current = io(host)
   socket.current.emit("addUser",currentUserId)
   if (socket) {
  
  socket.current.on("showOnline",(onlineData)=>{
     
    setShowOnline(onlineData)


  })

    socket.current.on("msgRecieve",(msgReciveData)=>{
      setArrivalMsg({ from: msgReciveData.from, fromSelf:false,message:msgReciveData.message})
      
    })
 
  }else{

  }
}
 },[currentUserId,renderOnline])

 

  return (
  <>
 
 <ThemeProvider theme={theme} adjustMoblie={adjustMoblie} >
 <Conntainer  userThemeDark= {userThemeDark} myProfile= {myProfile} currentUserImage={currentUserImage} >
 


  <div className="menu-column">

  <div className="profile"></div>
  <CiLogout className='logOut' onClick={logOut} />
<Swich setuserThemeDark={setuserThemeDark} />
  </div>

<div className="brand">
  <img src={logo} alt=""  />
  <h3>chatO</h3>
</div>
  <div className="box">
 <div className="contact" >
  <div className="tital-bar">
  <h2>chat</h2>
  <BiMenuAltRight className='threeDot'/>

  <Search setSearchInput={setSearchInput}/>
  </div>
<div className="contact-list">

 <Contacts contact ={searchOn? searchFilter:contact} welcome={welcome} searchFilter={searchFilter} getSelected={getSelected} userThemeDark={userThemeDark} searchInput={searchInput} showOnline={showOnline} currentUserId={currentUserId}/>
</div>

 </div>
<div className="chat">
<ReciveMsg.Provider value={ {arrivalMsg,welcome}}>
  {welcome===undefined?<Welcome currentUserName ={currentUserName}  />
  :
  <ChatContainer contact={contact} welcome={welcome} userThemeDark={userThemeDark} currentUserId={currentUserId} socket={socket.current} arrivalMsg={arrivalMsg} />  }
</ReciveMsg.Provider>

</div>

 </div>






 </Conntainer>

 </ThemeProvider>
  </>
  )
}






