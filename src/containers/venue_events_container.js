import React from 'react'
import {Component,Fragment} from 'react'
import {Card,Container,Image,Accordion,Divider,Grid,Segment,Form,Button,Dropdown} from 'semantic-ui-react'
import StackGrid from 'react-stack-grid'
import {connect} from 'react-redux'
import Slot from '../components/slot'
import  Carousel  from  'semantic-ui-carousel-react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import {Link} from  'react-router-dom'
import Popup from "reactjs-popup"

const mapStyles={
  width:'760px',
  height:'545px',
}

let infoRoot=[]
let infoPanels=[]
let infoContent=[]
let info2Root=[]
let info2Panels=[]
let info2Content=[]
let info3Root=[]
let info3Panels=[]
let info3Content=[]

class VenueEventContainer extends Component{
  // let headerThese=["Address Info","Box Office Info","On Sale Now!","Not on sale","Event Info"]

  state = {
    rating:0,
    body:"",
    selectedVE:0
  }

  createInfo = () =>{

    if(this.props.selectedContentCounterpart.address_info){
      // sometimes the app re-renders cause of late arriving info, just set these things to blank so i dont get duplicate info accordions
      infoRoot=[]
      infoPanels=[]
      infoContent=[]
      info2Root=[]
      info2Panels=[]
      info2Content=[]
      info3Root=[]
      info3Panels=[]
      info3Content=[]
      // each block of iteration creates a nested accordian
      // if you get to this block your selectedContentCounterpart was a venue

      let counter = 0
      Object.entries(this.props.selectedContentCounterpart.address_info).forEach(value=>{
        if(value[0]!=="longitude"&&value[0]!=="latitude")
        {if(value[0].includes("_")){value[0] = value[0].split("_").join(" ")}
        infoPanels.push({
        key:counter,
        title:`${this.capatilizeString(value[0])}`,
        content:`${value[1]}`
      })
      counter = counter + 1
    }
      })
      infoPanels.push({
        key:counter,
        title: "Full Address",
        content:infoPanels[2].content.split('(')[0] + ', ' +infoPanels[0].content + ', ' + infoPanels[1].content + ' ' + infoPanels[4].content + ', ' + infoPanels[3].content
      })

      infoContent.push(<div><Accordion.Accordion panels={infoPanels}/></div>)

      infoRoot.push({
        key:'root-1',
        title:'Info',
        content:{content:infoContent}
      })





      // info2.push("Box Office Info")
      let counter2 = 0

      Object.entries(this.props.selectedContentCounterpart.box_office_info).forEach(value=>{
        if(value[0].includes("_")){value[0] = value[0].split("_").join(" ")}
        if(value[1] === null){value[1] = "no info available"}
        info2Panels.push({
        key:counter2,
        title:`${this.capatilizeString(value[0])}`,
        content:`${value[1]}`
      })
        counter2 = counter2 + 1
    })

    info2Content.push(<div><Accordion.Accordion panels={info2Panels}/></div>)

    info2Root.push({
      key:'root-2',
      title:'Info',
      content:[info2Content]})

      let counter3 = 0

      Object.entries(this.props.selectedContent.classifications).forEach(value=>{
        if(value[0].includes("_")){value[0] = value[0].split("_").join(" ")}
        if(value[1] !== null)
        {
          info3Panels.push({
        key:counter3,
        title:`${this.capatilizeString(value[0])}`,
        content:`${value[1]}`
      })
      counter3 = counter3 + 1
    }
    })

    info3Content.push(<div><Accordion.Accordion panels={info3Panels}/></div>)

    info3Root.push({
      key:'root-3',
      title:'Info',
      content:[info3Content]


  })}
  //end of venue rendering
  else if(this.props.selectedContentCounterpart.classifications){
    // if you get to this block yout selectedContentCounterpart was an event

    let counter4 = 0
    Object.entries(this.props.selectedContentCounterpart.classifications).forEach(value=>{
      if(value[0].includes("_")){value[0] = value[0].split("_").join(" ")}

      if(value[1]!=="Undefined"){
        info3Panels.push({
        key:counter4,
        title:`${this.capatilizeString(value[0])}`,
        content:`${value[1]}`
      })
        counter4 = counter4 + 1
    }})
    info3Content = (<div><Accordion.Accordion panels={info3Panels}/></div>)
    info3Root.push({
      key:'root-2',
      title:'Info',
      content :[info3Content]
    })




    //info2 accordion
    let counter5=0
    Object.entries(this.props.selectedContent.box_office_info).forEach(value=>{
      if(value[0].includes("_")){value[0] = value[0].split("_").join(" ")}
      if(value[1] === null){value[1] = "no info available"}
      info2Panels.push({
      key:counter5,
      title:`${this.capatilizeString(value[0])}`,
      content:`${value[1]}`
    })
      counter5 = counter5 + 1
  })

  info2Content.push(<div><Accordion.Accordion panels={info2Panels}/></div>)

  info2Root.push({
    key:'root-2',
    title:'Info',
    content:[info2Content]})


    // info accordion
    let counter6 = 0
    Object.entries(this.props.selectedContent.address_info).forEach(value=>{
      if(value[0]!=="longitude"&&value[0]!=="latitude")
      {if(value[0].includes("_")){value[0] = value[0].split("_").join(" ")}
      infoPanels.push({
      key:counter6,
      title:`${this.capatilizeString(value[0])}`,
      content:`${value[1]}`
    })
    counter6 = counter6 + 1
    }
    })
    infoPanels.push({
      key:counter6,
      title: "Full Address",
      content:infoPanels[2].content.split('(')[0] + ', ' +infoPanels[0].content + ', ' + infoPanels[1].content + ' ' + infoPanels[4].content + ', ' + infoPanels[3].content
    })

    infoContent.push(<div><Accordion.Accordion panels={infoPanels}/></div>)

    infoRoot.push({
      key:'root-1',
      title:'Info',
      content:{content:infoContent}
    })

  }

}

  capatilizeString=(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  handleNaming = () => {
      return(this.props.selectedContent.address_info ?
        <h2>
        <Link to={`/event/${this.props.selectedContentCounterpart.id}`}>
        {this.props.selectedContentCounterpart.name}
        </Link> @ <Link to={`/venue/${this.props.selectedContent.id}`}>
         {this.props.selectedContent.name}
         </Link>
         </h2>
        :
        <h2><Link to={`/event/${this.props.selectedContent.id}`}>{this.props.selectedContent.name}</Link> @ <Link to={`/venue/${this.props.selectedContentCounterpart.id}`}>{this.props.selectedContentCounterpart.name}</Link></h2>
      )

  }

  renderSlots = () =>{
   if(Object.values(this.props.selectedContentVenueEvents).length>0){
     return Object.values(this.props.selectedContentVenueEvents).map(showing=>
       <Slot{...showing}/>)}
   else{return"Loading"}
  }

   renderGoogleMap = (address_info) => {
     return(
       <div fluid className={this.props.images === null ? 'mapbox2' : 'mapbox3'} textAlign="center">
       <Map
           google={this.props.google}
           zoom={13}
           style={mapStyles}
           initialCenter={{ lat: address_info.latitude, lng: address_info.longitude}}
         >
         <Marker position={{lat: address_info.latitude, lng: address_info.longitude}} />
         </Map>
        </div>
     )
   }

  figureTitleBasedOnInfo = (info) => {
     switch(info.title){
       case"City":
       return"Address Info"
       case"Open hours":
       return"Box Office"
       case"Genre":
       return"Classifications"
       default:
       return"yeet"
     }
   }

   seeIfOnSale = (info) => {
     return(info.on_sale ? "On Sale!" : "Not on Sale")
   }

   tryToMatchTicket = (ticket,venueEvents) =>{
    let matchingTicketEvents = venueEvents.filter(event=>event.id===ticket.venue_event_id)
    return(matchingTicketEvents.length > 0 ? true : false)
   }
   makeMatchingtickets = (tickets,venueEvents) => {
     return tickets.filter(ticket=>ticket.bought===true&&this.tryToMatchTicket(ticket,venueEvents))
   }

   checkForPurchase = () => {
     alert("review writing is under construction!")
    let matchingTickets  = this.makeMatchingtickets(this.props.user.tickets,this.props.selectedContentVenueEvents)
    console.log(matchingTickets.length)
    matchingTickets.length > 0 ? this.toggleForm() : alert("you must buy a ticket to the event before you can review it!")
   }

   handleChange = (e) => {
     console.log(e.target.value)
     debugger

     this.setState({[e.target.name]: e.target.value})
   }

   findMatchingVenueEvent = (ticket) => {
     let item = null
     this.props.selectedContentVenueEvents.forEach(ve=>{
       if(ve.id === ticket.venue_event_id){item = ve}
     })
     return item
   }

   handleDropdown = (e) => {

     this.setState({
       selectedVE: parseInt(e.target.attributes[0].value)
     })
   }

   configurePurchasedDates = () => {
     let dateObj={}
     let dateArr=[]
     let matchingTickets  = this.makeMatchingtickets(this.props.user.tickets,this.props.selectedContentVenueEvents)
     matchingTickets.forEach(ticket=>{
       if(dateObj[ticket.venue_event_id] === undefined){
         dateArr.push(this.findMatchingVenueEvent(ticket))
         dateObj[ticket.venue_event_id] = true
       }
     })
     return(dateArr.map(showing=><span value={showing.id} name='selectedVE' onClick={this.handleDropdown}>{showing.event_info.date}||{showing.event_info.time}</span>))
   }

   returnPopUp = () => {
    return(
    <Popup trigger={<Button onClick={this.checkForPurchase}size="big" primary>Write a Review!</Button>}position="top center">
     <Form big>
       <Form.Field>
         <label>Rating</label>
         <input name="reviewRating" value={this.state.rating}onChange={this.handleChange}type="integer" />
       </Form.Field>
       <Dropdown text="Time and date">
        <Dropdown.Menu>
          {this.configurePurchasedDates()}
        </Dropdown.Menu>
        </Dropdown>
       <Form.Field>
         <label>Review Body</label>
         <input name="reviewBody" type="textarea" value={this.state.body}onChange={this.handleChange}placeholder="this was an awesome event..."/>
       </Form.Field>
       <Button onClick={this.submitReview}primary>Submit</Button>
     </Form>
     </Popup>
    )
   }

   submitReview = () => {
     let token = localStorage.getItem("token")
     fetch('https://localhost:3001/reviews/create',{
       method: 'POST',
       headers: {
         'Authorization':token,
           'Content-Type': 'application/json',
           'Accepts': 'application/json'
         },
       body:JSON.stringify({
           // userID:this.props.user,
           // venueEventID:
         })
       })
       .then(resp=>resp.json())
       .then(data=>console.log(data))
     }


  render()
    {console.log(this.state)
      this.createInfo()
      return(
      <Container >
        <Image className="animate-pop-in"inline height='140'src='https://i.imgur.com/VYmFGrQ.png'/>
        {this.handleNaming()}
        <div className='cont'>
        {this.props.selectedContent.images&&this.props.selectedContentCounterpart.images === null ? null :
          <Carousel
          id='customCarousel'
          elements={this.props.images}
          duration  ={3000}
          animation  ='slide left'
          showNextPrev  =  {false}
          showIndicators  ={true}
        />}
        {this.props.selectedContent.address_info ? this.renderGoogleMap(this.props.selectedContent.address_info) : this.renderGoogleMap(this.props.selectedContentCounterpart.address_info)}
        </div>
        <Container>
          <Container>
              <Segment>
                <Grid columns={3}>
                  <Grid.Column>
                    <h2>{this.figureTitleBasedOnInfo(infoPanels[0]) }</h2>
                    <Accordion panels={infoRoot} exclusive={false} fluid />
                    </Grid.Column>
                    <Grid.Column>
                    <h2>{this.figureTitleBasedOnInfo(info2Panels[0])}</h2>
                    <Accordion panels={info2Root} exclusive={false} fluid />
                  </Grid.Column>

                  <Grid.Column>
                    <h2>{this.figureTitleBasedOnInfo(info3Panels[0])}</h2>
                    <Accordion panels={info3Root} exclusive={false} fluid />
                  </Grid.Column>
                  </Grid>
              </Segment>
          </Container>
          <h2>Showings</h2>
            <Divider/>
        </Container>
      <StackGrid columnWidth={250}>
      {this.renderSlots()}
      </StackGrid>
      <Divider/>
      <Container>
      {this.props.reviews.length > 0 ? <h2>Reviews</h2> : <h2>{this.props.user.id != null ? "Be the first to write a review for this Event!":"Log in to write a review!"}</h2>}
      { this.props.user.id !== null ? this.returnPopUp() : null}
      </Container>
      <Divider/>
      </Container>
    )
  }
}

const actuallyReturnImages = (images) => {
  return(images.map(image=>{return({render:()=>{return <div className="img" style={{backgroundImage:`url(${image})`}}/>}})}))
}

const testImagesForNull = (images) => {
  return(images === null ? [{render:()=>{return <div className='img' style={{backgroundImage:'url(https://image.flaticon.com/icons/svg/45/45944.svg)'}}/>}}] : actuallyReturnImages(images))
}

const returnImages = (state) => {
  let images = []
  if(state.selectedContent.images&&state.selectedContentCounterpart.images !== null)
  {
    images = state.selectedContent.images.concat(state.selectedContentCounterpart.images)
  }
  else if(state.selectedContent.images&&state.selectedContentCounterpart.images === null){}
  else(state.selectedContent.images === null ? images = state.selectedContentCounterpart.images : images = state.selectedContent.images)
  return testImagesForNull(images)
}

const returnReviews = (reviews,venueEvent) => {
  return(venueEvent.length === 0 && reviews.length === 0 ? [] : createReviewsArr(reviews,venueEvent))
}

const createReviewsArr = (reviews,venueEvent) => {
  console.log(reviews.filter(review=>review.venue_event.id === venueEvent.id))
  return []
}


const mapStateToProps=(state)=>{
  return{
    user:state.user,
    reviews:returnReviews(state.reviews,state.selectedContentVenueEvents),
    images:returnImages(state),
    selectedContent:state.selectedContent,
    selectedContentVenueEvents:state.selectedContentVenueEvents,
    selectedContentCounterpart: state.selectedContentCounterpart
  }
}

export default GoogleApiWrapper({apiKey:'AIzaSyASH06VE-Hs_R4StGyDG52pjgBIdPD0sl8'})(connect(mapStateToProps)(VenueEventContainer))
