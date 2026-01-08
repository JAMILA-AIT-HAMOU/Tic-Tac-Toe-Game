import { useState } from "react";
import Confetti from "react-confetti"


export default function Board() {
  const [playersArr, setPlayersArr] = useState(Array(9).fill(""));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState({ X: 0, O: 0 });
  const [winnningLine, setWinningLine]=useState([])

  const {innerWidth:width, innerHeight:height}= window;
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function checkWinner(board) {
    for (let line of winningLines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        return {winner:board[a], line};
      }
    }
    return null;
  }

  function checkGameStatus(board) {
    const playerWin = checkWinner(board);
    if (playerWin) {
      return { gameOver: true, winner: playerWin.winner,
        line:playerWin.line,
       };
    }
    if (!board.includes("")) {
      return { gameOver: true, winner: "draw", line:[] };
    }
    return { gameOver: false, winner: null, line:[]};
  }

  function handleBtn(index) {
    if (playersArr[index] !== "" || gameOver) {
      return;
    }

    const newBoard = [...playersArr];

    newBoard[index] = isXTurn ? "X" : "O";

    const status = checkGameStatus(newBoard);

    setPlayersArr(newBoard);
    setGameOver(status.gameOver);
    setWinner(status.winner);
    setWinningLine(status.line)
    

    if (status.gameOver && status.winner !== "draw") {
      setScore((prev) => ({
        ...prev,
        [status.winner]: prev[status.winner] + 1,
      }));
    }

    if (!status.gameOver) {
      setIsXTurn((prev) => !prev);
    }
  }

  const resetGame = () => {
    setPlayersArr(Array(9).fill(""));
    setIsXTurn(true);
    setWinner(null);
    setGameOver(false);
    setWinningLine([])
  };
  const resetScore=()=>{
    setScore({ X: 0, O: 0 })
    resetGame()
  }

  return (
    <section>
      {gameOver && winner && winner !== "draw" && (
        <Confetti 
          width={width}
          height={height}
          numberOfPieces={300}
          recycle={false}
        />
      )}
      <h1>Tic-Tac-Toe Game</h1>

      <div id="status">
        {gameOver ? (
          winner === "draw" ? (
            <p>"Game Ended In A Draw!"</p>
          ) : (
            <p>
              Winner: <span>{winner}</span>!!!!!!!!
            </p>
          )
        ) : (
          <p>
            Next player: <span>{isXTurn ? "X" : "O"}</span>
          </p>
        )}
      </div>

      <div className="scoreboard">
        <p>X:{score.X}</p>
        <p>O:{score.O}</p>
      </div>

      <div className="board">
        {playersArr.map((value, index) => (
          <button
            aria-label={`Square ${index}`}
            className={`square ${winnningLine.includes(index)? "win":""}`}
            key={index}
            onClick={() => {
              handleBtn(index);
            }}
            disabled={gameOver}
          >
            {value}
          </button>
        ))}
      </div>
      <div className="reset">
        <button id="reset-game" className="reset-btn" onClick={resetGame}>
          Reset Game
        </button>
        <button id="reset-score" className="reset-btn" onClick={resetScore}>
          Reset Score
        </button>
      </div>
    </section>
  );
}
