import {COMBOS} from '../constants';
export function win(newBoard) {
  for (const combo of COMBOS) {
    const [a, b, c] = combo;
    if (
      newBoard[a] &&
      newBoard[a] === newBoard[b] &&
      newBoard[a] === newBoard[c]
    ) {
      return newBoard[a];
    }
  }
  // si no hay ganador
  return null;
}

export function empate(newBoard) {
  return newBoard.every((square) => square !== null);
}

