/**
* ************************************
*
* @module UserCatalog.jsx
* @author Stardust
* @date 06/19/2019
* @description Display's a users own products in this parent component. 
*
* ************************************
*/

import React, { Component } from "react";
import { connect } from "react-redux";
import UserProduct from '../components/UserProduct';
import * as actions from "../actions/actions";

class UserCatalog extends Component {
  constructor(){
    super();
  }

  render(){
    return (
      <div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserCatalog);