import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [isCartShown, setCartShown] = useState(false);
  const closeCartHandler = (params) => {
    setCartShown(false);
  };
  const showCartHandler = (params) => {
    setCartShown(true);
  };

  return (
    <CartProvider>
      {isCartShown && <Cart onCloseCart={closeCartHandler} />}

      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
