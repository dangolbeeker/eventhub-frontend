import React from 'react';
import { Card,Image,Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import  Carousel  from  'semantic-ui-carousel-react'


class HomeCard extends React.Component{

  handleButtonLink = () => {
    if(this.props){
      return(this.props.address_info ? `/venue/${this.props.id}` : `/event/${this.props.id}`)
    }
  }

  renderVenueImage = () => {
    if(this.props.images==null){
      return"https://cdn2.iconfinder.com/data/icons/sport-136/128/1_arena_athletics_building_sport_stadium_venue-128.png"
    }else{
      return this.props.images[this.props.images.length-1]
    }
  }

  renderVenueName = () => {
    if(this.props.name)
    {if(this.props.name.includes("(")){
      return this.props.name.split(" (")[0]
    }else{return this.props.name}}
    else{
      return"Loading"
    }
  }

  purchaseOrDetail = () => {
      if(this.props){
        switch(this.props.pathname){
          case"/cart":
          return null
          // return(<Button primary onClick={this.purchaseCartItem}>Purchase</Button>)
          case"/tickets":
          return null
          default:
          return(<Button as={Link} to={this.handleButtonLink()}primary>Details</Button>)
        }
      }
    }


  renderOptionalButton = () => {
    return(this.props.venueEvent ? <Button as={Link} to={`/event/${this.props.event.id}/venue/${this.props.venue.id}`}primary>Details</Button> : null)
  }

  renderDeleteButton = () => {
      switch(this.props.pathname){
        case"/cart":
          return(<Button onClick ={this.deleteCartItem} color="red"primary>Delete</Button>)
        case"/tickets":
          return(<Button onClick ={this.deleteCartItem} color="red"primary>Refund</Button>)
        default:
        return null
      }
  }

  deleteCartItem = () => {
    fetch(`http://localhost:3001/tickets/destroy/${this.props.id}`,{
      method:"DELETE",
      headers:{
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body:JSON.stringify({
        UserID:this.props.user_id
      })
    })
    .then(resp=>resp.json())
    .then(data=>this.props.updateUser(data.user))
  }

  purchaseCartItem = () => {
    fetch(`http://localhost:3001/tickets/purchase/${this.props.id}`,{
      method:"PATCH",
      headers:{
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body:JSON.stringify({
        UserID:this.props.user_id
      })
    })
    .then(resp=>resp.json())
    .then(data=>this.props.updateUser(data.user))
  }
// <p>{this.props.venueEvent ?  `Price: $${this.props.venueEvent.pricing_info.min.split('.')[0]}` : null}</p>


 checkForPrice = (props) => {
  return(props.venueEvent.pricing_info === null ? null : `Price: $${this.props.venueEvent.pricing_info.min.split('.')[0]}`)
 }

  render(){
    console.log(this.props.venueEvent)
    return(
      <Card className="animate-pop-in" height='500'>
        <Image height="140" src={this.renderVenueImage()} />
        <Card.Content>
          <Card.Header>{this.renderVenueName()}</Card.Header>
          <p>{this.props.venueEvent ? `Date: ${this.props.venueEvent.event_info.date}` :null }</p>
          <p>{this.props.venueEvent === undefined ? null : this.checkForPrice(this.props)}</p>
        </Card.Content>
        {this.purchaseOrDetail()}
        {this.renderOptionalButton()}
        {this.renderDeleteButton()}
        </Card>

    )
  }
}

 const mapDispatchToProps = (dispatch) => {
    return{updateUser:data=>
      {
        dispatch({type:"ADD_USER",payload:data})
      }
    }
 }

export default connect(null,mapDispatchToProps)(HomeCard)
