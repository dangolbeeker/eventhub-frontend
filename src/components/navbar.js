import React from 'react';
import { Menu, Segment, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'


class Navbar extends React.Component{


  seeCurentUrl = () =>{
    if(this.props){
      let url = this.props.location.pathname.split("/")[1]
      switch(url){
      case"venues":
        return"venues"
      case"venue":
        return"venues"
      case "events":
      return"events"
      case"login":
        return"login"
      case"register":
        return"register"
      case"cart":
      return"cart"
      default:
        return"home"
    }
    }else{return"home"}
  }

  state = {
    activeItem: this.seeCurentUrl()
  }

  handleItemClick = (e, { name }) => {
    this.setState({
       activeItem: name
     })
  }

  handleLogout = () => {
    this.props.deleteUser()
    localStorage.removeItem('token')
    this.props.history.push('/')
  }

  checkerForUser = () =>{
    return(this.props.user ?
      <React.Fragment>
      <Menu.Menu position='right'>
        <Menu.Item
          as={Link}
          to="/cart"
          name='cart'
          active={this.state.activeItem === 'cart'}
          onClick={this.handleItemClick}
        /><Menu.Item
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
    <Segment >
    <Menu pointing secondary>
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
        <Dropdown.Menu>
        <Dropdown.Item as={Link} name ='sports'to='/events/sports'>Sports</Dropdown.Item>
        <Dropdown.Item as={Link} name ='music'to='/events/music'>Music</Dropdown.Item>
        <Dropdown.Item as={Link} name ='arts&theatre'to='/events/arts&theatre'>Arts & Theatre</Dropdown.Item>
        <Dropdown.Item as={Link} name ='misc'to='/events/misc'>Miscellaneous</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
        {this.checkerForUser()}
      </Menu>
      </Segment>
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
