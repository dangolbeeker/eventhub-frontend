const defaultState = {
  user:null,
  venues:{},
  events:{
  },
  venueEvents:{},
  selectedContent:{},
  selectedContentVenueEvents:{},
  selectedContentCounterpart:{}
}


  function reducer(state=defaultState,action){
    switch(action.type){
      case"ADD_VENUES":
        return {...state,venues:action.payload}
      case"ADD_EVENTS":
        return {...state,events:action.payload}
      case"ADD_VENUE_EVENTS":
        return {...state,venueEvents:action.payload}
      case"ADD_REVIEWS":
        return {...state,reviews:action.payload}
      case"ADD_SELECTED_CONTENT":
        return{...state,selectedContent:action.payload}
      case"ADD_SELECTED_CONTENT_VENUE_EVENTS":
        return{...state,selectedContenVenueEvents:action.payload}
        case"ADD_SELECTED_CONTENT_COUNTERPART":
          return{...state,selectedContentCounterpart:action.payload}
      default:
      return state
    }

  }


export default reducer
