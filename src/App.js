import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import HomeContainer from './containers/home_container'
import VenueContainer from './containers/venue_container'
import EventContainer from './containers/event_container'
import LoginContainer from './containers/login_container'
import DetailContainer from './containers/detail_container'
import RegisterContainer from './containers/register_container'
import VenueEventContainer from './containers/venue_events_container'
import { Route, Switch} from 'react-router-dom'
import { connect } from 'react-redux'

class App extends React.Component{


  componentDidMount = () => {
    fetch('http://localhost:3001/venues/index')
    .then(resp=>resp.json())
    .then(venues=>{this.props.addVenues(venues)})
    fetch('http://localhost:3001/events/index')
    .then(resp=>resp.json())
    .then(events=>{this.props.addEvents(events)})
    fetch('http://localhost:3001/venue_events/index')
    .then(resp=>resp.json())
    .then(venueEvents=>{this.props.addVenueEvents(venueEvents)})
    fetch('http://localhost:3001/reviews/index')
    .then(resp=>resp.json())
    .then(reviews=>{this.props.addReviews(reviews)})
  }


  makeFoundEvents = (venueEvents,obj) =>{
    let newObj ={}
    if(venueEvents.length>0&&Object.values(obj).length>0)
    {
      // newObj[venueEvents[0].event_id] = obj[venueEvents[0].event_id]
      // console.log("FORCED ITEM",newObj)
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
          <Route exact path="/event/:id" render={(routerProps) => {
              const foundEvent = this.props.events[parseInt(routerProps.match.params.id)]
                if (foundEvent){
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
          <Route exact path='/login' render={(routerProps)=><LoginContainer{...routerProps}/>}/>
          <Route exact path='/register' render={(routerProps)=><RegisterContainer{...routerProps}/>}/>
          <Route exact path='/events/sports' render={(routerProps)=><EventContainer{...routerProps}/>}/>
          <Route exact path='/events/music' render={(routerProps)=><EventContainer{...routerProps}/>}/>
          <Route exact path='/events/arts&theatre' render={(routerProps)=><EventContainer{...routerProps}/>}/>
          <Route exact path='/events/misc' render={(routerProps)=><EventContainer{...routerProps}/>}/>
          <Route exact path='/venues' render={(routerProps)=><VenueContainer{...routerProps}/>}/>
          <Route exact path='/' render={(routerProps)=><HomeContainer{...routerProps}/>}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    events:state.events,
    venues:state.venues,
    venueEvents:state.venueEvents
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    addVenues:cities=>{
      dispatch({type:"ADD_VENUES",payload:cities})
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
    }
  }
}

// <Route path="/event/:id" render={(routerProps) => {
//     const foundEvent = this.props.events[parseInt(routerProps.match.params.id)]
//       if (foundEvent){
//       const foundVenueEvents = Object.values(this.props.venueEvents).filter(event=>event.event_id===foundEvent.id)
//       if(foundVenueEvents){
//         this.props.addSelectedContent(foundEvent)
//         this.props.addSelectedContentVenueEvents(foundVenueEvents)
//         this.props.addSelectedContentCounterpart()
//         return <DetailContainer{...routerProps}/>}
//       } else {
//         return <h1>Loading</h1>
//       }
//   }} />

export default connect(mapStateToProps, mapDispatchToProps)(App);
