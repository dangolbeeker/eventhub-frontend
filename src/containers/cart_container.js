import React from 'react'
import HomeCard from '../components/home_card'
import { Container,Divider,Grid,Card } from 'semantic-ui-react'
import { connect } from 'react-redux'


class CartContainer extends React.Component{

  findVenue = (venues,item) => {
    let obj = {}
    venues.forEach(venue=>{
      if(venue.id===item.venue_id){
        obj = venue
      }}
    )
    return obj
  }

  findEvent = (events,item) => {
    let obj = {}
    events.forEach(e=>{
      if(e.id===item.event_id){
        obj = e
      }}
    )
    return obj
  }

  findVenueEvent = (venueEvents,item) => {
    let obj = {}
    venueEvents.forEach(venueEvent=>{
      if(venueEvent.id===item.venue_event_id){
        obj = venueEvent
      }}
    )
    return obj
  }

 renderCart = () => {
     if(Object.values(this.props.cartTickets).length>0){
       console.log(this.props)
       return(Object.values(this.props.cartTickets).map(ticket=>{
        let cartVenueEvent = this.findVenueEvent(this.props.cartVenueEvents,ticket)
        let cartVenue = this.findVenue(this.props.cartVenues,cartVenueEvent)
        let cartEvent = this.findEvent(this.props.cartEvents,cartVenueEvent)
        debugger
         return(<HomeCard{...ticket}
           name={`${cartEvent.name} @ ${cartVenue.name}`}
           images={cartEvent.images}{...this.props.location}
           venueEvent={cartVenueEvent}venue={cartVenue}
           event={cartEvent}/>)
       }))
 }else{return(null)}
}




  render(){
      return (
      <Container>
      <h1>{Object.values(this.props.cartTickets).length>0 ? "Cart" : "You have nothing in your cart!"}</h1>
      <Divider/>
      <Container textAlign="center">
        <Card.Group columns={5}>
        {this.renderCart()}
        </Card.Group>
      </Container>
      </Container>
    )
  }
}

 const mapStateToProps = (state) => {
   return{
     user:state.user,
   }
 }

 const mapDispatchToProps = (dispatch) => {
   return{
     confirmTicketPurchase:(ticketObj)=>
     dispatch({type:"ADD_TICKET_TO_USER",payload:ticketObj})
   }
 }


export default connect(mapStateToProps,mapDispatchToProps)(CartContainer)
