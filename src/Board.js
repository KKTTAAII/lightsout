import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

const Board = ({ nrows, ncols, chanceLightStartsOn }) => {
  const createBoard = () => {
    let initialBoard = Array.from(Array(nrows), () => new Array(ncols));
    for (let i = 0; i < nrows; i++) {
      for (let j = 0; j < ncols; j++) {
        initialBoard[i][j] = Boolean(Math.random() < chanceLightStartsOn);
      }
    }
    return initialBoard;
  }

  const [board, setBoard] = useState(createBoard());

  const hasWon = () => {
    return board.every(grid => grid.every(cell => cell === false));
  }

  const flipCellsAround = (coord) => {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);
      const flipCell = (y, x, boardCopy) => {
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };
      const copyOfOldBoard = JSON.parse(JSON.stringify(oldBoard));
      flipCell(y, x, copyOfOldBoard);
      flipCell(y + 1, x, copyOfOldBoard); 
      flipCell(y, x + 1, copyOfOldBoard);
      flipCell(y, x - 1, copyOfOldBoard);
      flipCell(y - 1, x, copyOfOldBoard);
      return copyOfOldBoard;
    });
  }

  return (
    <div className="Board">
      {hasWon() ? (
        <div className="Board-win">You won!</div>
      ) : (
        <table className="Board-table">
          <tbody>
            {board.map((grid, y) => (
              <tr key={y}>
                {grid.map((cell, x) => (
                  <Cell
                    key={x}
                    isLit={cell}
                    flipCellsAround={() => flipCellsAround(`${y}-${x}`)}
                  ></Cell>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

Board.defaultProps = {
  nrows: 3,
  ncols: 3,
  chanceLightStartsOn: 0.5
}

export default Board;
