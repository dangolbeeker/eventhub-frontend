import React from 'react'
import { Container,Accordion,Image } from 'semantic-ui-react'

export default class VenueSlot extends React.Component{

  renderImage = () => {
    if(this.props.images==null){
      return"https://cdn2.iconfinder.com/data/icons/sport-136/128/1_arena_athletics_building_sport_stadium_venue-128.png"
    }
    else{
      return this.props.images[this.props.images.length-1]
    }
    console.log("RENDER PHOTO")
  }

  render(){
    console.log(this.props)
    return(
      <Container textAlign="center">
      <Image centered="true"height='140' src={this.renderImage()}/>
      <h2>{this.props.name}</h2>
      </Container>
    )
  }
}
