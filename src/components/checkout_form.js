import React, {Component} from 'react';
import {Button} from 'semantic-ui-react'
import {CardElement, injectStripe} from 'react-stripe-elements';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    // User clicked submit
    console.log("you would complete purchase here")
  }

  render() {
    console.log(this.props)
    return (
      <div className="checkout">
        <h2>Your Total is ${this.props.total}</h2>
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <Button onClick={this.submit}>CheckOut</Button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
