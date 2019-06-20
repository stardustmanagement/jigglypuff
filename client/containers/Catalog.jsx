/**
* ************************************
*
* @module Catalog.jsx
* @author Stardust
* @date 06/19/2019
* @description Main parent component that displays all of the product items.
*
* ************************************
*/

import React, {Component} from 'react'
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import Product from '../components/Product';

/**
* Renders the catalog view
*/

class Catalog extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }
  
  render() {
    return (
      <div id='catalogview'>
        <Product subtractFromCart={this.props.subtractFromCart} addToCart={this.props.addToCart} products={this.props.products} />
      </div>
    )
  }
}

const mapStateToProps = store => ({
  products: store.products.products,
  // fetchProductsStatus: store.products.fetchProductsStatus,
  // fetchProductsError: store.products.fetchProductsError,
});

const mapDispatchtoProps = dispatch => ({
  fetchProducts: () => dispatch(actions.fetchProducts()),
  addToCart: (productId) => dispatch(actions.addToCart(productId)),
  subtractFromCart: (productId) => dispatch(actions.subtractFromCart(productId)),
});

export default connect(mapStateToProps, mapDispatchtoProps)(Catalog);