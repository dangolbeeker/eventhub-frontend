const defaultState = {
  user:null,
  venues:{},
  events:{
  },
  venueEvents:{},
  selectedContent:{},
  selectedContentStuff:{}
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
      case"ADD_SELECTED_CONTENT":
        return{...state,selectedContent:action.payload}
      case"ADD_SELECTED_CONTENT_STUFF":
        return{...state,selectedContentStuff:action.payload}
      default:
      return state
    }

  }


export default reducer
