import React from 'react'
import {Container,Image,Accordion,Divider} from 'semantic-ui-react'
import {connect} from 'react-redux'
import Slot from '../components/slot'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'

const mapStyles={
  width:'28%',
  height:'28%',
}

const VenueEventContainer = (props) => {

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
       <React.Fragment><Slot{...showing}/><Divider/></React.Fragment>)}
   else{return"Loading"}
  }

  const renderImage = () => {
    if(props.selectedContent){
    return(props.selectedContent.images ? props.selectedContent.images[props.selectedContent.images.length-1]||props.selectedContent.images[0] : null)
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
    <React.Fragment>
    <h1>Event Hub</h1>
    <h2>{handleNaming()}</h2>
    <Container fluid className="mapbox" textAlign="center">
    {props.selectedContent.address_info ? renderGoogleMap(props.selectedContent.address_info) : renderGoogleMap(props.selectedContentCounterpart.address_info)}
    <Image centered="true"height='240' src={renderImage()}/>
    </Container>
    <Container>
    <h2>Showings</h2>
    <Divider/>
    </Container>
    {renderSlots()}
    </React.Fragment>
  )
}

const mapStateToProps=(state)=>{
  return{
    selectedContent:state.selectedContent,
    selectedContentVenueEvents:state.selectedContentVenueEvents,
    selectedContentCounterpart: state.selectedContentCounterpart
  }
}

export default GoogleApiWrapper({apiKey:})(connect(mapStateToProps)(VenueEventContainer))
