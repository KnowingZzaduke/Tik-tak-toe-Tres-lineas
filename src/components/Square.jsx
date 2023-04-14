export const Square = ({ children, isSelected, updateBoard, index }) => {
  function handleClick() {
    updateBoard(index);
  }

  return (
    <div
      className={`square ${isSelected ? "is-selected" : " "}`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};
