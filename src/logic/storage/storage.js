export function saveStorage({ board, turn }) {
  window.localStorage.setItem("board", JSON.stringify(board));
  window.localStorage.setItem("turn", turn);
}

export function resetStorage() {
  window.localStorage.removeItem("board");
  window.localStorage.removeItem("turn");
}
