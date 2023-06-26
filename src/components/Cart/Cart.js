import { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isExpandList, setExpandList] = useState(true);
  const [isOrderPlaced, setIsOrderPlaced] = useState(null);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const orderClickHandler = () => {
    setIsCheckout(true);
  };
  const seeItemHandler = () => {
    setExpandList(!isExpandList);
  };
  const submitHandler = (userData) => {
    fetch("https://doordash-48d83-default-rtdb.firebaseio.com/orders.json", {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setIsCheckout(false);
          setIsOrderPlaced(true);
        }
      })
      .catch((error) => {
        setIsOrderPlaced(false);
      });
  };
  const modelAction = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onCloseCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderClickHandler}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal onClose={props.onCloseCart}>
      <span className={classes.viewList} onClick={seeItemHandler}>
        {hasItems && isExpandList
          ? "Close the Ordered Items "
          : "See Ordered Items"}
      </span>
      {isExpandList && cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div>
        {isCheckout && (
          <Checkout onConfirm={submitHandler} onCancel={props.onCloseCart} />
        )}
      </div>

      {isOrderPlaced && (
        <div>
          <h1 className={classes.success}> You can watch Netflix and Chill.</h1>
          <br /> We will deliver it to Your Door success <br /> Click anywhere
          to close
          <br />
        </div>
      )}
      {!isCheckout && !isOrderPlaced && modelAction}
    </Modal>
  );
};

export default Cart;
