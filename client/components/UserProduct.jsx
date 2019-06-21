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
  console.log('In User Catalog', props.products);
  //Render products published by current user
  const filteredUserProducts = props.products
    .filter(product => product.u_id === props.userId)
    .map((product, idx) => {
      return (
        <div key={idx}>
          <img
            src={product.img_url}
            width="45%"
            height="45%"
          />
          <div>Item: {product.prod_name}</div>
          <div>Description: {product.prod_desc}</div>
          <div>$: {product.prod_price}</div>
          <button onClick={e => props.deleteProductAsync(product._id)}>Remove</button>
        </div>
      );
    });
  
    console.log(filteredUserProducts);
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
