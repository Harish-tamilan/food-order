import React, {useState} from 'react';
import Header from './Components/Layout/Header';
import Meals from './Components/Meals/Meals';
import Cart from './Components/Cart/Cart';
import CartProvider from './store/CartProvider';

function App() {

  const [isCartShown, setIsCartShown] = useState(false);
  
  const showCartHandler = ()=>{
    console.log('Inside Show Cart Handler in App.js');
    setIsCartShown(true);
  };

  const onCloseHandler = ()=>{
    console.log('Inside onClose Handler in App.js');
    setIsCartShown(false);
  }

  return (
    <CartProvider>
      {isCartShown && <Cart onClose={onCloseHandler}/>}
      <Header onShowCart={showCartHandler}/>
      <Meals/>
    </CartProvider>
  );
}

export default App;
