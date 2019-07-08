const defaultState = {
  user:{ id:null,
    tickets:{}
  },
  total:0,
  reviews:[],
  venues:{},
  events:{},
  venueEvents:{},
  tickets:[],
  //this doesnt get used until venue container gets used
  venueOrEvents:{},
  selectedContent:{},
  selectedContentVenueEvents:{},
  selectedContentCounterpart:{},
  // above used in venue event container
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
      case "ADD_TICKET_TO_USER":
        return{...state,tickets:action.payload}
      case"ADD_SELECTED_CONTENT_VENUE_EVENTS":
        return{...state,selectedContentVenueEvents:action.payload}
      case"ADD_SELECTED_CONTENT_COUNTERPART":
        return{...state,selectedContentCounterpart:action.payload}
      case"ADD_USER":
        return{...state,user:action.payload,tickets:action.payload.tickets}
      case "DELETE_USER":
        return{...state,user:{
          id:null,
          tickets:{}
        }}
      case"RESET_PROPS":
      return{...state,venueOrEvents:{}}
      case"RESET_CART_TICKETS":
      case"ADD_CART_TICKETS":
        return({...state,tickets:action.payload})

      default:
      return state
    }

  }


export default reducer
