const defaultState = {
  user:{ id:null,
    tickets:{}
  },
  total:0,
  venues:{},
  events:{},
  venueEvents:{},
  //this doesnt get used until venue container gets used
  venueOrEvents:{},
  //not used until cart
  displayTickets:[],
  displayVenueEvents:[],
  displayEvents:[],
  displayVenues:[],
  // above only exist in cart container components, kept her for reference
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
      case"ADD_SELECTED_CONTENT_VENUE_EVENTS":
        return{...state,selectedContentVenueEvents:action.payload}
      case"ADD_SELECTED_CONTENT_COUNTERPART":
        return{...state,selectedContentCounterpart:action.payload}
      case"ADD_USER":
        return{...state,user:action.payload}
      case "DELETE_USER":
        return{...state,user:{
          id:null,
          tickets:{}
        }}
      case"RESET_PROPS":
      return{...state,venueOrEvents:{}}
      case"RESET_CART_TICKETS":
      console.log(state)
      debugger
      return({...state,
        displayTickets:[],
        displayVenueEvents:[],
        displayEvents:[],
        displayVenues:[]
      })
      case"ADD_D_TICKETS":
      debugger
      return({...state,displayTickets:action.payload})
      case"ADD_D_VENUE_EVENTS":
      debugger
      return({...state,displayVenueEvents:action.payload})
      case"ADD_D_EVENTS":
      debugger
      return({...state,displayEvents:action.payload})
      case"ADD_D_VENUES":
      debugger
      return({...state,displayVenues:action.payload})
      default:
      return state
    }

  }


export default reducer
