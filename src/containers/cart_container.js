import React from 'react'
import HomeCard from '../components/home_card'
import { Container,Divider,Grid,Card } from 'semantic-ui-react'
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from '../components/checkout_form'
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

  // componentDidMount = () => {
  // window.alert("Stripe normally takes a real card, for demo purposes you can just check out without a card")
  // }

// componentDidUpdate = (prevProps) => {
//   // compare urls on update
//   debugger
//   if(this.props.location.pathname !== prevProps.location.pathname){
//     //set venueOrEvents to null and let mapstate handle giving props
//     debugger
//     this.forceUpdate()
// }}

// shouldComponentUpdate = (prevProps) => {
//   console.log("FROM",this.props.location.pathname)
//   console.log("TO",prevProps.location.pathname)
//   console.log("IF FALSE SHOULD NOT UPDATE",prevProps.location.pathname === this.props.location.pathname)
//   debugger
//   return(prevProps.location.pathname === this.props.location.pathname ? false : true)
// }

 renderCart = () => {
     if(this.props.displayTickets.length>0&&this.props.displayVenues.length>0&&this.props.displayEvents.length>0&&this.props.displayVenueEvents.length>0)
     { console.log(this.props)
       return(this.props.displayTickets).map(ticket=>{
         console.log(this.props)
        let cartVenueEvent = this.findVenueEvent(this.props.displayVenueEvents,ticket)
        let cartVenue = this.findVenue(this.props.displayVenues,cartVenueEvent)
        let cartEvent = this.findEvent(this.props.displayEvents,cartVenueEvent)
        console.log(cartVenueEvent)
         return(<HomeCard{...ticket}key={ticket.id}
           name={`${cartEvent.name} @ ${cartVenue.name}`}
           images={cartEvent.images}{...this.props.location}
           venueEvent={cartVenueEvent}venue={cartVenue}
           event={cartEvent}/>)
       })
 }else{return(null)}
}

handleNaming = () => {
  switch(this.props.location.pathname){
    case"/cart":
    return(this.props.displayTickets.length>0 ? "Cart" : "You have nothing in your cart!")
    case"/tickets":
    return(this.props.displayTickets.length>0 ? "Tickets" : "You have no tickets!")
    default:
    console.log("you got here somehow, enjoy")
  }
}

  renderCheckOut = () => {
    return(
      <Elements>
      <CheckoutForm history={this.props.history}tickets={this.props.displayTickets}total={this.props.total}/>
      </Elements>
    )
  }

  renderDemoAlert = () => {
    alert("Stripe normally takes a real card, for demo purposes you can just check out without a card. Feel free to play around with the form :)")
  }


  render(){
    this.renderDemoAlert()
      return (
    <StripeProvider apiKey="pk_test_tBdnFsQYv5jxi24KtBSB6Kyp00dieuLXMt">
      <Container>
      <h1>{this.handleNaming()}</h1>
      <h2>{this.props.total > 0 ? `Your Total is $${this.props.total}`:null}</h2>
      <Divider/>
      <Container textAlign="center">
        <Card.Group columns={5}>
        {this.renderCart()}
        <Divider/>
        </Card.Group>
        {this.props.location.pathname==="/tickets"||this.props.displayTickets.length===0 ? null : this.renderCheckOut()}
      </Container>
      </Container>
      </StripeProvider>
    )
  }
}

 // const configureTickets=(tickets)=>{
 //   switch(window.location.href.split('/')[3]){
 //     case"tickets":
 //     debugger
 //     return(Object.values(tickets).filter(ticket=>ticket.bought===true))
 //     case"cart":
 //     debugger
 //     return(Object.values(tickets).filter(ticket=>ticket.bought===false))
 //   }
 // }

 const configureTotal = (venueEvents) => {
   let total = 0
   if(venueEvents.length!==0){
     venueEvents.forEach(ve=>{
       total = total + parseInt(ve.pricing_info.min)
     })
   }
   return total
 }

 const configureVEDisplay = (tickets,things) => {
      return tickets.map(ticket=>things[ticket.venue_event_id])
}

 const configureEDisplay = (ve,things) => {
      return ve.map(ve=>things[ve.event_id])
}

const configureVDisplay = (ve,things) => {
    return ve.map(ve=>things[ve.venue_id])
}

 const mapStateToProps = (state) => {
   // let ticketsToRender = configureTickets(state.user.tickets)
   // let ticketVenueEvents = ticketsToRender.map(ticket=>state.venueEvents[ticket.venue_event_id])
   // console.log(ticketsToRender)
   // console.log(ticketVenueEvents)

   let tickets =  Object.values(state.tickets).filter(ticket=>ticket.bought===false)
   let displayVE = configureVEDisplay(tickets,state.venueEvents)
   console.log(tickets)
   console.log(displayVE)
return{
  displayTickets:tickets,
  displayVenueEvents:displayVE,
  displayVenues:configureVDisplay(displayVE,state.venues),
  displayEvents:configureEDisplay(displayVE,state.events)
}
}



export default connect(mapStateToProps)(CartContainer)
