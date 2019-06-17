import React from 'react'
import {Card,Container,Image,Accordion,Divider} from 'semantic-ui-react'
import StackGrid from 'react-stack-grid'
import {connect} from 'react-redux'
import Slot from '../components/slot'
import  Carousel  from  'semantic-ui-carousel-react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'

const mapStyles={
  width:'28%',
  height:'28%',
}

const VenueEventContainer = (props) => {

  const returnImages = (images) => {
    return(images.map(image=>{return({render:()=>{return <Image src={image}/>}})}))
  }

  const handleNaming = () => {
    if(props){
      return(props.selectedContent.address_info ?
        `${props.selectedContentCounterpart.name} @ ${props.selectedContent.name}`
        :
        `${props.selectedContent.name} @ ${props.selectedContentCounterpart.name}`
      )
    }
  }

  const renderSlots = () =>{
   if(Object.values(props.selectedContentVenueEvents).length>0){
     return Object.values(props.selectedContentVenueEvents).map(showing=>
       <React.Fragment><Slot{...showing}/></React.Fragment>)}
   else{return"Loading"}
  }

  const renderImage = () => {
    if(props.selectedContent){
    return(props.selectedContent.images ? returnImages(props.selectedContent.images) : null)
  }}

   const renderGoogleMap = (address_info) => {
     return(
       <Map
           google={props.google}
           zoom={13}
           style={mapStyles}
           initialCenter={{ lat: address_info.latitude, lng: address_info.longitude}}
         >
         <Marker position={{lat: address_info.latitude, lng: address_info.longitude}} />
         </Map>
     )
   }

  return(
    <Container>
    <h1>Event Hub</h1>
    <h2>{handleNaming()}</h2>
    {props.selectedContent.images === null ? null :
    <Carousel
        style={{display:"inline-block"}}
        elements={returnImages(props.selectedContent.images)}
        duration  ={3000}
        animation  ='slide left'
        showNextPrev  =  {false}
        showIndicators  ={true}
      />}
    <Container fluid className="mapbox" textAlign="center">
    {props.selectedContent.address_info ? renderGoogleMap(props.selectedContent.address_info) : renderGoogleMap(props.selectedContentCounterpart.address_info)}
    <Image centered="true"height='240' src={renderImage()}/>
    </Container>
    <Container>
    <h2>Showings</h2>
    <Divider/>
    </Container>
    <StackGrid columnWidth={250}>
    {renderSlots()}
    </StackGrid>
    </Container>
  )
}



// {props.selectedContent.images === null ? :
// <Carousel
//     elements={returnImages(props.selectedContent.images)}
//     duration  ={3000}
//     animation  ='slide left'
//     showNextPrev  =  {false}
//     showIndicators  ={true}
//   />}


const mapStateToProps=(state)=>{
  return{
    selectedContent:state.selectedContent,
    selectedContentVenueEvents:state.selectedContentVenueEvents,
    selectedContentCounterpart: state.selectedContentCounterpart
  }
}

export default GoogleApiWrapper({apiKey:'AIzaSyASH06VE-Hs_R4StGyDG52pjgBIdPD0sl8'})(connect(mapStateToProps)(VenueEventContainer))
