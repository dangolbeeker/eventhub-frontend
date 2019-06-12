import React from 'react';
import { Container,Divider,Search } from 'semantic-ui-react'
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
      let arr2 = arr.filter(vOrE=>
        vOrE.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
        // ||
        // vOrE.address_info.state.toLowerCase().includes(this.state.searchTerm.toLowerCase())
        // ||
        // vOrE.address_info.city.toLowerCase().includes(this.state.searchTerm.toLowerCase())
      )
      return arr2.map(vOrE=><React.Fragment><Slot key={vOrE.id}{...vOrE}/><Divider/></React.Fragment>)
      }
    }
  }

  handleChange = (e) => {
    this.setState({searchTerm: e.target.value})
    console.log("STATE CHANGED")
  }

  componentDidUpdate = (prevProps) => {
    // compare urls on update
    if(this.props.location.pathname != prevProps.location.pathname){
      //set venueOrEvents to null and let mapstate handle giving props
      this.props.resetProps()
    }
  }

  capatilizeString=(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }



  render()
  {return (
    <React.Fragment>
    <h1>Event Hub</h1>
    <h2>{this.capatilizeString(this.props.location.pathname.split('/')[this.props.location.pathname.split('/').length-1])}</h2>
    <Search showNoResults={false}onSearchChange={this.handleChange}/>
    <Divider/>
    <Container>
    {this.renderContainers()}
    </Container>
    </React.Fragment>
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
  let arr = Object.values(events).filter(e=>e.classifications.main_category.toLowerCase()===type)
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
  }
}

 const mapDispatchToProps = (dispatch) => {
   return({resetProps:()=>dispatch({type:"RESET_PROPS",payload:null})})
 }

const mapStateToProps = (state) => {
  return(configureEventsOrVenues(window.location.href.split('/'),state))
}

export default connect(mapStateToProps,mapDispatchToProps)(VenueContainer);
