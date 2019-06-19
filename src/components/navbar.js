import React from 'react';
import { Menu, Segment, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'


class Navbar extends React.Component{


  seeCurentUrl = () =>{
    if(this.props){
      debugger
      let url = window.location.pathname.split("/")[1]
      switch(url){
      case"venues":
        return"venues"
      case"venue":
        return"venues"
      case "events":
      return"events"
      case "event":
      return"events"
      case"login":
        return"login"
      case"register":
        return"register"
      case"cart":
      return"cart"
      case"tickets":
      return"ticket"
      default:
        return"home"
    }
    }else{return"home"}
  }

  state = {
    activeItem: this.seeCurentUrl()
  }

  // pushNavbar = (name) => {
  //   console.log(this.props)
  //   switch(name){
  //     case"venues":
  //       this.props.history.push('/venues')
  //       break;
  //     case"home":
  //       // this.props.history.push('/')
  //       break;
  //     case"cart":
  //       this.props.history.push('/cart')
  //       break;
  //     case"tickets":
  //       this.props.history.push('/tickets')
  //       break;
  //     case"sports":
  //       console.log("should be going to sports")
  //       this.props.history.push('/events/sports')
  //       break;
  //     case"music":
  //       this.props.history.push('/events/music')
  //       break;
  //     case"misc":
  //       this.props.history.push('/events/music')
  //       break;
  //     case"arts&theatre":
  //       this.props.history.push('/events/music')
  //       break;
  //     default:
  //       break;
  //   }
  // }

  handleItemClick = (e,{name}) => {
    this.setState({activeItem:name}
      // ,
      // ()=>{this.pushNavbar(name)}
    )
  }

  handleLogout = () => {
    this.props.deleteUser()
    localStorage.removeItem('token')
    this.setState({activeItem:"home"},
    ()=>{this.props.history.push('/')})
  }

  checkerForUser = () =>{
    return(this.props.user.id ?
      <React.Fragment>
      <Menu.Menu position='right'>
      <Menu.Item
        as={Link}
        to="/tickets"
        name='tickets'
        active={this.state.activeItem === 'tickets'}
        onClick={this.handleItemClick}
      />
        <Menu.Item
          as={Link}
          to="/cart"
          name='cart'
          active={this.state.activeItem === 'cart'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
            name='logout'
            onClick={this.handleLogout}
          />
      </Menu.Menu>
      </React.Fragment>
       :
      <React.Fragment>
      <Menu.Menu position='right'>
        <Menu.Item
          as={Link}
          to="/login"
          name='login'
          active={this.state.activeItem === 'login'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as={Link}
          to="/register"
            name='register'
            active={this.state.activeItem === 'register'}
            onClick={this.handleItemClick}
          />
      </Menu.Menu>
      </React.Fragment>)
  }



  render(){
  return (
    <Menu style={{position: "sticky",
                  top:"0%",
                  width: "100%",
                  zIndex: "5",
                  color:'white',
                  backgroundColor:'#17202A'
                }}
  pointing  inverted secondary>
      <Menu.Item
        as={Link}
        to='/'
      active={this.state.activeItem === 'home'}
      onClick={this.handleItemClick}
      name='home'/>
      <Menu.Item
        as={Link}
        to='/venues'
      active={this.state.activeItem === 'venues'}
      onClick={this.handleItemClick}
      name='venues'/>
      <Dropdown item text='Events'
      active={this.state.activeItem === 'events'}
      onClick={this.handleItemClick}>
        <Dropdown.Menu name="events">
        <Dropdown.Item as={Link} onClick ={this.handleItemClick} name ='sports' to='/events/sports'>Sports</Dropdown.Item>
        <Dropdown.Item as={Link} onClick ={this.handleItemClick} name ='music' to='/events/music'>Music</Dropdown.Item>
        <Dropdown.Item as={Link} onClick ={this.handleItemClick} name ='arts&theatre' to='/events/arts&theatre'>Arts & Theatre</Dropdown.Item>
        <Dropdown.Item as={Link} onClick ={this.handleItemClick} name ='misc' to='/events/misc'>Miscellaneous</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
        {this.checkerForUser()}
      </Menu>

    )
  }
}

 const mapStateToProps=(state)=>{
   return{user:state.user}
}
 const mapDispatchToProps = (dispatch) => {
   return{deleteUser:()=>dispatch({type:"DELETE_USER",payload:null})}
 }

export default connect (mapStateToProps,mapDispatchToProps)(Navbar);
