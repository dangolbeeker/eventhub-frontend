import React from 'react'
import {Card,Container,Image,Accordion,Divider,Grid,Segment} from 'semantic-ui-react'
import StackGrid from 'react-stack-grid'
import {connect} from 'react-redux'
import Slot from '../components/slot'
import  Carousel  from  'semantic-ui-carousel-react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'

const mapStyles={
  width:'40%',
  height:'60%',
}

const VenueEventContainer = (props) => {

  let info=[]
  let info2=[]
  let headerThese=["Address Info","Box Office Info","On Sale Now!","Not on sale","Event Info"]

  const createInfo = () =>{
    console.log(props.selectedContentCounterpart)
    if(props.selectedContentCounterpart.address_info){

      info.push("Address Info")
      Object.entries(props.selectedContentCounterpart.address_info).forEach(value=>{
        if(value[0]!=="longitude"&&value[0]!=="latitude")
        {if(value[0].includes("_")){value[0] = value[0].split("_").join(" ")}
        info.push(`${value[0]}: ${value[1]}`)}
      })


      info2.push("Box Office Info")
      if(props.selectedContentCounterpart.box_office_info)
      {
        Object.entries(props.selectedContentCounterpart.box_office_info).forEach(value=>{
        if(value[0].includes("_")){value[0] = value[0].split("_").join(" ")}
        if(value[1] === null){value[1] = "no info available"}
      info2.push(`${value[0]}: ${value[1]}`)})}
      else{info2.push("no info available")}

    }
    else if(props.selectedContentCounterpart.classifications){
      props.selectedContentCounterpart.on_sale ? info.push("On Sale Now!") : info.push("Not on sale")

      info2.push("Event Info")
      Object.entries(props.selectedContentCounterpart.classifications).forEach(value=>{
        if(value[0].includes("_")){value[0] = value[0].split("_").join(" ")}
      info2.push(`${value[0]}: ${value[1]}`)})
    }
    else{return""}
  }

  const renderInfo = (info) =>{
    return info.map(entry=>{
    if(headerThese.includes(entry)){
      return(<h3>{entry}</h3>)
    }else{
      return(<h4>{entry}</h4>)
    }
  })
  }


  const returnImages = (props) => {
    return(props.location.pathname.split('/').length === 5 ?
    props.selectedContentCounterpart.images.map(image=>{return({render:()=>{return <div className="img" style={{backgroundImage:`url(${image})`}}/>}})})
    :
    props.selectedContent.images.map(image=>{return({render:()=>{return <div className="img" style={{backgroundImage:`url(${image})`}}/>}})}))
  }

  const handleNaming = () => {
    console.log(props)
    if(props){
      return(props.selectedContent.address_info ?
        `${props.selectedContentCounterpart.name} @ ${props.selectedContent.name}`
        :
        `${props.selectedContent.name} @ ${props.selectedContentCounterpart.name}`
      )
    }
  }

  const renderSlots = () =>{
   if(Object.values(props.selectedContentVenueEvents).length>0){
     return Object.values(props.selectedContentVenueEvents).map(showing=>
       <React.Fragment><Slot{...showing}/></React.Fragment>)}
   else{return"Loading"}
  }

  const renderImage = () => {
    if(props.selectedContent){
    return(props.selectedContent.images ? returnImages(props.selectedContent.images) : null)
  }}

   const renderGoogleMap = (address_info) => {
     return(
       <Container fluid className="mapbox" textAlign="center">
       <Map
           google={props.google}
           zoom={13}
           style={mapStyles}
           initialCenter={{ lat: address_info.latitude, lng: address_info.longitude}}
         >
         <Marker position={{lat: address_info.latitude, lng: address_info.longitude}} />
         </Map>
        </Container>
     )
   }

  return(
    <Container>
    <h1>Event Hub</h1>
    <h2>{handleNaming()}</h2>
    {props.selectedContent.images === null ? null :
    <Carousel
        id='customCarousel'
        elements={returnImages(props)}
        duration  ={3000}
        animation  ='slide left'
        showNextPrev  =  {false}
        showIndicators  ={true}
      />}
    {props.selectedContent.address_info ? renderGoogleMap(props.selectedContent.address_info) : renderGoogleMap(props.selectedContentCounterpart.address_info)}
    <Container>
    <Container>
    {createInfo()}
    <Segment>
    <Grid columns={props.selectedContentCounterpart.address_info ? 2 : 1}>
    {props.selectedContentCounterpart.address_info ?
    <Grid.Column>
    {renderInfo(info)}
    </Grid.Column> : null
            }
    <Grid.Column>
    {renderInfo(info2)}
    </Grid.Column>
    </Grid>
    {props.selectedContentCounterpart.address_info ? <Divider vertical/> : null}
    </Segment>
    </Container>
    <h2>Showings</h2>
    <Divider/>
    </Container>
    <StackGrid columnWidth={250}>
    {renderSlots()}
    </StackGrid>
    </Container>
  )
}



const mapStateToProps=(state)=>{
  return{
    selectedContent:state.selectedContent,
    selectedContentVenueEvents:state.selectedContentVenueEvents,
    selectedContentCounterpart: state.selectedContentCounterpart
  }
}

export default GoogleApiWrapper({apiKey:'AIzaSyASH06VE-Hs_R4StGyDG52pjgBIdPD0sl8'})(connect(mapStateToProps)(VenueEventContainer))
