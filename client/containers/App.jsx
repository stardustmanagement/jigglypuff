import React from 'react';
import Header from './Header';
import MainDisplay from '../components/MainDisplay'
import Footer from '../components/Footer'
import PurchaseModal from './PurcasheModal';
import AddProduct from './AddProduct';
import UserCatalog from './UserCatalog';
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const mapStateToProps = store => ({
  onCheckoutPage: store.products.onCheckoutPage,
})

//wire-up Router in here
function App({ onCheckoutPage }) {
  return (
    <Router>
      <div>
        <Header />
        <Link to="/">Store</Link>
        <Link to="/addproduct">Add Product</Link>
        <Link to="/myproducts">My Products</Link>

        {onCheckoutPage && <PurchaseModal />}

        <Route exact path="/" component={MainDisplay} />
        <Route path="/addproduct" component={AddProduct} />
        <Route path="/myproducts" component={UserCatalog} />

        <Footer />
      </div>
    </Router>
  );
}

export default connect(mapStateToProps)(App);

// <MainDisplay />
// <AddProduct />