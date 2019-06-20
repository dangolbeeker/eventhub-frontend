import React from 'react';
import { Container,Form,Button } from 'semantic-ui-react'
import { connect } from 'react-redux'



class LoginContainer extends React.Component{


  state = {
    Username:"",
    Password:"",
    Email:"",
  }

  // handleTermsClick = (e) => {
  //   this.setState(prevState =>({Agreed: !prevState.Agreed}))
  // }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  generateEmailFormAndTerms = () => {
    if(this.props.location.pathname==="/register"){
      return(
        // <React.Fragment>
        <Form.Field>
          <label>Email</label>
          <input onChange ={this.handleChange}name="Email"placeholder='Email' />
        </Form.Field>
        // <Form.Field>
        //   <Checkbox onChange ={this.handleTermsClick}label='I agree to the Terms and Conditions' />
        // </Form.Field>
        // </React.Fragment>
      )
    }
  }

  handleSuccess = (data) => {
    localStorage.setItem("token", data.token)
    this.props.addUser(data.user)
    this.props.history.push('/')
  }




  login = () => {
    fetch('http://localhost:3001/login',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(resp=>resp.json())
    .then(data=>{
      data.errors||data.error ? alert(data.errors||data.error)
      :
      this.handleSuccess(data)
    })
  }

  register = () => {
    fetch('http://localhost:3001/register',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(resp=>resp.json())
    .then(data=>{
      data.errors||data.error ? alert(data.errors||data.error)
      :
      this.handleSuccess(data)
    })
  }

  capatilizeString=(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

   handleLoginOrRegister = (e) =>{
     e.preventDefault()
     this.props.location.pathname ==="/login" ? this.login() : this.register()
   }

  // checkLoginOrRegister = () => {
  //   if(this.props.location){
  //     return(this.capatilizeString(this.props.location.pathname.split('/')[1]))
  //   }
  // }

  render(){
      return (
      <Container>
      <h1>{this.props.location.pathname ==='/login' ? "Log In" : "Register"}</h1>
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

 function mapDispatchToProps(dispatch){
   return{addUser:user=>
       dispatch({type:"ADD_USER",payload:user})

   }
 }

export default connect(null,mapDispatchToProps)(LoginContainer)
