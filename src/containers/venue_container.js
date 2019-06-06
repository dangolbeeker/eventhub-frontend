import React from 'react';
import { Container,Divider } from 'semantic-ui-react'
import {connect} from 'react-redux'
import Slot from '../components/slot'




const VenueContainer = (props) => {

  const renderVenueContainers = () => {
    if(props){
    let arr = Object.values(props.venues)
      return arr.map(venue=><React.Fragment><Slot{...venue}/><Divider/></React.Fragment>)
    }
  }



  return (
    <React.Fragment>
    <h1>Event Hub</h1>
    <h2>Venues</h2>
    <Divider/>
    <Container>
    {renderVenueContainers()}
    </Container>
    </React.Fragment>
  )
}

const make_venue_obj = (venues) => {
  let obj={}
  if(Object.keys(venues).length===0){}
  else{
    for(let i=0;i<Object.keys(venues).length;i++){
    obj[i]=venues[Math.floor(Math.random() * Object.keys(venues).length)]
  }}
  return obj
}

const mapStateToProps = (state) => {
  return{
    venues: make_venue_obj(state.venues)
  }
}

export default connect(mapStateToProps)(VenueContainer);
