// @ts-ignore
import { Board } from './entities/Board.ts';

const board = new Board(3);

board.getCell({ x: 0, y: 0 })?.select('X');
board.getCell({ x: 1, y: 1 })?.select('X');

const cell = board.getCell(0, 0);
console.log(cell?.value);

console.log(board.boardCells.map((cell) => cell.value.value));
