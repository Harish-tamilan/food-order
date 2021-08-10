import React, {useContext} from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';

const Cart = (props)=>{

    console.log('Inside Cart.js');

    const cartCtx = useContext(CartContext);
    const totalAmount = '$'+cartCtx.totalAmount.toFixed(2);
    
    console.log(cartCtx.items);

    const addItemHandler = (item)=>{
      const cartItem = {...item,amount:1};
      cartCtx.addItem(cartItem);
    };

    const removeItemHandler = (item)=>{
      cartCtx.removeItem(item.id);
    };
    
    const cartItems = (
        <ul className={classes['cart-items']}>
          {cartCtx.items.map((item,key) => (
            <CartItem id={item.id} name={item.name} price={item.price} amount={item.amount} onAdd={addItemHandler.bind(null,item)} onRemove={removeItemHandler.bind(null,item)}/>
          ))}
        </ul>
      );
    
      return (
        <Modal onClose={props.onClose}>
          {cartItems}
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>
          <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>
              Close
            </button>
            <button className={classes.button}>Order</button>
          </div>
        </Modal>
      );
}

export default Cart;