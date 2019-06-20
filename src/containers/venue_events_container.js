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
  let info3Root=[]
  let info3Panels=[]
  let info3Content=[]
  // let headerThese=["Address Info","Box Office Info","On Sale Now!","Not on sale","Event Info"]

  const createInfo = () =>{

    if(props.selectedContentCounterpart.address_info){

      // each block of iteration creates a nested accordian
      // if you get to this block yout selectedContentCounterpart was a venue

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

      Object.entries(props.selectedContentCounterpart.box_office_info).forEach(value=>{
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
      content:[info2Content]})

      let counter3 = 0

      Object.entries(props.selectedContent.classifications).forEach(value=>{
        if(value[0].includes("_")){value[0] = value[0].split("_").join(" ")}
        if(value[1] !== null)
        {
          info3Panels.push({
        key:counter3,
        title:`${capatilizeString(value[0])}`,
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
  else if(props.selectedContentCounterpart.classifications){
    // if you get to this block yout selectedContentCounterpart was an event
    let counter4 = 0
    Object.entries(props.selectedContentCounterpart.classifications).forEach(value=>{
      if(value[0].includes("_")){value[0] = value[0].split("_").join(" ")}

      if(value[1]!=="Undefined"){
        info3Panels.push({
        key:counter4,
        title:`${capatilizeString(value[0])}`,
        content:`${value[1]}`
      })
        counter4 = counter4 + 1
    }})
    info2Content = (<div><Accordion.Accordion panels={info3Panels}/></div>)
    info3Root.push({
      key:'root-2',
      title:'Info',
      content :[info2Content]
    })




    let counter5=0
    Object.entries(props.selectedContentCounterpart.box_office_info).forEach(value=>{
      if(value[0].includes("_")){value[0] = value[0].split("_").join(" ")}
      if(value[1] === null){value[1] = "no info available"}
      info2Panels.push({
      key:counter5,
      title:`${capatilizeString(value[0])}`,
      content:`${value[1]}`
    })
      counter5 = counter5 + 1
  })

  info2Content.push(<div><Accordion.Accordion panels={info2Panels}/></div>)

  info2Root.push({
    key:'root-2',
    title:'Info',
    content:[info2Content]})



    let counter6 = 0
    Object.entries(props.selectedContentCounterpart.address_info).forEach(value=>{
      if(value[0]!=="longitude"&&value[0]!=="latitude")
      {if(value[0].includes("_")){value[0] = value[0].split("_").join(" ")}
      infoPanels.push({
      key:counter6,
      title:`${capatilizeString(value[0])}`,
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

  const capatilizeString=(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const renderInfo = (info) =>{
    return info.map(entry=><h4>{entry}</h4>)
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
    let images = []
    if(props.selectedContent.images&&props.selectedContentCounterpart.images !== null)
    {
      images = props.selectedContent.images.concat(props.selectedContentCounterpart.images)
    }
    else if(props.selectedContent.images&&props.selectedContentCounterpart.images === null){}
    else(props.selectedContent.images === null ? images = props.selectedContentCounterpart.images : images = props.selectedContent.images)
    return testImagesForNull(images)
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
       <Container fluid className={props.selectedContent.images === null ? 'mapbox2' : 'mapbox3'} textAlign="center">
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
     switch(info[0].title){
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

   const seeIfOnSale = (info) => {
     return(info.on_sale ? "On Sale!" : "Not on Sale")
   }

  return(
    <Container >
    <Image className="animate-pop-in"inline height='140'src='https://i.imgur.com/VYmFGrQ.png'/>
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
    <Grid columns={3}>
      <Grid.Column>
      <h2>{figureTitleBasedOnInfo(infoPanels) }</h2>
      <Accordion panels={infoRoot} exclusive={false} fluid />
      </Grid.Column>
      <Grid.Column>
      <h2>{figureTitleBasedOnInfo(info2Panels)}</h2>
      <Accordion panels={info2Root} exclusive={false} fluid />
      </Grid.Column>
    <Grid.Column>
    <h2>{figureTitleBasedOnInfo(info3Panels)}</h2>
    <Accordion panels={info3Root} exclusive={false} fluid />
    </Grid.Column>
    </Grid>
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
