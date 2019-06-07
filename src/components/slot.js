import React from 'react'
import { Container,Accordion,Image,Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default class Slot extends React.Component{

  renderImage = () => {
    if(this.props.images==null){
      return"https://cdn2.iconfinder.com/data/icons/sport-136/128/1_arena_athletics_building_sport_stadium_venue-128.png"
    }
    else{
      return this.props.images[this.props.images.length-1]
    }
  }

  buttonLink = () =>{
    if(this.props.classifications){
      return`/event/${this.props.id}`
    }else if(this.props.address_info){
      return `/venue/${this.props.id}`
    }else{return""}
  }

  otherButtonLink = () =>{
    if(this.props.location)
    {if(this.props.location.pathname.split("/").length==3){
      return(<Button as={Link} to={this.buttonLink()}size="big" primary>Event Detail</Button>)
    }}
  }

  buttonName = () =>{
    if(this.props.classifications){
      return"Attraction Details"
    }else if(this.props.address_info){
      return"Venue Details"
    }else{return""}
  }



  render(){
    return(
      <Container textAlign="center">
      <Image centered="true"height='140' src={this.renderImage()}/>
      <h2>{this.props.name}</h2>
      <Button as={Link} to={this.buttonLink()}size="big" primary>{this.buttonName()}</Button>
      {this.otherButtonLink()}
      </Container>
    )
  }
}
