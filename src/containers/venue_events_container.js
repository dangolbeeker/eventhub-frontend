import React from 'react'
import {Card,Container,Image,Accordion,Divider,Grid,Segment} from 'semantic-ui-react'
import StackGrid from 'react-stack-grid'
import {connect} from 'react-redux'
import Slot from '../components/slot'
import  Carousel  from  'semantic-ui-carousel-react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'

const mapStyles={
  width:'40%',
  height:'51.4%',
}

const VenueEventContainer = (props) => {

  let infoRoot=[]
  let infoPanels=[]
  let infoContent=[]
  let info2Root=[]
  let info2Panels=[]
  let info2Content=[]
  let headerThese=["Address Info","Box Office Info","On Sale Now!","Not on sale","Event Info"]

  const createInfo = () =>{

    if(props.selectedContentCounterpart.address_info){
      debugger


      // info.push("Address Info")
      let counter = 0
      Object.entries(props.selectedContentCounterpart.address_info).forEach(value=>{
        if(value[0]!=="longitude"&&value[0]!=="latitude")
        {if(value[0].includes("_")){value[0] = value[0].split("_").join(" ")}
        infoPanels.push({
        key:counter,
        title:`${capatilizeString(value[0])}`,
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
      if(props.selectedContentCounterpart.box_office_info)
      {Object.entries(props.selectedContentCounterpart.box_office_info).forEach(value=>{
        if(value[0].includes("_")){value[0] = value[0].split("_").join(" ")}
        if(value[1] === null){value[1] = "no info available"}
        info2Panels.push({
        key:counter2,
        title:`${capatilizeString(value[0])}`,
        content:`${value[1]}`
      })
        counter2 = counter2 + 1
    })

    info2Content.push(<div><Accordion.Accordion panels={info2Panels}/></div>)

    info2Root.push({
      key:'root-2',
      title:'Info',
      content:[info2Content]
  })}}
  else if(props.selectedContentCounterpart.classifications){
    // info2.push("Event Info")
    let counter3 = 0
    Object.entries(props.selectedContentCounterpart.classifications).forEach(value=>{
      if(value[0].includes("_")){value[0] = value[0].split("_").join(" ")}

      if(value[1]!=="Undefined"){
        info2Panels.push({
        key:counter3,
        title:`${capatilizeString(value[0])}`,
        content:`${value[1]}`
      })
        counter3 = counter3 + 1
    }})

    info2Content = (<div><Accordion.Accordion panels={info2Panels}/></div>)

    info2Root.push({
      key:'root-2',
      title:'Info',
      content :[info2Content]
    })

  }

}

  const capatilizeString=(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
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


  const actuallyReturnImages = (images) => {
    return(images.map(image=>{return({render:()=>{return <div className="img" style={{backgroundImage:`url(${image})`}}/>}})}))
  }
  // props.selectedContentCounterpart.images.map(image=>{return({render:()=>{return <div className="img" style={{backgroundImage:`url(${image})`}}/>}})})
  // :
  // props.selectedContent.images.map(image=>{return({render:()=>{return <div className="img" style={{backgroundImage:`url(${image})`}}/>}})})

  const testImagesForNull = (images) => {
    return(images === null ? [{render:()=>{return <div className='img' style={{backgroundImage:'url(https://image.flaticon.com/icons/svg/45/45944.svg)'}}/>}}] : actuallyReturnImages(images))
  }


  const returnImages = (props) => {
    return(props.location.pathname.split('/').length === 5 ? testImagesForNull(props.selectedContentCounterpart.images) : testImagesForNull(props.selectedContent.images)
  )
  }

  const handleNaming = () => {
    // console.log(props)
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
       <Container fluid className={props.selectedContent.images === null ? 'mapbox2' : 'mapbox'} textAlign="center">
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

  const figureTitleBasedOnInfo = (info) => {
    debugger
     return(info[0].title === "City" ? "Address Info" : "Classifications")
   }

   const seeIfOnSale = (info) => {
     return(info.on_sale ? "On Sale!" : "Not on Sale")
   }

  return(
    <Container>
    <h1>Event Hub</h1>
    <h2>{handleNaming()}</h2>
    <div className='cont'>
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
    </div>
    <Container>
    <Container>
    {createInfo()}
    <Segment>
    <Grid columns={props.selectedContentCounterpart.classifications ? 1 : 2}>
    {
      props.selectedContentCounterpart.address_info?
    <Grid.Column>
    <h2>{figureTitleBasedOnInfo(infoPanels) }</h2>
    {infoPanels.length === 0 ? null : <Accordion panels={infoRoot} exclusive={false} fluid />}
    </Grid.Column>
    : null
  }
    <Grid.Column>
    <h2>{props.selectedContentCounterpart.box_office_info ? "Box Office Info" : "Event Categories"}</h2>
    <Accordion panels={info2Root} exclusive={false} fluid />
    </Grid.Column>
    </Grid>
    {props.selectedContentCounterpart.classifications ? null : <Divider vertical/> }
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
