import React from 'react'
import {Container,Image,Accordion,Divider} from 'semantic-ui-react'
import {connect} from 'react-redux'
import Slot from '../components/slot'

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

  return(
    <React.Fragment>
    <h1>Event Hub</h1>
    <h2>{handleNaming()}</h2>
    <Container fluid textAlign="center">
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

export default connect(mapStateToProps)(VenueEventContainer)
