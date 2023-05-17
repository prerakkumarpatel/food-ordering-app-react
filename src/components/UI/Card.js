import classes from "./Card.module.css";
export default function Card(params) {
  return <div className={classes.card}>{params.children}</div>;
}
