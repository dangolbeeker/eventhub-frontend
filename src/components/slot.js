import React from 'react'
import { Container,Accordion,Image,Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'

class Slot extends React.Component{



 checkForTicketPurchase = (e) =>{
   if(e.target.name === "Add to Cart"){
     this.checkerForUser()
   }
 }

  checkerForUser = () => {
    return(this.props.user != null ? this.createCartTicket(this.props.id,this.props.user.id) : alert("you must be logged in to buy tickets!"))
  }

  createCartTicket = (veID,userID) => {
    let token = localStorage.getItem("token")
    fetch('http://localhost:3001/tickets/create',{
      method: 'POST',
      headers: {
        'Authorization':token,
          'Content-Type': 'application/json',
          'Accepts': 'application/json'},
      body:JSON.stringify({
          UserID:userID,
          venueEventID:veID
        })
      })
      .then(resp=>resp.json())
      .then(data=>this.props.updateUser(data.user))
  }



  dateOrTitle = () =>{
    if(this.props){
      if(this.props.address_info){
        return(
        <React.Fragment>
        <h1>{this.props.name}</h1>
        <h3>{this.props.address_info ? this.props.address_info.city + "," + this.props.address_info.state : this.props.address_info.zip_code}</h3>
        </React.Fragment>
      )}else if(this.props.classifications){
        return(
        <React.Fragment>
        <h1>{this.props.name}</h1>
        <h3>{this.props.classifications.genre}</h3>
        </React.Fragment>)}}
      else{return(null)}
    }

  renderImageOrInfo = () => {
    if(this.props.pricing_info){return(this.renderShowingDetails(this.props))}
    else{return(this.renderImage())}
  }

  renderShowingDetails = (props) => {
    return Object.entries(props.event_info).map(entry=><p>{`${entry[0]} - ${entry[1]}`}</p>)
  }

  renderImage = () => {
    if(this.props.pricing_info){return(this.renderShowingDetails(this.props))}
      else{
        if(this.props.images==null){
        return(<Image centered="true"height='140' src={"https://cdn2.iconfinder.com/data/icons/sport-136/128/1_arena_athletics_building_sport_stadium_venue-128.png"}/>)
      }

      else{return(<Image centered={true}height='140' src={this.props.images[this.props.images.length-1]}/>)}
    }
  }
"https://cdn2.iconfinder.com/data/icons/sport-136/128/1_arena_athletics_building_sport_stadium_venue-128.png"

  buttonLink = () =>{
    if(this.props.classifications){
      return`/event/${this.props.id}`
    }else if(this.props.address_info){
      return `/venue/${this.props.id}`
    }else{return null}
  }

  handleOtherButtonLink = (location,id) =>{
    if(location&&id)
    {if(location.pathname.split('/').length==3){
        return(location.pathname.includes("event")) ?
        <Button as={Link} to={location.pathname + `/venue/${id}`}size="big" primary>Event Details</Button>
          :
        <Button as={Link} to={location.pathname + `/event/${id}`}size="big" primary>Event Details</Button>

      }}

    }

  otherButtonLink = () =>{
    if(this.props.location)
    {if(this.props.location.pathname.split("/").length==3){
      return(<Button as={Link} to={this.handleOtherButtonLink(this.props.location,this.props.id)}size="big" primary>Event Detail</Button>)
    }}
  }

  buttonName = () =>{
    if(this.props.classifications){
      return"Attraction Details"
    }else if(this.props.address_info){
      return"Venue Details"
    }else if(this.props.on_sale){
      return"Add to Cart"
    }else{return"Sold out!"}
  }

  checkForOnsale = () => {
    if(this.props.on_sale){
      return(<h3>On Sale!</h3>)
    }else if(this.props.on_sale ===false){
      return(<h3>Not on sale</h3>)
    }
  }

  checkForSale = () => {
    if(this.props){
      if(this.props.on_sale===true){
        return(
          <Button
          as={ this.props.on_sale ? null : Link}
          name={this.buttonName()}
          onClick={this.checkForTicketPurchase}
          to={this.buttonLink()}size="big"
          primary>{this.buttonName()}</Button>
        )
      }else if(this.props.on_sale===false){
        return(<Button
        as={Link}
        disabled
        name={this.buttonName()}
        to={this.buttonLink()}size="big"
        primary>{this.buttonName()}</Button>)}
        else{return(<Button as={Link} name={this.buttonName()}onClick={this.checkForTicketPurchase}to={this.buttonLink()}size="big" primary>{this.buttonName()}</Button>)}}
    }


  render(){
    return(
      <Container textAlign="center">
      {this.checkForOnsale()}
      {this.dateOrTitle()}
      {this.renderImageOrInfo()}
      {this.checkForSale()}
      {this.handleOtherButtonLink(this.props.location,this.props.id)}
      </Container>
    )
  }
}

const mapStateToProps=(state)=>{
  return{user:state.user}
}

const mapDispatchToProps = (dispatch) => {
    return{updateUser:data=>
      {console.log(data)
        dispatch({type:"ADD_USER",payload:data})
      }
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(Slot)
