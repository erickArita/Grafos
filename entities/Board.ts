import { Cell } from "./Cell.ts";
import { Graph } from "./Graph.ts";

export class Board {
  #board: Graph<Cell>;

  #boardDimension = 0;
  #diagonalPoints: [number, number][] = [];
  #reverseDiagonalPoints: [number, number][] = [];
  #mark = "X";

  get boardCells() {
    return this.#board.map((cell) => cell);
  }

  constructor(size: number) {
    this.#board = new Graph();
    this.initBoard(size);
    console.log(this.#board.nodes);
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
    this.#mark = this.#mark === "X" ? "O" : "X";
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

  #createEdges(coords: [number, number][]): void {
    coords.forEach(([x, y]) => {
      const node = this.#board.find(node=> node.value.x === x && node.value.y === y) as Cell | undefined;

      this.#board.addEdge(x, y);
    });
  }

  selectCell(x: number, y: number): void {
    const cell = this.#board.find(
      (node) => node.value.x === x && node.value.y === y
    ) as Cell | undefined;

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

  getCell(x: number, y: number): Cell | undefined {
    return this.#board.find(
      (node) => node.value.x === x && node.value.y === y
    ) as Cell | undefined;
  }
}
