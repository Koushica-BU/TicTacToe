import React, { useState } from 'react';
import './TicTacToe.css';

function Square ({value, onSquareClick}) {
    return (
        <div className="boxes" onClick={onSquareClick}>
            {value &&<span className={value === 'X' ? "xclass" : "oclass"}> {value} </span>}
        </div>
    )
}

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
}

function Board({isXTurn, squares, onPlay}){
    function handleClick(i){
        if (squares[i] || calculateWinner(squares)) {
          return;
        }
        let newSquares = squares.slice();
        newSquares[i] = (isXTurn ? 'X' : 'O');
        onPlay(newSquares);
    }

    return (
        <div className="container">
            <div className="board">
                <div className="row1">
                    <Square value={squares[0]} onSquareClick={()=>handleClick(0)}/>
                    <Square value={squares[1]} onSquareClick={()=>handleClick(1)}/>
                    <Square value={squares[2]} onSquareClick={()=>handleClick(2)}/>
                </div>
                <div className="row2">
                    <Square value={squares[3]} onSquareClick={()=>handleClick(3)}/>
                    <Square value={squares[4]} onSquareClick={()=>handleClick(4)}/>
                    <Square value={squares[5]} onSquareClick={()=>handleClick(5)}/>
                </div>
                <div className="row3">
                    <Square value={squares[6]} onSquareClick={()=>handleClick(6)}/>
                    <Square value={squares[7]} onSquareClick={()=>handleClick(7)}/>
                    <Square value={squares[8]} onSquareClick={()=>handleClick(8)}/>
                </div>
            </div>
        </div>
    )
}

const TicTacToe = () => {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [isOverlay,setisOverlay] = useState(true);
    const [currentMove, setCurrentMove] = useState(0);
    const [isHistory, setShowHistory] = useState(false);
    const xIsNext = currentMove % 2 === 0;
    let currentSquares = history[currentMove];

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function onReset(){
        setHistory([Array(9).fill(null)]);
        currentSquares = history[currentMove];
        setCurrentMove(0);
        setisOverlay(true);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    const winner = calculateWinner(currentSquares);

    const moves = history.map((squares, move) => {
        let description;
        if (move > 1) {
          description = 'Go to move #' + (move-1);
        } else {
          description = 'Go to game start';
        }
        return (
          <li key={move} onClick={() => jumpTo(move)}> {description} </li>
        );
    });

    return (
        <>
            {
            ( winner && isOverlay) && (<div className="overlay" onClick={()=>setisOverlay(!isOverlay)}>
                                                    <div className="overlay_text">Winner is {winner}</div>
                                                </div>)
            }
            <div className="game">
                <h1 className="title">Tic Tac Toe Game</h1>
                <div className="game-board">
                    <Board isXTurn={xIsNext} squares={currentSquares} onPlay={handlePlay} />
                    {isHistory && (<div className="game-info">
                                        <ol>{moves}</ol>
                                    </div>)}
                </div>
                <div className="buttons">
                    <button className="reset" onClick={onReset}>Reset</button>
                    {/* <button className="reset" onClick={()=>setShowHistory(!isHistory)}>Moves</button> */}
                </div>
            </div>
        </>
    );
}

export default TicTacToe