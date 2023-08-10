import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import ReactPlayer from 'react-player'
import theme from '../style/theme'
import peeer from '../servies/peeer'

export default function CallAnswer({socket}) {


  const [callDiaing,setCallDialing] = useState(false)
const [myStreme,setMyStreme] = useState(null)
const [remoteStreme,setRemoteStreme] = useState(null)
const [callingStatus,setCallingStatue] = useState("...")
const [callingData,setCallingData] = useState()




const sendStreme = async (streme)=>{

  const tracks = await streme.getTracks()
for(const track of tracks){
   peeer.peer.addTrack(track,streme)

}

}



        const getLocalMedia = async ()=>{
          try {
        
            const streme = await navigator.mediaDevices.getUserMedia({
              audio:true,
              video:true,
           })
           sendStreme(streme)
           setMyStreme(streme)
           
          } catch (error) {
            console.log(error);
          }
           
              }


              const handleTracks = async (ev)=>{
               console.log("also working");
               const remoteStream = await ev.streams
              await setRemoteStreme(remoteStream[0])
           console.log("handleTracks", ev);
            console.log(peeer.peer);
    
                }    
   const socketWork = async()=>{
    try {
      socket.current.on("peer:incoming:nego",async(data)=>{
      console.log(data.data.offer);
      const ans = await peeer.getAnswer(data.data.offer)
      socket.current.emit("nego:incoming:accepted",{ans:ans,to:data.daillerSocketId})
      })
    } catch (error) {
      console.log("answer nego err" ,error);
    }
   }          
                              
 useEffect(()=>{

  getLocalMedia() 
  socketWork()
peeer.peer.ontrack = handleTracks
return ()=>{  
  peeer.peer.removeEventListener("track",handleTracks)

}


},[])
          

    
  return (
    <CallStyle> 
    {callDiaing?  <div className='remotePerson'>
  <div class="radha">

  </div>
 

    </div> : <div className="dialing">
    { remoteStreme  ?     <ReactPlayer width="500px" height="300px" playing="false" url={remoteStreme} />:<h1>sorry not ava</h1> }
  
    
    
    </div> 
   
    }

   
   
    <div className="localPerson">
 
    {myStreme?<ReactPlayer width="500px" height="300px" playing="false" url={myStreme} />:<h1>sorry not avalaable</h1>}</div>

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
    z-index: -9;
    top: 0px;
    height: 75%;
    width: 100%;
    background-color: red;
}
.radha{
  z-index: 9;
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