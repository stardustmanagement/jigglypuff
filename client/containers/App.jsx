import React from 'react';
import Header from './Header';
import MainDisplay from '../components/MainDisplay'
import Footer from '../components/Footer'
import PurchaseModal from './PurcasheModal';
import AddProduct from './AddProduct';
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const mapStateToProps = store => ({
  onCheckoutPage: store.products.onCheckoutPage,
})

//wire-up Router in here
function App({ onCheckoutPage }) {
  return (
    <div>
      <Header />
      <MainDisplay />
      <AddProduct />
      <Footer />
      {onCheckoutPage && <PurchaseModal />}
    </div>
  );
}

export default connect(mapStateToProps)(App);