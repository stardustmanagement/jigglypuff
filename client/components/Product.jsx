import React, {Component} from 'react'

class Product extends Component {

  render() {
    console.log(this.props.products)
    // if(this.props.products[0].image_url) console.log('Image URL', this.props.products[0].image_url);
 
    const productsArr = this.props.products.map((product, idx) => (
      <div className='product' key={idx}>
        <div key={idx}>
          <img
            src={product.img_url}
            width="45%"
            height="45%"
          />
          <div>Item: {product.prod_name}</div>
          <div>Description: {product.prod_desc}</div>
          <div>$: {product.prod_price}</div>
        </div>
        <button id="addtocart" onClick={() => this.props.addToCart(product.SKU)}> Add to Cart</button>
        <button id="subtractFromCart" onClick={() => this.props.subtractFromCart(product.SKU)}> Subtract from Cart</button>
      </div>
    ));
 
    return (
      <div id='catalog'>
        {productsArr}
      </div>
    )
  }
}

export default Product;