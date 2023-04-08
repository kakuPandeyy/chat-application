import theme from "./theme";
import styled from "styled-components";
//userthemdark
//myProfile
//currentuser
const Conntainer = styled.div`
background-color: ${props => props.userThemeDark? theme.color.back7 :theme.color.blue1 };
height: 100vh;
width: 100vw; 
position: relative;


.menu-column{
width: 7vw;
height: 100vh;
position: absolute;
left: 0px;
display: flex;
align-items: center;
flex-direction: column;
justify-content: center;

z-index: 10px;
.logOut{
  cursor: pointer;
  font-size: 2em;
  color: #57C5B6;
}
.profile{
height: 75px;
width: 75px;
border: 2px double ${props => props.userThemeDark? theme.color.back1: theme.color.pattern.themeGreen};
position: fixed;
top: 16vh;
border-radius: 50%;
background-image: url(${ props=> props.myProfile? props.currentUserImage :`data:image/svg+xml;base64,${props.currentUserImage}`});
background-position: center;
background-size: cover;
@media only screen and (max-width: 500px) {
    display: none;
  
}
@media (min-width: 501px) and (max-width: 800px) {

}
}

}

.brand{
  position: absolute;
  width: 100vw;
  height: 4vh;
  top: 0px;
  @media only screen and (max-width: 500px) {
    display: none;

}
  background-color: ${(props)=>props.userThemeDark? theme.color.back7 :theme.color.blue2 };
  z-index: 7;
  display: flex;
  flex-direction: row;
  img{
    height: 2.5rem;
  }
 h3{
margin-top: 5px;
color: white;
 }
}
  .box{
height: 97vh;
width: 92.5vw;
position: absolute;
  bottom: 0px;
  right: 0px;
display: grid;
grid-template-columns: 26% 74%;
gap: 2.8rem;

@media only screen and (max-width: 500px) {


    height: 100vh;
width: 100vw;
   

grid-template-columns: 23% 77%;
gap :0rem;






}

.contact{
    user-select:none;
position: relative;
background-color:${ props => props.userThemeDark? theme.color.back4 :theme.color.blue3 };
border-radius: 3rem 5rem;
@media only screen and (max-width: 500px) {
  border-radius: 1rem;
}
padding: 1rem;
overflow-y: scroll;
 max-height: auto;
 &::-webkit-scrollbar { /* WebKit */
  width: 0;
  height: 0;
}


.tital-bar{
margin-top: 40px;
  display: flex;
 justify-content: center;
 flex-direction: column;
 text-align: center;
 gap: 1.7rem;
 @media only screen and (max-width: 500px) {

  flex-direction: row;

}
 h2{
  color: white;
 font-size: 2.5rem;
 align-self: flex-start;
 margin-left: 2px;
 @media only screen and (max-width: 500px) {
font-size:1.4rem;
align-self: flex-start;
 margin-left: 0px;
 padding:0;


}
 }
 .threeDot{
  display:none;
 }
 @media only screen and (max-width: 500px) {
margin-bottom: 5rem;
.threeDot{
  display:inline-block;
  color: #57C5B6;
 font-size:1.6rem;
  position: absolute;
  top:15px;
  right: 2px;
 }

}
  

 
}
.contact-list{
 height: 100%;
 width: 90%;
margin-top: 4.8vh;
margin-left: 11px;
cursor:pointer;
transition: 0.6 ease-out;

}
}

.chat{
  background-color: ${props => props.userThemeDark? theme.color.back2 :theme.color.blue4 };
  border-radius: 5rem 3rem;
  overflow-y: scroll;
  position: relative;
  &::-webkit-scrollbar {
  width: 0;
  height: 0;
}
@media screen and (max-width: 500px){
  border-radius:0.5rem;
}
}

}


`
export default Conntainer


// for go to chat section from contact
// .chat  display not  none
//.contact section  visibility hidden
// then make grid-template-columns: 0% 100%;
//gap :0rem;