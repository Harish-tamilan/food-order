import React, { useContext } from 'react';
import classes from './MealItem.module.css';
import Card from '../../UI/Card';
import MealItemForm from './MealItemForm';
import CartProvider from '../../../store/CartProvider';
import CartContext from '../../../store/cart-context';

const MealItem = (props)=>{

    const cartCtx = useContext(CartContext);

    const addItemHandler = (amount)=>{
        console.log('Inside addItemHandler in MealItem.js, the amount is ',amount);
        const item = {
            ...props.meal
        };
        item.amount = amount;
        cartCtx.addItem(item);
    };

    return(
        <li className={classes.meal}>
            <div>
                <h3>{props.meal.name}</h3>
                <div className={classes.description}>{props.meal.description}</div>
                <div className={classes.price}>${props.meal.price}</div>
            </div>
            <div>
                <MealItemForm id={props.id} onAdd={addItemHandler}/>
            </div>
        </li>
    );
}

export default MealItem;