import "../style/die.css";

export default function Die(props) {
  // const dieNUmbers=[0,1,2,3,4,5,6,7,8,9]
  const dieElement = props.randomNumber.map((number) => {
    return (
      <div
        className="die-container"
        key={number.id}
        style={{ backgroundColor: number.isHeld ? "#59E391" : "white" }}
        onClick={() => {
          props.holdDice(number.id);
        }}
      >
        <p className="die-text">{number.value}</p>
      </div>
    );
  });

  return dieElement;
}
