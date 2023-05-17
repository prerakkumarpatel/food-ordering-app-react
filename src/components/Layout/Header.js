import React from "react";
import mealsImage from "../../assests/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
export default function Header(params) {
  return (
    <>
      <header className={classes.header}>
        <h1>Tomato</h1>
        <HeaderCartButton onClick={params.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="Indian cusine " />
      </div>
    </>
  );
}
