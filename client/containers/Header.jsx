import React from 'react';
import CartBtn from '../components/CartBtn';
import NavBar from '../components/Navbar';
import { connect } from "react-redux";

import * as actions from '../actions/actions';

const mapStateToProps = store => ({
  totalItemsInCart: store.products.totalItemsInCart,
})

const mapDispatchToProps = dispatch => ({
  proceedToCheckout: () => dispatch(actions.proceedToCheckout()),
})

function Header(props) {
  return (
    <div>
      <div className='header-left'>
        <h1 className='title'>KIM's Convenience</h1>
      </div>
      <header>
        <div className='header-right'>
          <NavBar />
          <CartBtn proceedToCheckout={props.proceedToCheckout} totalItemsInCart={props.totalItemsInCart} />
        </div>
      </header>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);