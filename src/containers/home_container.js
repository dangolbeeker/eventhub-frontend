import React from 'react';
import { Container,Divider,Card,Grid,Image } from 'semantic-ui-react'
import {connect} from 'react-redux'
import VenueCard from '../components/venue_card'




const HomeContainer = (props) => {


  const renderVenueCards = () => {
    let arr = Object.values(props.venues)
    return arr.map(venue=><Grid.Column><VenueCard {...venue} /></Grid.Column>)
  }

  const renderEventCards = () => {
    let arr = Object.values(props.events)
    console.log(arr)
    return arr.map(event=><Grid.Column><VenueCard {...event} /></Grid.Column>)
  }

  return (
    <React.Fragment>
      <h1>Event Hub</h1>
      <h2>Suggested Venues</h2>
    <Container celled>
    <Card.Group center={true}>
      <Grid columns={4}>
      {renderVenueCards()}
      </Grid>
    </Card.Group>
    </Container>
    <Divider horizontal/>
    <Container celled>
    <h2>Suggested Events</h2>
    <Card.Group center={true}>
      <Grid columns={4}>
      {renderEventCards()}
      </Grid>
    </Card.Group>
    </Container>
    </React.Fragment>
  )
}




const mapStateToProps = (state) =>{
  make_venue_obj(state)
  return{
    venues: make_venue_obj(state),
    events: make_event_obj(state)
  }
}

 const make_venue_obj = (state) =>{
   let obj = {}
   if(Object.keys(state.venues).length==0){
   }else{
    obj[0]=state.venues[1]
    obj[1]=state.venues[2]
    obj[2]=state.venues[3]
    obj[3]=state.venues[4]
  }
  return obj
 }


 const make_event_obj = (state) =>{
   let obj = {}
   if(Object.keys(state.events).length==0){
   }else{
    obj[0]=state.events[1]
    obj[1]=state.events[2]
    obj[2]=state.events[3]
    obj[3]=state.events[4]
  }
  return obj
 }


export default connect(mapStateToProps)(HomeContainer);
