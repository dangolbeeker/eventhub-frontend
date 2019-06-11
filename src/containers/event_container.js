import React from 'react';
import { Container,Divider } from 'semantic-ui-react'
import {connect} from 'react-redux'
import Slot from '../components/slot'




const EventContainer = (props) => {

  const renderEventContainers = () => {
    if(Object.values(props.misc).length===0){}
    else{
      if(props.location.pathname.split('/')[2]!=="arts&theatre"){
        let arr = Object.values(props[props.location.pathname.split('/')[2]])
        return arr.map(venue=><React.Fragment><Slot{...venue}/><Divider/></React.Fragment>)
      }else{
        let arr = Object.values(props.artsAndTheatre)
        return arr.map(venue=><React.Fragment><Slot{...venue}/><Divider/></React.Fragment>)
      }

    }
  }

  const renderName = () => {
    if(props){
      switch(props.location.pathname){
        case"/events/sports":
          return"Sports"
        case"/events/music":
          return"Music"
        case"/events/misc":
          return"Misc"
        case"/events/arts&theatre":
        return"Arts & Theatre"
        default:
        console.log("wtf")
      }
    }
  }

  return (
    <React.Fragment>
    <h1>Event Hub</h1>
    <h2>{renderName()}</h2>
    <Divider/>
    <Container>
    {renderEventContainers()}
    </Container>
    </React.Fragment>
  )
}



const makeEventObj = (events,arg) =>{
  let obj={}
  if(Object.keys(events).length===0){return obj}
  else{
    return obj = filterEvents(events,arg)
    // for(let i=0;i<20;i++){
    //   obj[i]=events[Math.floor(Math.random() * Object.keys(events).length)]
    //   debugger
    // }
  }
}

const filterEvents = (events,arg) => {
  let obj={}
  let counter = 0
    switch(arg){
      case"sports":
        Object.values(events).forEach(event=>{
          if(event.classifications.main_category ==="Sports"){
            obj[counter] = event
            counter++
          }else{}
        })
        break;
      case"music":
        Object.values(events).forEach(event=>{
          if(event.classifications.main_category ==="Music"){
            obj[counter] = event
            counter++
          }
        })
        break;
      case"arts&theatre":
        Object.values(events).forEach(event=>{
          if(event.classifications.main_category ==="Arts & Theatre"){
            obj[counter] = event
            counter++
          }
        })
        break;
      case"misc":
        Object.values(events).forEach(event=>{
          if(event.classifications.main_category ==="Miscellaneous"){
            obj[counter] = event
            counter++
          }
      })
      break;
      default:
        console.log('wtf?')
    }
    return obj
}

const mapStateToProps = (state) => {
  return{
    sports:makeEventObj(state.events,"sports"),
    music:makeEventObj(state.events,"music"),
    artsAndTheatre:makeEventObj(state.events,"arts&theatre"),
    misc:makeEventObj(state.events,"misc")
  }

}


// let obj={}
// debugger
// if(Object.keys(events).length===0){}
// else{for(let i=0;i<20;i++){
//   debugger
//   obj[i]=events[Math.floor(Math.random() * Object.keys(events).length)]
// }}
// return obj

export default connect(mapStateToProps)(EventContainer);
