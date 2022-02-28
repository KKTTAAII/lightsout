import React from "react";
import "./Cell.css";

const Cell = ({ flipCellsAround, isLit}) => {
  const classes = `Cell ${isLit ? "Cell-lit" : ""}`;
  return <td className={classes} onClick={flipCellsAround} />;
}

export default Cell;
