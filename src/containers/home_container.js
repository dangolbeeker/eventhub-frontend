import React from 'react';
import { Container,Divider,Card,Grid } from 'semantic-ui-react'
import {connect} from 'react-redux'
import HomeCard from '../components/home_card'




const HomeContainer = (props) => {

  let key = 1

  const generateKey = () => {
    key = key + 1
    return key
  }

  const renderVenueCards = () => {
    let arr = Object.values(props.venues)
    return arr.map(venue=><Grid.Column><HomeCard key={generateKey()} {...venue} /></Grid.Column>)
  }

  const renderEventCards = () => {
    let arr = Object.values(props.events)
    return arr.map(event=><Grid.Column><HomeCard key={generateKey()}{...event} /></Grid.Column>)
  }

  return (
    <React.Fragment>
      <h1>Event Hub</h1>
      <h2>Suggested Venues</h2>
    <Container celled="true">
    <Card.Group center="true">
      <Grid columns={4}>
      {renderVenueCards()}
      </Grid>
    </Card.Group>
    </Container>
    <Divider horizontal/>
    <Container celled="true">
    <h2>Suggested Events</h2>
    <Card.Group center="true">
      <Grid columns={4}>
      {renderEventCards()}
      </Grid>
    </Card.Group>
    </Container>
    </React.Fragment>
  )
}




const mapStateToProps = (state) =>{
  return{
    venues: make_venue_obj(state.venues),
    events: make_event_obj(state.events)
  }
}

 const make_venue_obj = (venues) =>{
   let obj = {}
   if(Object.keys(venues).length===0){}else{
     for(let i=0;i<4;i++){
       obj[i]=venues[Math.floor(Math.random() * Object.keys(venues).length)]}
   }

  return obj
 }


 const make_event_obj = (events) =>{
   let obj = {}
   if(Object.keys(events).length===0){
   }else{
    for(let i=0;i<4;i++){
      obj[i]=events[Math.floor(Math.random() * Object.keys(events).length)]}
  }
  return obj
 }


export default connect(mapStateToProps)(HomeContainer);
