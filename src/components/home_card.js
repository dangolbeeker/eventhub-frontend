import React from 'react';
import { Card,Image } from 'semantic-ui-react'


export default class HomeCard extends React.Component{

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

  render(){
    return(
      <Card height='500'>
        <Image  height="140" src={this.renderVenueImage()} />
        <Card.Content>
          <Card.Header>{this.renderVenueName()}</Card.Header>
        </Card.Content>
      </Card>
    )
  }
}