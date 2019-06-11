import React from 'react';
import { Card,Image,Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


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
      return(this.props.pathname==="/cart" ?
    <Button primary onClick={this.handlePurchase}>Purchase</Button>
    :
    <Button as={Link} to={this.handleButtonLink()}primary>Details</Button>)}
  }

  renderOptionalButton = () => {
    return(this.props.venueEvent ? <Button as={Link} to={`/event/${this.props.event.id}/venue/${this.props.venue.id}`}primary>Details</Button> : null)
  }

  renderDeleteButton = () => {
    return(this.props.venueEvent ? <Button onClick ={this.deleteCartItem} color="red"primary>Delete</Button> : null)
  }

  render(){
    return(
      <Card height='500'>
        <Image  height="140" src={this.renderVenueImage()} />
        <Card.Content>
          <Card.Header>{this.renderVenueName()}</Card.Header>
        </Card.Content>
        {this.purchaseOrDetail()}
        {this.renderOptionalButton()}
        {this.renderDeleteButton()}
        </Card>

    )
  }
}

export default HomeCard
