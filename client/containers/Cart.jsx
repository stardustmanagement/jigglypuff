/**
* ************************************
*
* @module Cart.jsx
* @author Stardust
* @date 06/20/2019
* @description Display's a users shopping cart in this parent component. 
*
* ************************************
*/

import React, { Component } from "react";
import { connect } from "react-redux";
import UserProduct from '../components/UserProduct';
import * as actions from "../actions/actions";


class Cart extends Component {
  constructor(){
    super();
  }

  render(){
    return (
      <div>
        <h1>Cart</h1>
        <UserProduct products={this.props.products} userId={this.props.userId} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products.products,
  userId: state.products.userId
})

const mapDispatchToProps = dispatch => ({
  
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart);