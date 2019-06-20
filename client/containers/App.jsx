import React, { Component } from 'react';
import Header from './Header';
import MainDisplay from '../components/MainDisplay'
import Footer from '../components/Footer'
import PurchaseModal from './PurcasheModal';
import AddProduct from './AddProduct';
import UserCatalog from './UserCatalog';
import { connect } from "react-redux";
import * as actions from '../actions/actions';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component{
  constructor(){
    super();
  }
  //Make fetch call to api/current_user, and update state if it returns current user id
  componentDidMount(){
    fetch('http://localhost:3000/api/current_user')
      .then(res => {
        console.log('Before calling JSON on the res', res);
        res.json();
      })
      .then(data => {
        console.log('Response', data);
        this.props.addUser(data);
      }).catch(err => {
        console.log(`error response: ${err}`);
        
      }); 
  }

  render(){
    return (
      <Router>
        <div>
          <Header />
          <Link to="/">Store</Link>
          <Link to="/addproduct">Add Product</Link>
          <Link to="/myproducts">My Products</Link>
  
          {this.props.onCheckoutPage && <PurchaseModal />}
  
          <Route exact path="/" component={MainDisplay} />
          <Route path="/addproduct" component={AddProduct} />
          <Route path="/myproducts" component={UserCatalog} />
  
        </div>
      </Router>
    );
  }
}
const mapStateToProps = store => ({
  onCheckoutPage: store.products.onCheckoutPage,
})

const mapDispatchToProps = dispatch => ({
  addUser: userId => dispatch(actions.addUser(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);

