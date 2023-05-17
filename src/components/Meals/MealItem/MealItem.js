import MealForm from "./MealForm";
import { useContext } from "react";
import classes from "./MealItem.module.css";
import CartContext from "../../../store/cart-context";
export default function MealItem(params) {
  const cartCtx = useContext(CartContext);

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: params.id,
      name: params.name,
      amount: amount,
      price: params.price,
    });
  };

  const price = `$${params.price.toFixed(2)}`;
  return (
    <li className={classes.meal}>
      <div>
        <h3>{params.name}</h3>
        <div className={classes.description}>{params.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealForm id={params.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
}
