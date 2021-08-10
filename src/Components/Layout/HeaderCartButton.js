import React, {useContext, useEffect, useState} from 'react';
import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';

const HeaderCartButton = (props) =>{

    const cartCtx = useContext(CartContext);

    const [isHighlighted, setIsHighlighted] = useState(false);

    const className = `${classes.button} ${isHighlighted ? classes.bump:''}`;

    const {items} = cartCtx;

    useEffect(()=>{
      if(cartCtx.items.length==0)
        return;

      setIsHighlighted(true);

      const timer = setTimeout(()=>{
        setIsHighlighted(false)
      },300);

      return ()=>{
        //clearTimeout(timer);
      };
    },[cartCtx.items])

    //const cartCtx = useContext(CartContext);
    return(
        <button className={className} onClick={props.onClick}>
        <span className={classes.icon}>
          <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{cartCtx.items.length}</span>
      </button>
    )
}

export default HeaderCartButton;