import React, {Component} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// const useStyles = makeStyles(theme => ({
//   button: {
//     margin: theme.spacing(1),
//   },
//   input: {
//     display: 'none',
//   },
// }));

class Product extends Component {

  render() {
    // const classes = useStyles();

    console.log(this.props.products)
    // if(this.props.products[0].image_url) console.log('Image URL', this.props.products[0].image_url);
 
    const productsArr = this.props.products.map((product, idx) => (
      <div className='product' key={idx}>
        <div key={idx}>
          <div className="itemBox">
            <img
              src={product.img_url}
              width="45%"
              height="45%"
            />
            <div className="description">Item: {product.prod_name}</div>
            <div className="description">Description: {product.prod_desc}</div>
            <div className="description">$: {product.prod_price}</div>
            <div className="description">Seller: {product.name}</div>
            <div className="description">Contact Seller: {product.email}</div>
          </div>
        </div>
        <div className="cartButton">
        <button id="addtocart" onClick={() => this.props.addToCart(product.SKU)}> + Add to Cart</button>
        <button id="subtractFromCart" onClick={() => this.props.subtractFromCart(product.SKU)}> - Delete from Cart</button>
        </div>
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