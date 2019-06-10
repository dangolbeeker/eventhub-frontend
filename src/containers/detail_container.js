import React from 'react'
import {Container,Image,Accordion,Divider} from 'semantic-ui-react'
import {connect} from 'react-redux'
import Slot from '../components/slot'

const DetailContainer = (props) => {
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

  const createInfo = () =>{
    if(props.selectedContent.address_info){

      info.push("Address Info")
      Object.entries(props.selectedContent.address_info).forEach(value=>{
        if(value[0].includes("_")){value[0] = value[0].split("_").join(" ")}
        info.push(`${value[0]}: ${value[1]}`)
      })

      info2.push("Box Office Info")
      if(props.selectedContent.box_office_info)
      {Object.entries(props.selectedContent.box_office_info).forEach(value=>{
        if(value[0].includes("_")){value[0] = value[0].split("_").join(" ")}
        if(value[1] === null){value[1] = "no info available"}
      info2.push(`${value[0]}: ${value[1]}`)})}
      else{info2.push("no info available")}

    }
    // else if(props.selectedContent.classifications){
    //   props.selectedContent.on_sale ? info.push("On Sale Now!") : info.push("Not on sale")
    //
    //   info2.push("Event Info")
    //   Object.entries(props.selectedContent.classifications).forEach(value=>{
    //     if(value[0].includes("_")){value[0] = value[0].split("_").join(" ")}
    //   info2.push(`${value[0]}: ${value[1]}`)})
    // }
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
     return Object.values(props.selectedContentCounterpart).map(event=>
       <React.Fragment><Slot{...event}location={props.location}/><Divider/></React.Fragment>
     )
   }
   else{return"Loading"}
  }

  const renderImage = () => {
    if(props.selectedContent){

    return(props.selectedContent.images ? props.selectedContent.images[props.selectedContent.images.length-1]||props.selectedContent.images[0] : null)
  }}

  return(
    <React.Fragment>
    <h1>Event Hub</h1>
    <h2>{props.selectedContent.name}</h2>
    <Container fluid textAlign="center">
    <Image centered="true"height='140' src={renderImage()}/>
      {createInfo()}
      {renderInfo(info)}
      {renderInfo(info2)}
    </Container>
    <Divider/>
    <Container>
    {props.selectedContent.classifications ? <h2>Venues</h2> : <h2>Events</h2>}
    {renderSlots()}
    </Container>
    </React.Fragment>
  )
}

const mapStateToProps=(state)=>{
  return{
    selectedContent:state.selectedContent,
    selectedContentVenueEvents:state.selectedContentVenueEvents,
    selectedContentCounterpart: state.selectedContentCounterpart
  }
}

export default connect(mapStateToProps)(DetailContainer)
