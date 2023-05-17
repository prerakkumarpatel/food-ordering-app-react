import Input from "../../UI/Input";
import classes from "./MealForm.module.css";
import { useState, useRef } from "react";

export default function MealForm(params) {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    params.onAddToCart(enteredAmountNumber);
  };

  return (
    <>
      <form className={classes.form} onSubmit={submitHandler}>
        <Input
          label="Amount"
          ref={amountInputRef}
          input={{
            id: "amount_" + params.id, // this changed!
            type: "number",
            min: "1",
            max: "5",
            step: "1",
            defaultValue: "1",
          }}
        />
        <button>+Add</button>

        {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
      </form>
    </>
  );
}
