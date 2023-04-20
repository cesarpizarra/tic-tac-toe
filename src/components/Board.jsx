import React, { useState } from "react";

const Square = ({ value, onSquareClick }) => {
  return (
    <button
      className="text-3xl border border-cyan-400 text-white w-full h-[80px]"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
};
const Board = ({ xIsNext, squares, onPlay }) => {
  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  };

  const winner = calculateWinner(squares);
  let status;
  let isTie = !squares.includes(null) && !winner; // Check if all squares are filled and no winner
  if (winner) {
    status = `The winner is: ${winner}`;
  } else if (isTie) {
    status = "It's a tie!";
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div>
      <div className="text-3xl text-center text-white font-bold mb-8">
        {status}
      </div>
      <div className="w-full grid grid-cols-3 grid-rows-3 gap-0">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
};
const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };
  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
  };
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = `Go to move # ${move}`;
    } else {
      description = `Go to game start`;
    }

    return (
      <li key={move}>
        <button
          onClick={() => jumpTo(move)}
          className="w-full border rounded-full px-2 border-cyan-500  mt-2 hover:bg-cyan-600"
        >
          {description}
        </button>
      </li>
    );
  });
  return (
    <div className="w-full h-screen bg-gray-900 px-10 flex justify-center items-center gap-[100px] flex-col overflow-hidden">
      <h1 className="text-white text-5xl font-bold text-center">Tic-tac-toe</h1>
      <div className="flex justify-between items-center gap-10">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        <div>
          <ol className="text-white">{moves}</ol>
        </div>
      </div>
    </div>
  );
};

export default Game;

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};
