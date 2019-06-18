
import React from 'react'
import {Container,Image,Accordion,Button,Divider,Grid,Segment} from 'semantic-ui-react'
import {connect} from 'react-redux'
import Slot from '../components/slot'
import  Carousel  from  'semantic-ui-carousel-react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import StackGrid from 'react-stack-grid'


const mapStyles={

  width:'40%',
  height:'56%',
}

const DetailContainer = (props) => {

  const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };



  let info=[]
  let info2=[]
  let headerThese=["Address Info","Box Office Info","On Sale Now!","Not on sale","Event Info"]
  //
  // const generatePanels = () => {
  //   if(props.selectedContent){
  //     debugger
  //       return([
  //       {key:0,
  //         title:"Address Info",
  //         content:generateInfo(this.props.selectd)
  //       },
  //       {key:1,title:"Box Office Info"},
  // ])
  // }}
  //
  // const panels = generatePanels()
  const capatilizeString=(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const createInfo = () =>{
    if(props.selectedContent.address_info){




      info.push("Address Info")
      Object.entries(props.selectedContent.address_info).forEach(value=>{
        if(value[0]!=="longitude"&&value[0]!=="latitude")
        {if(value[0].includes("_")){value[0] = value[0].split("_").join(" ")}
        info.push(`${capatilizeString(value[0])}: ${value[1]}`)}
      })




      info2.push("Box Office Info")
      if(props.selectedContent.box_office_info)
      {Object.entries(props.selectedContent.box_office_info).forEach(value=>{
        if(value[0].includes("_")){value[0] = value[0].split("_").join(" ")}
        if(value[1] === null){value[1] = "no info available"}
      info2.push(`${capatilizeString(value[0])}: ${value[1]}`)})}
      else{info2.push("no info available")}

    }
    else if(props.selectedContent.classifications){
      props.selectedContent.on_sale ? info.push("On Sale Now!") : info.push("Not on sale")

      info2.push("Event Info")
      Object.entries(props.selectedContent.classifications).forEach(value=>{
        if(value[0].includes("_")){value[0] = value[0].split("_").join(" ")}
        if(value[1]!=="Undefined"){info2.push(`${capatilizeString(value[0])}: ${value[1]}`)}})
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

  const renderSlots = () =>{
   if(Object.values(props.selectedContentCounterpart).length>0){
     return Object.values(props.selectedContentCounterpart).map(e=>
       <React.Fragment><Slot{...e} key={e.id} location={props.location}/><Divider/></React.Fragment>
     )
   }
   else{return"Loading"}
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

  const renderImage = () => {
    if(props.selectedContent){
      console.log(props.selectedContent.images)
    return(props.selectedContent.images === null ? null : returnImages(props.selectedContent.images))
  }}

  const renderGoogleMap = (addressInfo) => {
    debugger
    return(
      <div className={props.selectedContent.images === null ? 'mapbox2' : 'mapbox'}>
      <Map
          google={props.google}
          zoom={13}
          style={mapStyles}
          initialCenter={{ lat: addressInfo.latitude, lng: addressInfo.longitude}}
        >
        <Marker position={{lat: addressInfo.latitude, lng: addressInfo.longitude}} />
        </Map>
        </div>
    )
  }


  // let  elements  = [
  // 		{render:()=>{return <Button  fluid>1111111</Button>}},
  // 		{render:()=>{return <Button  fluid>2222222</Button>}},
  // 	]
   const configureGMAddress = (props) => {
     return(props.selectedContent.address_info ? renderGoogleMap(props.selectedContent.address_info) : renderGoogleMap(props.selectedContentVenueEvents.address_info))
   }

  return(
    <Container>
      <h1>Event Hub</h1>
      <h2>{props.selectedContent.name}</h2>
      <div className="cont" id={props.selectedContent.address_info||props.selectedContentCounterpart.address_info ? null : 'detail'}>
        {props.selectedContent.images === null? null :
          <Carousel
          id="detail"
          elements={returnImages(props)}
          duration  ={3000}
  				animation  ='slide left'
  				showNextPrev  =  {false}
  				showIndicators  ={true}
        />
        }
        {props.selectedContent.address_info||props.selectedContentCounterpart.address_info ? configureGMAddress(props) : null}
      </div >
        {createInfo()}
        <Container style={{display:'inline-block'}}>
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
    <Divider/>

    {props.selectedContent.classifications ? <h2>Venues</h2> : <h2>Events</h2>}
    <StackGrid columnWidth={250}>
    {renderSlots()}
    </StackGrid>
    </Container>
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

export default GoogleApiWrapper({apiKey:'AIzaSyASH06VE-Hs_R4StGyDG52pjgBIdPD0sl8'})(connect(mapStateToProps)(DetailContainer))
// GoogleApiWrapper({apiKey:'AIzaSyASH06VE-Hs_R4StGyDG52pjgBIdPD0sl8'})
