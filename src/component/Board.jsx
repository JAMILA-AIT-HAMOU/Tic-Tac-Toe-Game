

import { useState } from "react"
export default function Board() {
  const [playersArr, setPlayersArr]=useState(Array(9).fill(""))
  const [isXTurn, setIsXTurn]=useState(true)
  const [winner, setWinner]=useState(null)
  const [gameOver, setGameOver]=useState(false)

  const winingLines=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  
  function checkWinner(board){
    for(let line of winingLines){
      const [a, b, c]=line
      if (board[a] && board[a]===board[b] && board[b]===board[c]){
        return board[a]
      }
    }
    return null
  }

  function checkGameStatus(board){
    const playerWin = checkWinner(board)
    if(playerWin){
      return {gameOver:true, winner:playerWin}
    }
    if(!board.includes("")){
      return { gameOver:true, winner:"draw"}
    }
    return {gameOver:false, winner:null}

  }



  function handleBtn(index){
    if (playersArr[index]!=="" || gameOver) {
      return
    }
    
    const newBoard=[...playersArr];
    
    newBoard[index]=isXTurn ? "X" : "O"; 

    const status=checkGameStatus(newBoard)
     console.log("Game status:", status); // Debug log

    setPlayersArr(newBoard);
    setGameOver(status.gameOver)
    setWinner(status.winner)

    if(!status.gameOver){
      
    setIsXTurn(prev=>!prev)
    }
  }

  const resetGame=()=>{
    setPlayersArr(Array(9).fill(""))
    setIsXTurn(true)
    setWinner(null)
    setGameOver(false)
  }

  

  return (
  <section>
    <h1>Tic-Tac-Toe Game</h1>

    
    <div id="status">
      {gameOver 
        ? (winner === "draw"
          ? "Draw"
          :<p>Winner: <span>{winner}</span></p>)
        :(<p>Next player: <span>{isXTurn ? "X" : "O"}</span></p>)
      }
    </div>

    <div className="board"> 
     {playersArr.map((value,index)=>(
               <button className="square" key={index} onClick={()=>{handleBtn(index)}} disabled={gameOver} >{value}</button>
     ))}
    </div>
    <button id="reset" className="reset-btn" onClick={resetGame}>Reset Game</button>
  </section>
  )

}
