import React from 'react';
import { Container,Form,Checkbox,Button } from 'semantic-ui-react'



export default class LoginContainer extends React.Component{


  state = {
    Username:"",
    Password:"",
    Email:"",
    Agreed:false
  }

  handleTermsClick = (e) => {
    this.setState(prevState =>({Agreed: !prevState.Agreed}))
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  generateEmailFormAndTerms = () => {
    if(this.props.location.pathname=="/register"){
      return(
        <React.Fragment>
        <Form.Field>
          <label>Email</label>
          <input onChange ={this.handleChange}name="email"placeholder='Email' />
        </Form.Field>
        <Form.Field>
          <Checkbox onChange ={this.handleTermsClick}label='I agree to the Terms and Conditions' />
        </Form.Field>
        </React.Fragment>
      )
    }
  }


  login = () => {
    console.log("loggin in")
  }

  register = () => {
    console.log('registering')
  }

  capatilizeString=(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

   handleLoginOrRegister = () =>{
     this.props.location.pathname ==="/login" ? this.login() : this.register()
   }

  checkLoginOrRegister = () => {
    if(this.props.location){
      return(this.capatilizeString(this.props.location.pathname.split('/')[1]))
    }
  }

  render(){
      return (
      <Container>
      <h1>{this.checkLoginOrRegister()}</h1>
        <Form>
        <Form.Field>
          <label>Username</label>
          <input onChange ={this.handleChange}name="Username"placeholder='Username' />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input onChange ={this.handleChange}name="Password"type="password"placeholder='Password' />
        </Form.Field>
        {this.generateEmailFormAndTerms()}
        <Button name="Agreed"onClick={this.handleLoginOrRegister}type='submit'>Submit</Button>
      </Form>
      </Container>
    )
  }
}
