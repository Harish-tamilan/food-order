import React, {useReducer} from 'react';
import CartContext from './cart-context';

const defaultCartState = {
    items : [],
    totalAmount : 0
};

const reducer = (state, action)=>{
    if(action.type==='ADD')
    {
        //console.log('Inside ADD in reducer in CartProvider.js');
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        const index = state.items.findIndex((item)=>
            item.id===action.item.id
        );
        console.log('index is ',index);
        let existingCartItem = state.items[index];
        let updatedItems;
        if(existingCartItem){
            updatedItems = [...state.items];
            let updatedItem = {...existingCartItem,amount:existingCartItem.amount+1};
            //existingCartItem.amount += 1;
            //console.log(updatedItems);
            updatedItems[index] = updatedItem;
            //const amount = updatedItems[index].amount;
            //console.log('amount is ',amount)
            //pdatedItems[index].amount = amount + 1;
            //updatedItems[index].price = updatedItems[index].price + action.item.amount*action.item.price;
            //console.log(updatedItems[index]);
        }
        else
        {
            updatedItems = state.items.concat(action.item);
        }
        
        return {
        items: updatedItems, 
        totalAmount: updatedTotalAmount
        };
    }
    else
    {
        console.log('Inside REMOVE in reducer in CartProvider.js');
        const index = state.items.findIndex((item)=>
            item.id===action.id
        ); 

        const totalAmount = state.totalAmount - state.items[index].price;

        if(state.items[index].amount === 1)
        {
            const reducedItems = state.items.filter((item)=>
                item.id !== action.id
            );
            console.log(reducedItems);
            return {
                items:reducedItems,
                totalAmount:totalAmount
            };
        }
        else
        {
            const updatedItems = [...state.items];
            updatedItems[index].amount = updatedItems[index].amount-1;
            console.log(updatedItems);
            return {
                items:updatedItems,
                totalAmount:totalAmount
            };
        }
    }
    return defaultCartState;
};

const CartProvider = (props)=>{

    const [cartState, dispatchCartAction] = useReducer(reducer, defaultCartState);

    const addItemHandler = (item)=>{
        console.log('Inside addItemHandler in CartProvider.js');
        console.log(item);
        dispatchCartAction({
            type:'ADD',
            item: item
        });
    };

    const removeItemHandler = (id)=>{
        dispatchCartAction({
            type:'REMOVE',
            id: id
        });
    };

    const cartContext = {
        ...cartState,
        addItem : addItemHandler,
        removeItem : removeItemHandler
    };

    return(        

        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
};

export default CartProvider;