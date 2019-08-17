import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import HomeContainer from './containers/home_container'
import TicketContainer from './containers/ticket_container.js'
import VenueContainer from './containers/venue_container'
import LoginContainer from './containers/login_container'
import DetailContainer from './containers/detail_container'
import CartContainer from './containers/cart_container'
import VenueEventContainer from './containers/venue_events_container'
import { Route, Switch} from 'react-router-dom'
import { connect } from 'react-redux'

class App extends React.Component{




  autologin = () => {
    let token = localStorage.getItem("token")
    if(token){
    fetch('https://eventhub-backend.herokuapp.com/auto_login', {
      method: 'POST',
      headers: {
      'Authorization':token,
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      }})
      .then(resp=>resp.json())
      .then(data=>{this.props.addUser(data)})
      // .then(()=>this.props.history.push('/'))
  }}

  componentDidMount = () => {
    fetch('https://eventhub-backend.herokuapp.com/venues/index')
    .then(resp=>resp.json())
    .then(venues=>{this.props.addVenues(venues)})
    fetch('https://eventhub-backend.herokuapp.com/events/index')
    .then(resp=>resp.json())
    .then(events=>{this.props.addEvents(events)})
    fetch('http://eventhub-backend.herokuapp.com/venue_events/index')
    .then(resp=>resp.json())
    .then(venueEvents=>{this.props.addVenueEvents(venueEvents)})
    // fetch('https://eventhub-backend.herokuapp.com/reviews/index')
    // .then(resp=>resp.json())
    // .then(reviews=>{this.props.addReviews(reviews)})
    this.autologin()
  }


  makeFoundEvents = (venueEvents,obj) =>{
    let newObj ={}
    if(venueEvents.length>0&&Object.values(obj).length>0)
    {
      // newObj[venueEvents[0].event_id] = obj[venueEvents[0].event_id]
      // ("FORCED ITEM",newObj)
    venueEvents.forEach(event=>{
      if(newObj[event.event_id]){}
      else{newObj[event.event_id] = obj[event.event_id]}
    })}
    return newObj
  }


  makeFoundVenues = (venueEvents,obj) =>{
    let newObj ={}
    if(venueEvents.length>0 && Object.values(obj).length>0){
        venueEvents.forEach(event=>{
        if(newObj[event.venue_id]){}
        else{newObj[event.venue_id] = obj[event.venue_id]}
      })
    }
    return newObj
  }

  triggerAlert = () => {
    return this.props.user.id === null ? alert('use username: edwin and password: ed should you not want to register') : null
  }


  render(){
    return (
      <div className="App">
        <Navbar{...this.props}/>
        <Switch>
        <Route exact path="/venue/:vID/event/:eID" render={(routerProps) => {
            const foundVenue = this.props.venues[parseInt(routerProps.match.params.vID)]
            const foundEvent = this.props.events[parseInt(routerProps.match.params.eID)]
              if (foundVenue&&foundEvent){
                const foundVenueEvents = Object.values(this.props.venueEvents).filter(event=>event.venue_id===foundVenue.id&&event.event_id===foundEvent.id)
                if(foundVenueEvents){
                    this.props.addSelectedContent(foundVenue)
                    this.props.addSelectedContentVenueEvents(foundVenueEvents)
                    this.props.addSelectedContentCounterpart(foundEvent)
                      return <VenueEventContainer{...routerProps}/>
                  }
              } else {
                return <h1>Loading</h1>
              }
          }}/>
          <Route exact path="/event/:eID/venue/:vID" render={(routerProps) => {
              const foundVenue = this.props.venues[parseInt(routerProps.match.params.vID)]
              const foundEvent = this.props.events[parseInt(routerProps.match.params.eID)]
                if (foundVenue&&foundEvent){
                  const foundVenueEvents = Object.values(this.props.venueEvents).filter(event=>event.venue_id===foundVenue.id&&event.event_id===foundEvent.id)
                  if(foundVenueEvents){
                      this.props.addSelectedContent(foundEvent)
                      this.props.addSelectedContentVenueEvents(foundVenueEvents)
                      this.props.addSelectedContentCounterpart(foundVenue)
                        return <VenueEventContainer{...routerProps}/>
                    }
                } else {
                  return <h1>Loading</h1>
                }
            }}/>
        <Route exact path="/venue/:id" render={(routerProps) => {
            const foundVenue = this.props.venues[parseInt(routerProps.match.params.id)]
              if (foundVenue){
                const foundVenueEvents = Object.values(this.props.venueEvents).filter(event=>event.venue_id===foundVenue.id)
                if(foundVenueEvents){
                  const foundEventsForVenue = this.makeFoundEvents(foundVenueEvents,this.props.events)
                  if(foundEventsForVenue){
                    this.props.addSelectedContent(foundVenue)
                    this.props.addSelectedContentVenueEvents(foundVenueEvents)
                    this.props.addSelectedContentCounterpart(foundEventsForVenue)
                      return <DetailContainer{...routerProps}/>
                    }
                  }
              } else {
                return <h1>Loading</h1>
              }
          }} />
          <Route path='/events/:type' render={(routerProps)=><VenueContainer{...routerProps}/>}/>
          <Route exact path="/event/:id" render={(routerProps) => {
              const foundEvent = this.props.events[parseInt(routerProps.match.params.id)]
                if (foundEvent){
                  console.log(Object.values(this.props.venueEvents))
                  const foundEventVenues = Object.values(this.props.venueEvents).filter(event=>event.event_id===foundEvent.id)
                  if(foundEventVenues){
                    const foundVenuesForEvent = this.makeFoundVenues(foundEventVenues,this.props.venues)
                    if(foundVenuesForEvent){
                      this.props.addSelectedContent(foundEvent)
                      this.props.addSelectedContentVenueEvents(foundEventVenues)
                      this.props.addSelectedContentCounterpart(foundVenuesForEvent)
                        return <DetailContainer{...routerProps}/>
                      }
                    }
                } else {
                  return <h1>Loading</h1>
                }
            }} />
            <Route exact path='/tickets' render={(routerProps)=>{
              if(Object.values(this.props.venueEvents).length > 0 && Object.values(this.props.events).length > 0 && Object.values(this.props.venues).length > 0)
              {return(<TicketContainer{...routerProps}/>)}}
            }/>
            <Route exact path='/cart' render={(routerProps)=>{
              if(Object.values(this.props.venueEvents).length > 0 && Object.values(this.props.events).length > 0 && Object.values(this.props.venues).length > 0)
              {return(<CartContainer{...routerProps}/>)}
            }}/>
          <Route exact path='/login' render={(routerProps)=><LoginContainer{...routerProps}/>}/>
          <Route exact path='/register' render={(routerProps)=><LoginContainer{...routerProps}/>}/>
          <Route exact path='/venues' render={(routerProps)=><VenueContainer{...routerProps}/>}/>
          <Route exact path='/' render={(routerProps)=>{return<HomeContainer{...routerProps}/>}}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    events:state.events,
    venues:state.venues,
    venueEvents:state.venueEvents,
    user:state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    addVenues:venues=>{
      dispatch({type:"ADD_VENUES",payload:venues})
    },
    addEvents:events=>{
      dispatch({type:"ADD_EVENTS",payload:events})
    },
    addVenueEvents:venueEvents=>{
      dispatch({type:"ADD_VENUE_EVENTS",payload:venueEvents})
    },
    addReviews:reviews=>{
      dispatch({type:"ADD_REVIEWS",payload:reviews})
    },
    addSelectedContent:selectedContent=>{
      dispatch({type:"ADD_SELECTED_CONTENT",payload:selectedContent})
    },
    addSelectedContentVenueEvents:selectedContentVenueEvents=>{
      dispatch({type:"ADD_SELECTED_CONTENT_VENUE_EVENTS",payload:selectedContentVenueEvents})
    },
    addSelectedContentCounterpart:selectedContentCounterpart=>{
      dispatch({type:"ADD_SELECTED_CONTENT_COUNTERPART",payload:selectedContentCounterpart})
    },
    addUser:user=>{
      dispatch({type:"ADD_USER",payload:user})
    },
    addDisplayTickets:displayTickets=>{
      dispatch({type:"ADD_D_TICKETS",payload:displayTickets})
    },
    addDisplayVenueEvents:displayVenueEvents=>{
      dispatch({type:"ADD_D_VENUE_EVENTS",payload:displayVenueEvents})
    },
    addDisplayEvents:displayEvents=>{
      dispatch({type:"ADD_D_EVENTS",payload:displayEvents})
    },
    addDisplayVenues:displayVenues=>{
      dispatch({type:"ADD_D_VENUES",payload:displayVenues})
    },
    resetCart:()=>{dispatch({type:"RESET_CART_TICKETS",payload:null})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
