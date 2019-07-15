
import React from 'react'
import {Container,Image,Accordion,Button,Divider,Grid,Segment} from 'semantic-ui-react'
import {connect} from 'react-redux'
import Slot from '../components/slot'
import  Carousel  from  'semantic-ui-carousel-react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import StackGrid from 'react-stack-grid'


const mapStyles={
  width:'670px',
  height:'545px',
}

const DetailContainer = (props) => {

  const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };



  let infoRoot=[]
  let infoPanels=[]
  let infoContent=[]
  let info2Root=[]
  let info2Panels=[]
  let info2Content=[]
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
      debugger


      // info.push("Address Info")
      let counter = 0
      Object.entries(props.selectedContent.address_info).forEach(value=>{
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
      if(props.selectedContent.box_office_info)
      {Object.entries(props.selectedContent.box_office_info).forEach(value=>{
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
  else if(props.selectedContent.classifications){
    // info2.push("Event Info")
    let counter3 = 0
    Object.entries(props.selectedContent.classifications).forEach(value=>{
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
      <Image className="animate-pop-in"inline height='140'src='https://i.imgur.com/VYmFGrQ.png'/>
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
        <Grid columns={props.selectedContent.address_info ? 2 : 1}>
          {props.selectedContent.address_info ?
            <Grid.Column>
            <h2>{props.selectedContent.address_info ? "Address" : null}</h2>
            <Accordion panels={infoRoot} exclusive={false} fluid />
            </Grid.Column> : null
            }
            <Grid.Column>
            <h2>{props.selectedContent.box_office_info ? "Box Office" : "Classifications"}</h2>
            <Accordion panels={info2Root} exclusive={false} fluid />
            </Grid.Column>
          </Grid>
            {props.selectedContentCounterpart.address_info||props.selectedContent.address_info ? <Divider vertical/> : null}
    </Segment>
    <Divider/>

    {props.selectedContent.classifications ? <h2>Venues</h2> : <h2>Events</h2>}
    <div style={{textAlign:'center'}}>
    <StackGrid columnWidth={250}>
    {renderSlots()}
    </StackGrid>
    </div>
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
