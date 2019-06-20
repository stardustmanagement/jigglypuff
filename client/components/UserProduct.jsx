/**
* ************************************
*
* @module UserProduct.jsx
* @author Stardust
* @date 06/19/2019
* @description Only renders the user's own products, allowing them to delete or edit (stretch) their own products.
*
* ************************************
*/

import React, { Component } from "react";

const UserProduct = props => {
  //NOTE: ADD ACTION CREATOR TO DELETE THIS PRODUCT FROM STORE
  //HTTP: DELETE REQUEST PASSING ITEM'S PRODUCT ID

  //Render products published by current user
  const filteredUserProducts = props.products
    .filter(product => product.userId === props.userId)
    .map((product, idx) => {
      return (
        <div key={idx}>
          <img
            src={product.imageURL}
            width="45%"
            height="45%"
          />
          <div>Item: {product.productName}</div>
          <div>Description: {product.productDesc}</div>
          <div>$: {product.productPrice}</div>
        </div>
      );
    });

  return (
    <div>
      {filteredUserProducts}
    </div>
  );
};

export default UserProduct;

// <button
// id="addtocart"
// onClick={() => this.props.addToCart(product.SKU)}
// >
// {" "}
// Add to Cart
// </button>
// <button
// id="subtractFromCart"
// onClick={() => this.props.subtractFromCart(product.SKU)}
// >
// {" "}
// Subtract from Cart
// </button>