import React, {Component} from 'react';
import {Button} from 'semantic-ui-react'
import {CardElement, injectStripe} from 'react-stripe-elements';
import {connect} from 'react-redux'

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(ev) {
    // User clicked submit
    let token = localStorage.getItem('token')
    fetch('http://localhost:3001/tickets/purchase',{
      method:'PATCH',
      headers:{
        'Authorization':token,
          'Content-Type': 'application/json',
          'Accepts': 'application/json'
      },
      body:JSON.stringify({tickets:this.props.tickets})
    })
    .then(resp=>resp.json())
    .then(data=>{
      this.props.confirmTicketPurchase(data.user)
      this.props.history.push('/tickets')
    })
  }


  render() {
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <Button onClick={this.submit}>CheckOut</Button>
      </div>
    );
  }
}

const mapDispatchToProps  = (dispatch) => {
  return{
    confirmTicketPurchase:data=>dispatch({type:"ADD_USER",payload:data})
  }
}


export default injectStripe(connect(null,mapDispatchToProps)(CheckoutForm));
