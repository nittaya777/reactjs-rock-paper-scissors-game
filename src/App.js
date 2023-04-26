import "./App.css";
import { useState } from "react";
import { FaHandRock, FaHandPaper, FaHandScissors } from "react-icons/fa";

const actions = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

const randomAction = () => {
  const keys = Object.keys(actions);
  const index = Math.floor(Math.random() * keys.length);
  return keys[index];
};
const calculateWinner = (action1, action2) => {
  if (action1 === action2) {
    return 0;
  } else if (actions[action1] === action2) {
    return -1;
  } else if (actions[action2] === action1) {
    return 1;
  }
  return null;
};

const ActionIcon = ({ action, ...props }) => {
  const icons = {
    rock: FaHandRock,
    paper: FaHandPaper,
    scissors: FaHandScissors,
  };
  const Icon = icons[action];
  return <Icon {...props} />;
};

const Player = ({ name = "Player", score = 0, action = "rock" }) => {
  return (
    <div className="player">
      <div className="score">{`${name} : ${score}`}</div>
      <div className="action">
        {action && <ActionIcon action={action} size={60} />}
      </div>
    </div>
  );
};
const ActionButton = ({ action, onActionSelected }) => {
  return (
    <button className="round-btn" onClick={() => onActionSelected(action)}>
      <ActionIcon action={action} size={20} />
    </button>
  );
};

const ShowWinner = ({ winner = 0 }) => {
  const text = {
    "-1": "You Win!",
    0: "It's a Tie",
    1: "You Lose!",
  };
  return <h2>{text[winner]}</h2>;
};

const App = () => {
  const [playerAction, setPlayerAction] = useState("");
  const [computerAction, setComputerAction] = useState("");

  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [winner, setWinner] = useState(0);

  const onActionSelected = (selectedAction) => {
    const newComputerAction = randomAction();

    setPlayerAction(selectedAction);
    setComputerAction(newComputerAction);
    const newWinner = calculateWinner(selectedAction, newComputerAction);
    setWinner(newWinner);

    if (newWinner === -1) {
      setPlayerScore(playerScore + 1);
    } else if (newWinner === 1) {
      setComputerScore(computerScore + 1);
    }
  };

  const reStartGame = () => {
    setPlayerAction("");
    setComputerAction("");
    setPlayerScore(0);
    setComputerScore(0);
    setWinner(0);
  };
  return (
    <div className="container center">
      <div className="nav-bar">
        <h1>Rock Paper Scissors</h1>
      </div>
      <div className="wrapper">
        <div>
          <div className="flex">
            <Player name="Player" score={playerScore} action={playerAction} />
            <Player
              name="Computer"
              score={computerScore}
              action={computerAction}
            />
          </div>
          <div>
            <ActionButton action="rock" onActionSelected={onActionSelected} />
            <ActionButton action="paper" onActionSelected={onActionSelected} />
            <ActionButton
              action="scissors"
              onActionSelected={onActionSelected}
            />
          </div>
        </div>
      </div>
      {<ShowWinner winner={winner} />}

      <div className="restart">
        <button onClick={()=>reStartGame()}>RESTART</button>
      </div>
    </div>
  );
};

export default App;
