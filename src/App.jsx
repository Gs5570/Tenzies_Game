import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

import "./App.css";

import Die from "./component/Die";

function App() {
  const [dice, setDice] = useState(randomNumber());
  const [tenzies, setTenzies] = useState(false);
  

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const initialValue = dice[0].value;
    const sameValue = dice.every((die) => die.value === initialValue);

    if (allHeld && sameValue) {
      setTenzies(true);
      console.log("you won");
    }
  }, [dice]);

  console.log( ` tenizies is ${tenzies}`);

  /**
   *
   * @returns dice properties
   */
  function generateDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  /**Generates a array of random object that contains die state that encompasses (random number, isHeld, id)
   *
   */
  function randomNumber() {

    const randomValues = [];

    for (let i = 0; i < 10; i++) {
      // const randomNumb = Math.floor(Math.random() * 10);
      randomValues.push(generateDice());
    }

    return randomValues;
  }

  /**
   * roll each dice to a random number
   */
  function rollDice() {
    
    // setDice(() => randomNumber());
    if(!tenzies){
      setDice((prevState) => {
        return prevState.map((diceState) => {
          if (diceState.isHeld === false) {
            return generateDice();
          }
          return diceState;
        });
      });
    }else{
      setTenzies(false)
      setDice(prevState =>{
        return prevState.map((prevDice)=>{
          return prevDice? generateDice() : prevDice
        })
      })
    }
    
  }
  console.log(dice);
  console.log(dice[0].isHeld);

  /**
   *
   * @param {*} id
   * Compares the id of the die clicked with it initial state id.
   * when clicked changes the isHeld state to opposite.
   */
  const holdDice = (id) => {
    setDice((prevState) => {
      return prevState.map((dieState) => {
        return dieState.id === id
          ? { ...dieState, isHeld: !dieState.isHeld }
          : dieState;
      });
    });
  };

  

  return (
    <div className="app">
      {tenzies && <Confetti />}
      <h1> Tenzies </h1>
      <p>
        Roll Until all dice are the same. Click each die to freeze it at its
        current value between rolls
      </p>

      <div className="die-order">
        <Die randomNumber={dice} holdDice={holdDice} />
      </div>

      <button
        className="roll-dice"
        onClick={() => {
          rollDice(dice.id);
          
        }}
      >
        {tenzies ? "New Game" : "Roll"}
      </button>
    </div>
  );
}

export default App;
