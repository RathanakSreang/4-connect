import {useState} from "react";

import './App.scss';
const RED = 1;
const YELLO = 2;

function Player({name, color}) {
  return(
    <div className="player">
      {
        color === "red" &&
        <div className={`${color} dot`} />
      }
      <div className="name">{name}</div>
      {
        color === "yellow" &&
        <div className={`${color} dot`} />
      }
    </div>
  );
}

function Dot({state, row, col, onClick}) {
  let cssClass = "board-dot";
  console.log(state);
  if (state === RED) {
    cssClass += " red";
  } else if (state === YELLO) {
    cssClass += " yello";
  }
  return(
    <div className={cssClass}
      onClick={() => onClick(row, col)}></div>
  );
}

function App() {
  const [turn, setTurn] = useState(RED);
  const [board, setBoard] = useState([[0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0]]);

  const onClick = (row, col) => {
    for(let i = 5; i >= 0; i--) {
      if(board[i][col] > 0) {
        continue;
      }

      board[i][col] = turn;
      break;
    }

    setTurn(turn === RED ? YELLO : RED);
    setBoard([...board])
    checkBoard();
  }

  const checkBoard = () => {
    let count = 0;
    for(let row = 0; row <= 3; row++) {
      for(let col = 0; col <= 4; col ++) {
        count = 0;
        const result = board[row][col];
        if(result === 0) {
          continue;
        }

        // check row
        for(let k= 0; k < 4; k ++) {
          if(result === board[row + k][col]) {
            count++;
          }
        }
        if(count === 4) {
          break;
        }
        count = 0;
        // check column
        for(let k= 0; k < 4; k ++) {
          if(result === board[row][col + k]) {
            count++;
          }
        }
        if(count === 4) {
          break;
        }
        //
        // check cross

      }
    }
    if(count === 4) {
      console.log('Winner')
    }
  }

  return (
    <div className="game">
      <div className="board">
        {
          board.map((row, r) => (
            row.map((col, c) => <Dot onClick={onClick} state={board[r][c]} row={r} col={c} key={c}/>))
          )
        }
      </div>
      <div className="players-container">
        <Player name="Player 1" myTurn={turn === RED} color="red"/>
        <div className="result"/>
        <Player name="Player 2" myTurn={turn === YELLO} color="yellow"/>
      </div>
    </div>
  );
}

export default App;
