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
        return {...state,venues:action.payload}
        break;
      case"ADD_EVENTS":
        return {...state,events:action.payload}
        break;
      case"ADD_VENUE_EVENTS":
        return {...state,venueEvents:action.payload}
        break;
      case"ADD_REVIEWS":
        return {...state,reviews:action.payload}
        break;
      default:
      return state
    }

  }


export default reducer
