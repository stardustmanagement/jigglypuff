import * as types from '../constants/actionTypes';

export const requestProducts = () => ({
  type: types.REQUEST_PRODUCTS,
})

export const receiveProducts = (json) => ({
  type: types.RECEIVE_PRODUCTS,
  payload: json,
})


/**
 * Dispatch this in case of receiving invalid data or the request fails
 * @param {*} err error object
 */
export const requestProductsFailure = (err) => ({
  type: types.REQUEST_PRODUCTS_FAILURE,
  payload: err,
})

export const fetchProducts = () => dispatch => {
  console.log('fetchProducts');
  dispatch(requestProducts());
  return fetch('/api/products')
    .then(res => res.json())
    .then(res => {
      if (!isValidProducts(res)) throw new Error('something went wrong')
      return dispatch(receiveProducts(res))
    })
    .catch(err => dispatch(requestProductsFailure(err)))
}

function isValidProducts(res) {
  return Array.isArray(res);
}

export const addToCart = (id) => ({
  type: types.ADD_TO_CART,
  payload: id,
});

export const subtractFromCart = (id) => ({
  type: types.SUBTRACT_FROM_CART,
  payload: id,
});

export const proceedToCheckout = () => ({
  type: types.PROCEED_TO_CHECKOUT,
});

export const exitCheckout = () => ({
  type: types.EXIT_CHECKOUT,
});

export const sendPurchase = (cart) => dispatch => {
  console.log('requestPurchase');
  dispatch(requestProducts());
  return fetch('/api/purchase', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(cart), // data can be `string` or {object}!
      headers:{
      'Content-Type': 'application/json'
      },
    })
    .then(res => res.json())
    .then(res => {
      // if (!isValidProducts(res)) throw new Error('something went wrong')
      return dispatch(acceptPurchase(res))
    })
    .catch(err => console.error(err));
}

export const requestPurchase = () => ({
  type: types.REQUEST_PURCHASE,
});

export const acceptPurchase = (resMsg) => dispatch => {
  dispatch(fetchProducts())
  return dispatch({
    type: types.ACCEPT_PURCHASE,
    payload: resMsg,
  });
}

export const addProduct = (product) => ({
  type: types.ADD_PRODUCT,
  payload: product
})

export const sendProduct = (product) => dispatch => {
  console.log('Before sending: ', product);
  return fetch('/api/newproduct', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  })
  .then(res => dispatch(addProduct(product)))
  .catch(err => console.log(err));
}

export const addUser = (userId) => ({
  type: types.ADD_USER,
  payload: userId
})

export const deleteProduct = (prodId) => ({
  type: types.DELETE_PRODUCT,
  payload: prodId
})

export const deleteProductAsync = (prodId) => dispatch => {
  console.log('Deleting...', prodId);
  return fetch('/api/deleteProduct', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(prodId)
  })
  .then(res => dispatch(deleteProduct(prodId)))
  .catch(err => console.log(err));
}


