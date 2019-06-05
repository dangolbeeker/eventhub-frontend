const defaultState = {
  user:null,
  venues:{},
  events:{
    sports:{},
    music:{},
    artsAndTheatre:{},
    misc:{}
  },
  venueEvents:{}
}


  function reducer(state=defaultState,action){
    switch(action.type){
      case"ADD_VENUES":
        console.log("adding venues")
        return {...state}
        break;
      case"ADD_EVENTS":
        console.log("adding events")
        return {...state}
        break;
      case"ADD_VENUE_EVENTS":
        console.log("adding venue events")
        return {...state}
        break;
      default:
      return state
    }

  }


export default reducer
