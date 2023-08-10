import React,{useState , useEffect } from 'react';
import theme from '../style/theme';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import ReactPlayer from "react-player"
import peeer from '../servies/peeer';

export default function Call({socket}) {
 
  const [callDiaing,setCallDialing] = useState(false)
const [myStreme,setMyStreme] = useState(null)
const [remoteStreme,setRemoteStreme] = useState(null)
const [callingStatus,setCallingStatue] = useState("...")
const [callingData,setCallingData] = useState()
const [signalingStable, setSignalingStable] = useState(false)

  const navigation = useNavigate()
  
 async function handleAnswerAccpectedEmiter(data){

  

 try {
  
  
    
    
    await setSignalingStable(true)
    console.log("now signalingState is",signalingStable  );
    await peeer.setLocalDescription(data.answer)
    

 


 
  

 } catch (error) {
  console.log("ok 2");
  console.log( data.answer );
  console.log( "handleAnswerAccpectedEmiter", error);
 }
  
 }

  async function handleAnwer() {
    /*   answer:accpected:emiter */ 
    
    try {
      socket.current.on("answer:accpected:emiter",handleAnswerAccpectedEmiter)

      return ()=>{
socket.current.off("answer:accpected:emiter",handleAnswerAccpectedEmiter)
      }
    } catch (error) {
      console.log(error);
      console.log("radha2");
    }
    
    }


  // async  function handleCall  (){

  
  // try {
   
  //   const offer = await peer.createOffer()
    
  //   peer.setLocalDescription(offer)
  
   
  // } catch (error) {
  //   console.log(error);
  //   console.log("nhi hua")
  // }
  
  


  // }

const handleConnectionCheck = (data)=>{
  setCallingStatue(data.status)
      setCallingData(data)
      console.log("change");
}

async function statusCheck() {

 
  try {
    await socket.current.on("connection:check",handleConnectionCheck)

    return ()=>{
       socket.current.off("connection:check",handleConnectionCheck)

    }
    
  } catch (error) {
    console.log("stat check");
    navigation("/")
  }
  
}

  const socketToConnection = async()=>{
    try {
      if (socket) {
        statusCheck()
       
    }
    } catch (error) {
      console.log("socketToConnection");
      navigation("/")
    }
    
  }
  

  const sendStreme = async (streme)=>{

    const tracks = streme.getTracks()
  for(const track of tracks){
    peeer.peer.addTrack(track,streme)
   console.log(" i added the tracks");
  }

  }



    const getLocalMedia = async ()=>{
        const streme = await navigator.mediaDevices.getUserMedia({
           audio:true,
           video:true,
        })
        const offer = await peeer.getOffer()

        socket.current.emit("outgoing:call",{offer:offer,callingData:callingData})
        console.log("ok1");
        sendStreme(streme)
        setMyStreme(streme)
        console.log("only print one time radha ");
          handleAnwer()  
        
          }
           const handleNegotiotionneeded = async ()=>{
            try {
              console.log("ok2");
              const offer = await peeer.getOffer();
              console.log("negatiotion offer done");
              socket.current.emit("peer:nego:needed", { offer:offer});
              socket.current.on("nego:incoming:final",async(data)=>{
             await peeer.setLocalDescription(data.data.ans)
  console.log(peeer.peer);
              })
            } catch (error) {
              console.log("negatiotion offer not done", error);
            }
           
           }



           const handleTracks = async (ev)=>{
           alert(" i am working")
           console.log("handleTracksWorking", ev);
           }

          
           
//to: remoteSocketId
  useEffect(()=>{
    console.log( " only one");
    socketToConnection()
    getLocalMedia()

    peeer.peer.addEventListener("negotiationneeded", handleNegotiotionneeded);
    // peeer.peer.addEventListener("track",()=>{
    //   console.log("handle tracks");
    // })
    // peerConnection.ontrack = event => {
    //   const remoteStream = event.streams[0];
    //   // Display or process the remote audio and video streams (remoteStream)
    // };
    peeer.peer.ontrack = handleTracks
return ()=>{   

  peeer.peer.removeEventListener("negotiationneeded", handleNegotiotionneeded);
}
    

  },[])


 function handleRejectShow() {
  setCallingStatue("rejected")
 }

useEffect(()=>{
  statusCheck() 
socket.current.on("reject:show",handleRejectShow) 
return ()=>{
  socket.current.off("reject:show",handleRejectShow) 
}
},[])

  
             
        
 


  return (
    <CallStyle> 
    {callDiaing?  <div className='remotePerson'></div> : <div className="dialing">
    
     {callingStatus} 
  
    
    </div> 
   
    }

   
   
    <div className="localPerson">
    
    <ReactPlayer width="500px" height="300px" playing="false" url={myStreme} /></div>

     </CallStyle>
    
  )
}
const CallStyle = styled.div`

.localPerson{
 position: absolute;
bottom: 3rem;
right: 1rem;

}
.remotePerson{
    position: absolute;
    z-index: -1;
    top: 0px;
    height: 75%;
    width: 100%;
    background-color: red;
}
.dialing{

font-size: 5rem;
font-weight: bolder;
position: absolute;
    z-index: -1;
    top: 0px;
    height: 75%;
    width: 100%;
display: flex;
justify-content: center;
align-items: center;
background-color: ${theme.color.back4};
color: aliceblue;
}
`
