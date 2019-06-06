import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import HomeContainer from './containers/home_container'
import VenueContainer from './containers/venue_container'
import EventContainer from './containers/event_container'
import LoginContainer from './containers/login_container'
import RegisterContainer from './containers/register_container'
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
    // this.props.addVenues("cities")
    // this.props.addEvents("events")
    // this.props.addVenueEvents("venueEvents")
  }

  render(){
    return (
      <div className="App">
        <Navbar{...this.props}/>
        <Switch>
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

// const mapStateToProps = (state) => {
//   return state
// }

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
    }
  }
}

export default connect(null, mapDispatchToProps)(App);
