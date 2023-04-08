import theme from '../theme'
import styled from 'styled-components'


  
//userTheme
//welcome
//contact
const HeaderStytle = styled.div`

:root{
    --dp: ${ props => props.contact[props.welcome].myProfile? `${props => props.contact[props.welcome].avatarImage}`:`data:image/svg+xml;base64,${props => props.contact[props.welcome].avatarImage}`};
}

width: 77%;
height: 8rem;

border-radius: 1em 4em;
position: fixed;
top: 50px;
left: 39%;
display: flex;
align-items: center;
.callMoblie{
display: none;
}
@media (min-width: 501px) and (max-width: 800px) {
overflow: hidden;
}
@media only screen and (max-width: 500px) {

/* for Contact show */


.callMoblie{
display: flex;
position: absolute;
right: 10px;
font-size: 2rem;
color: #62CDFF;
}
position: fixed;
left: 25%;
top: 10px;

border-radius: 2rem;
height: 6rem;
}

background-color: ${ props => props.userThemeDark?theme.color.back4:theme.color.blue3};
.contact-pic{
    height: 6.5rem;
    width: 6.5rem;
    border: 4px outset ${props => props.userThemeDark? `#ffffff93` :theme.color.pattern.themeGreen};
    position: relative;
    left: 7em;
    top: 10px;
    border-radius: 4rem;
    @media (min-width: 501px) and (max-width: 800px) {
      left: 7px;
    top: 10px;
}
@media only screen and (max-width: 500px) {

/* for Contact show */
height: 5rem;
width: 5rem;
left: 4em;
top: 10px;
}


    background-image:url(var(--dp)) ;
    background-size: cover;
    background-position: center;
}
.contact-username{
color:white;
font-weight:600;
font-size:2rem;
position: relative;
left: 7em;
 top: 10px;
 @media (min-width: 501px) and (max-width: 800px) {
      left: 2rem;
    top: 10px;
}
@media only screen and (max-width: 500px) {

/* for Contact show */

left:6rem;
top: 10px;
}

}
.call{
font-size:2.4rem;
color: #0cd189;
display:flex;
gap: 3rem;
justify-self:flex-end;
align-self:center;
position: absolute;
right:33%;
top:44%;
.callMoblie{
display:none;
}
@media (min-width: 501px) and (max-width: 1200px) {
display:none;

}
@media only screen and (max-width: 500px) {

/* for Contact show */
display: none;

}
/* .callMoblie{
display:flex;
} */
}

`
export default HeaderStytle