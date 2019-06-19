import React from 'react';
import { Container,Divider,Card,Grid,Image } from 'semantic-ui-react'
import {connect} from 'react-redux'
import HomeCard from '../components/home_card'




const HomeContainer = (props) => {


  const renderVenueCards = () => {
    console.log(props)
    let arr = Object.values(props.venues)
    return arr.map(venue=><Grid.Column><HomeCard key={venue.id} {...venue}{...props.location} /></Grid.Column>)
  }

  const renderEventCards = () => {
    let arr = Object.values(props.events)
    return arr.map(event=><Grid.Column><HomeCard key={event.id}{...event}{...props.location} /></Grid.Column>)
  }

  return (
    <Container>
    <Image inline height='140'src='https://i.imgur.com/VYmFGrQ.png'/>
      <h2>Suggested Venues</h2>
    <Container celled="true">
    <Card.Group center="true">
      <Grid columns={Object.keys(props.venues).length}>
      {renderVenueCards()}
      </Grid>
    </Card.Group>
    </Container>
    <Divider horizontal/>
    <Container celled="true">
    <h2>Suggested Events</h2>
    <Card.Group center="true">
      <Grid columns={Object.keys(props.events).length}>
      {renderEventCards()}
      </Grid>
    </Card.Group>
    </Container>
    </Container>
  )
}




const mapStateToProps = (state) =>{
  return{
    venues: make_suggestions_obj(state.venues),
    events: make_suggestions_obj(state.events)
  }
}


 const make_suggestions_obj = (events) =>{
   let obj = {}
     if(Object.keys(events).length===0){
     }else{
      Object.values(events).forEach(event=>{
        if(event.suggested){
          obj[event.id] = event
        }
      })
    }
  return obj
 }


export default connect(mapStateToProps)(HomeContainer);
