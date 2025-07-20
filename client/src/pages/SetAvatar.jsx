
 import React ,{ useEffect, useState } from 'react'
import axios  from 'axios';
import {useNavigate } from "react-router-dom";

import { Buffer } from 'buffer';
import loader from "../assets/loader.gif";
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { setAvatarRouter } from '../utils/APIRoutes';

import Button from '../style/Button';
import Profile from '../components/Profile';
import AvatarStyle from '../style/AvatarStyle';
import { host } from '../utils/APIRoutes';


export default function SetAvatar() {

  

//  const avatarApi = "https://api.multiavatar.com/";
//  
const [avatar,setAvatar] = useState([]);
const [loading,setLoading] = useState(false);
const [selectedAvatar,setSelectedAvatar] = useState(undefined);
const [file,setFile] = useState();
const [customPic,setCustomPic] = useState(false);
const [image, setImage] = useState()
const [urlImg, setUrlImg] = useState()

  const navigate = useNavigate();




  async function handleProFile(e){
    try {
    
    await setFile(e.target.files[0])
    setImage(URL.createObjectURL(e.target.files[0]));
   



    } catch (error) {
    
    }
  }



  const toastOptions = {
  position: "bottom-right",
  autoClose:5000,
  pauseOnHover: true,
  theme:"dark",
  draggable:true,

  }


  async  function setProfilePic() {


     const { data: sigData } = await axios.post(`${host}/get-signature`);
       const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', sigData.apiKey);
    formData.append('signature', sigData.signature);
    formData.append('timestamp', sigData.timestamp);
 
     const cloudinaryURL = `https://api.cloudinary.com/v1_1/${sigData.cloudName}/auto/upload`;
     
       const uploadRes = await axios.post(cloudinaryURL, formData);
    const url = uploadRes.data.secure_url;


    if (selectedAvatar===undefined) {
      toast.error("please select your profile avatar",toastOptions)
    }
    else if(selectedAvatar==="customPic"){


 const user = await JSON.parse(localStorage.getItem("chat-app-user"))
 
 const {data} =  await axios.post(setAvatarRouter, {
  id:user._id,
  image:url ,
  setStatus:user.isAvatarImageSet,
  custom:true
 } )


 
 
 if (data.setStatus ) {
   
   data.userData.avatarImage = url
  
   await localStorage.setItem("chat-app-user",JSON.stringify(data.userData))
  await navigate("/")

   }else{
    
   }

    }
    
 
  }

  

useEffect(()=>{
 
  


  
try{
  if (!localStorage.getItem("chat-app-user")) {
    navigate("/login")
  }

 
}catch(ex){
 console.log(ex);
 
}
   
  
},[])




  return (
    <>
 {loading? <AvatarStyle>
<img src={loader} alt="loading" />
 </AvatarStyle> :
 ( <AvatarStyle >
 
  <div className="container">
 <div className='titleContainer'>
 <h1> pick up your avatar</h1>
 
 </div>
<div className="avatars">




<Profile customPic={customPic} 
setCustomPic ={setCustomPic} 
setSelectedAvatar={setSelectedAvatar}
 image={image}
  handleProFile= {handleProFile}/>

</div>

<Button onClick={setProfilePic} className='selectAvatar' > select your avatar </Button>
 </div>

 </AvatarStyle>)
 }
<ToastContainer/>
  

    </>

  )
}



