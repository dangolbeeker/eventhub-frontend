import React from 'react';
import { Card,Container,Divider,Search,Image } from 'semantic-ui-react'
import StackGrid from 'react-stack-grid'
import {connect} from 'react-redux'
import Slot from '../components/slot'



class VenueContainer extends React.Component{

  state = {
    searchTerm:""
  }

  renderContainers = () => {
    if(this.props.venuesOrEvents){
    let arr = Object.values(this.props.venuesOrEvents)
    if(arr.length>0){
      let arr2 = arr.filter(vOrE=>this.handleFilter(vOrE,this.state.searchTerm))
      return arr2.map(vOrE=><React.Fragment><Slot key={vOrE.id}{...vOrE}/></React.Fragment>)
      }
    }
  }

  handleFilter = (vOrE,term) => {
    return(vOrE.classifications ? this.handleEventFilter(vOrE,term) : this.handleVenueFilter(vOrE,term))
  }

  handleEventFilter = (event,term) => {
    if(event.name.toLowerCase().includes(term.toLowerCase())){return true}
    else if(event.classifications.genre){if(event.classifications.genre.toLowerCase().includes(term.toLowerCase())){return true}}
    else if(event.classifications.sub_genre){if(event.classifications.sub_genre.toLowerCase().includes(term.toLowerCase())){return true}}
    else if(event.classifications.sub_category){if(event.classifications.sub_category.toLowerCase().includes(term.toLowerCase())){return true}}
    else{return false}
      // return(event.name.toLowerCase().includes(term.toLowerCase())
      // ||
      // event.classifications.genre.toLowerCase().includes(term.toLowerCase())
      // ||
      // event.classifications.sub_genre.toLowerCase().includes(term.toLowerCase())
      // ||
      // event.classifications.sub_category.toLowerCase().includes(term.toLowerCase()) ? event : null )
  }

  handleVenueFilter = (venue,term) => {
    if(venue.name.toLowerCase().includes(term.toLowerCase())){return true}
    else if(venue.address_info.city.toLowerCase().includes(term.toLowerCase())){return true}
    else if(venue.address_info.country.toLowerCase().includes(term.toLowerCase())){return true}
    else if(venue.address_info.state.toLowerCase().includes(term.toLowerCase())){return true}
    else{return false}
  }

  // vOrE.address_info.state.toLowerCase().includes(this.state.searchTerm.toLowerCase())

  handleChange = (e) => {
    this.setState({searchTerm: e.target.value})
  }

  componentDidUpdate = (prevProps) => {
    // compare urls on update
    if(this.props.location.pathname !== prevProps.location.pathname){
      //set venueOrEvents to null and let mapstate handle giving props
      this.props.resetProps()
    }
  }

  capatilizeString=(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }



  render()
  {
    return (
    <Container >
    <h1>Event Hub</h1>
    <Image inline height='140'src='https://i.imgur.com/VYmFGrQ.png'/>
    <h2>{this.capatilizeString(this.props.location.pathname.split('/')[this.props.location.pathname.split('/').length-1])}</h2>
    <Search showNoResults={false}onSearchChange={this.handleChange}/>
    <Divider/>
    <StackGrid columnWidth={300}>
    {this.renderContainers()}
    </StackGrid>
    </Container>
  )}
}

const configureEvents = (type,events) => {
    switch(type){
      case"misc":
        type="miscellaneous"
      break;
      case"arts&theatre":
        type="arts & theatre"
      break;
      default:
      break;
    }
  let obj = {}
  let arr = Object.values(events).filter(e=>e.classifications.main_category.toLowerCase()===type
)
    arr.forEach(e=>{
      obj[e.id] = e
    })
    return obj
}

const configureEventsOrVenues = (location,state) => {
  switch(location[3]){
    case"venues":
    return{venuesOrEvents:state.venues}
    case"events":
    return{venuesOrEvents:configureEvents(location[4],state.events)}
    default:
    console.log('you super done goofed here')
    break;
  }
}

 const mapDispatchToProps = (dispatch) => {
   return({resetProps:()=>dispatch({type:"RESET_PROPS",payload:null})})
 }

const mapStateToProps = (state) => {
  return(configureEventsOrVenues(window.location.href.split('/'),state))
}

export default connect(mapStateToProps,mapDispatchToProps)(VenueContainer);


// process.env.REACT_APP_GOOGLE_MAPS_API
