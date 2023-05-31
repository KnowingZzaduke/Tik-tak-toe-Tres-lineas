import { useEffect, useState } from "react";
import { win, empate } from "./logic/board";
import { TURNS } from "./constants.js";
import { Square } from "./components/Square";
import { Modal } from "./components/Modal";
import confetti from 'canvas-confetti';
import { saveStorage, resetStorage } from "./logic/storage/storage";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.x);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const boardFromStorage = window.localStorage.getItem('board');
    const turnFromStorage = window.localStorage.getItem('turn');
    const parsedBoard = JSON.parse(boardFromStorage);
    if(parsedBoard && turnFromStorage){
      setBoard(parsedBoard);
      setTurn(turnFromStorage);
    } 
  }, [])

  function reset() {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.x);
    setWinner(null);
    resetStorage();
  }

  function updateBoard(index) {
    // no actualizamos esta posición
    // si ya tiene algo o si alguién ganó
    if (board[index] || winner) return;
    // actualizar el tablero
    const newBoard = [...board];
    newBoard[index] = turn ;
    setBoard(newBoard);
    // cambiar el turno
    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x;
    setTurn(newTurn);
    // revisar si hay ganador
    const newWinner = win(newBoard);
    saveStorage({
      board: newBoard,
      turn: newTurn
    })
    if (newWinner) {
      confetti();
      setWinner(newWinner);
      
    }else if(empate(newBoard)){
      setWinner(false);
    }
  } 
  
  return (
    <main className="board">
      <h1>Tik Tac Toe</h1>
      <button onClick={reset}>Reiniciar Juego</button>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.x}>{TURNS.x}</Square>
        <Square isSelected={turn === TURNS.o}>{TURNS.o}</Square>
      </section>
      <Modal winner={winner} reset={reset} />
    </main>
  );
}

export default App;
