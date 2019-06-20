/**
* ************************************
*
* @module AddProducts.jsx
* @author Stardust
* @date 06/19/2019
* @description Component that allows users to add their own product. 
*
* ************************************
*/

import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/actions";
import FileUploader from "react-firebase-file-uploader";
import firebase from "firebase";
//import config file from its file path
import config from "../Firebase";

//initialize firebase
firebase.initializeApp(config);

class AddProduct extends Component {
  constructor() {
    super();

    this.state = {
      productName: "",
      productDesc: "",
      productPrice: "",
      imageURL: ""
    };

    this.updateProductName = this.updateProductName.bind(this);
    this.updateProductDesc = this.updateProductDesc.bind(this);
    this.updateProductPrice = this.updateProductPrice.bind(this);
    this.submitProduct = this.submitProduct.bind(this);
    this.uploadSuccess = this.uploadSuccess.bind(this);
  }

  /*
    updateProductName - gets form input and updates productName field in component state
  */
  updateProductName(e) {
    this.setState({ productName: e.target.value });
  }
  /*
    updateProductDesc - gets form input and updates productDesc field in component state
  */
  updateProductDesc(e) {
    this.setState({ productDesc: e.target.value });
  }

  /*
    updateProductPrice - gets form input and updates productPrice field in component state
  */
  updateProductPrice(e) {
    this.setState({ productPrice: e.target.value });
  }

  /*
    submitProduct - handles form submission | invokes action creator to send product information to redux store and DB
  */
  submitProduct() {
    //userId: this.props.userId
    // this.props.addProduct({
    //   u_id: this.props.userId,
    //   prod_name: this.state.productName,
    //   prod_desc: this.state.productDesc,
    //   prod_price: this.state.productPrice,
    //   img_url: this.state.imageURL
    // });
    console.log('type of price: ', typeof this.state.productPrice)
    this.props.sendProduct({
      u_id: this.props.userId,
      prod_name: this.state.productName,
      prod_desc: this.state.productDesc,
      prod_price: Number(this.state.productPrice),
      img_url: this.state.imageURL
    })
    document.getElementById("product-form").reset();
  }

  /*
    uploadSuccess - handler for successful file upload | gets image URL from firebase and updates imageURL and imageName fields in component state
  */
  uploadSuccess(imageName) {
    firebase
      .storage()
      .ref("products")
      .child(imageName)
      .getDownloadURL()
      .then(imageURL => {
        this.setState({
          imageURL
        });
      })
      .catch(err => console.log("error: ", err));
  }

  render() {
    return (
      <div>
        <h1>Add Product To Store: </h1>
        <form
          id="product-form"
          onSubmit={e => {
            e.preventDefault();
            this.submitProduct();
          }}
        >
          <label>Product Name: </label>
          <input type="text" onChange={e => this.updateProductName(e)} required />
          <br />
          <label>Product Description: </label>
          <br />
          <textarea
            name="description"
            rows="3"
            cols="33"
            onChange={e => this.updateProductDesc(e)}
            required
          />
          <br />
          <label>Product Price: $</label>
          <input
            type="number"
            step="any"
            onChange={e => this.updateProductPrice(e)}
            required
          />
          <br />
          <FileUploader
            accept="image/*"
            name="image"
            storageRef={firebase.storage().ref("products")}
            onUploadSuccess={this.uploadSuccess}
          />
          <br />
          <button type="submit">Add Product</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.products.userId
});

const mapDispatchToProps = dispatch => ({
  addProduct: product => dispatch(actions.addProduct(product)),
  sendProduct: product => dispatch(actions.sendProduct(product))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddProduct);
