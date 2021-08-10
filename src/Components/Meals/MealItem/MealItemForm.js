import React, {useState,useRef} from 'react';
import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';

const MealItemForm = (props)=>{

    const[isInputValid, setIsInputValid] = useState(true);
    const inputRef = useRef();
    const onSubmitHandler = (event)=>{
        event.preventDefault();
        console.log('Inside onSubmitHandler in MealItemForm.js');
        const value = inputRef.current.value;
        const valueNum = +value;
        if(value.trim().length==0 || valueNum<0 || valueNum>5)
        {
            setIsInputValid(false);
            return;
        }
        props.onAdd(valueNum);
    };

    return(
        <form className={classes.form} onSubmit={onSubmitHandler}>
            <Input
             ref={inputRef}
            label='Amount'
            input={{
            id: 'amount_' + props.id,
            type: 'number',
            min: '1',
            max: '5',
            step: '1',
            defaultValue: '1',
            }}
            />
            <button>+Add</button>
        </form>
    );
}

export default MealItemForm;