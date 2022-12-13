// @ts-ignore
import { Cell } from './Cell.ts';
// @ts-ignore
import { Graph } from './Graph.ts';

interface IPosition {
  x: number;
  y: number;
}

export class Board {
  #board: Graph<Cell>;

  #boardDimension = 0;
  #diagonalPoints: [number, number][] = [];
  #reverseDiagonalPoints: [number, number][] = [];
  #mark = 'X';

  get boardCells() {
    return this.#board.map((cell) => !!cell);
  }

  constructor(size: number) {
    this.#board = new Graph();
    this.initBoard(size);
  }

  get boardDimension(): number {
    return this.#boardDimension;
  }

  #generateReverseDiagonalPoints(x: number, boardDimension: number): number {
    return -x + boardDimension;
  }

  #generateDiagonalPointsDiagonal(x: number): number {
    return x;
  }

  #toggleMark(): void {
    this.#mark = this.#mark === 'X' ? 'O' : 'X';
  }

  #calcDiagonalPoints(
    arr: [number, number][],
    diagonalGenerator: (x: number, dimencion: number) => number
  ): void {
    for (let i = 0; i <= this.#boardDimension; i++) {
      arr.push([i, diagonalGenerator(i, this.#boardDimension)]);
    }
  }

  #createCells(size: number): void {
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        this.#board.addNode(new Cell(x, y));
      }
    }
  }

  #getRowsCoords(): [number, number][] {
    const coords: [number, number][] = [];
    for (let x = 0; x < this.#boardDimension; x++) {
      for (let y = 0; y < this.#boardDimension; y++) {
        coords.push([x, y]);
      }
    }
    return coords;
  }

  #getColumnsCoords(): [number, number][] {
    const coords: [number, number][] = [];
    for (let x = 0; x < this.#boardDimension; x++) {
      for (let y = 0; y < this.#boardDimension; y++) {
        coords.push([y, x]);
      }
    }
    return coords;
  }

  #createEdges(source: IPosition, destination: IPosition): void {
    console.log(source, destination);

    const sourceNode = this.getCell(source);
    const destinationNode = this.getCell(source);

    // this.#board.addEdge(source, destination);
  }

  selectCell({}): void {
    const cell = this.getCell(x, y);

    if (!cell) return;
    cell.select(this.#mark);

    this.#toggleMark();
  }

  initBoard(size: number): void {
    this.#boardDimension = size - 1;
    this.#createCells(size);

    this.#calcDiagonalPoints(
      this.#diagonalPoints,
      this.#generateDiagonalPointsDiagonal
    );

    this.#calcDiagonalPoints(
      this.#reverseDiagonalPoints,
      this.#generateReverseDiagonalPoints
    );
  }

  getCell({ x, y }: IPosition): Cell | undefined {
    return this.#board.find(
      (node) => node.value.x === x && node.value.y === y
    ) as Cell | undefined;
  }
}
