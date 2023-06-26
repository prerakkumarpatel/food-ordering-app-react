import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import React, { useEffect, useState } from "react";
import MealItem from "./MealItem/MealItem";

export default function AvailableMeals(params) {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://doordash-48d83-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const responseData = await response.json();
      const loadedMeals = [];
      for (const key in responseData) {
        console.log(key);
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);

      setIsError(true);
    });
  }, []);
  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        {<h1>Loading ....</h1>}
      </section>
    );
  }
  if (isError) {
    return (
      <section className={classes.mealsError}>
        <h1>Error try again</h1>
      </section>
    );
  }
  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id} // this is new!
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <>
      <section className={classes.meals}>
        <Card>{!isLoading && <ul>{mealsList}</ul>}</Card>
      </section>
    </>
  );
}
