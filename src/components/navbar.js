import React from 'react';
import { Menu, Segment, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'



class Navbar extends React.Component{

  state = {
    activeItem: 'home',
  }

  handleItemClick = (e, { name }) => {
    this.setState({
       activeItem: name
     })
  }

  render(){
  return (
    <Segment inverted>
    <Menu inverted pointing secondary>
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
        <Menu.Menu position='right'>
          <Menu.Item
            name='login'
            active={this.state.activeItem === 'login'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
              name='register'
              active={this.state.activeItem === 'register'}
              onClick={this.handleItemClick}
            />
        </Menu.Menu>
      </Menu>
      </Segment>
    )
  }
}

export default Navbar;
