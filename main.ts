import { Board } from "./entities/Board.ts";

const board = new Board(4);


console.log(board.boardCells.map((cell) => cell.value.value));

board.getCell(0, 0)?.select("X");
board.getCell(1, 1)?.select("X");
console.log(board.boardCells.map((cell) => cell.value.value));