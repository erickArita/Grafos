import { Board } from "../entities/Board.ts";

export class XOController extends Board {
  #mark = "X";
  #turn = 0;
  #won = false;

  get won(): boolean {
    return this.#won;
  }

  constructor(size: number) {
    super(size);
  }

  #validateEqualPoints(
    points: string[],
    axisIndex: number
  ): undefined | [number, number][] {
    const [x, y] = points[0];
    const firstPointValue = this.board[x][y];

    const line: [number, number][] = [];
    const areEqual = points.some((point, i) => {
      const [x, y] = point;
      const boardPoint = this.#board[x][y];
      if (boardPoint === "-") return false;
      if (firstPointValue !== boardPoint) return false;
      line.push([axisIndex, i]);
      return true;
    });

    if (!areEqual) return undefined;
    return line;
  }

  #validateRows(): undefined | string[] {
    return this.#board.find((row, i) => this.#validateEqualPoints(row, i));
  }

  #validateColumns(): undefined | string[] {
    for (let i = 0; i < this.#boardDimension; i++) {
      const columnValues = this.#board.map((row) => row[i]);
      if (this.#validateEqualPoints(columnValues, i)) return columnValues;
    }

    return undefined;
  }

  #validateDiagonals(): undefined | string[] {
    const diagonalValues = this.#diagonalPoints.map(
      (coords) => this.#board[coords[0]][coords[1]]
    );
    const reverseDiagonalValues = this.#reverseDiagonalPoints.map(
      (coords) => this.#board[coords[0]][coords[1]]
    );

    // if (this.#validateEqualPoints(diagonalValues)) return diagonalValues;
    // if (this.#validateEqualPoints(reverseDiagonalValues))
    return reverseDiagonalValues;
    return undefined;
  }

  #validateIfWin(): undefined | string[] {
    const rows = this.#validateRows();
    const columns = this.#validateColumns();
    const diagonals = this.#validateDiagonals();

    if (rows || columns || diagonals) this.#won = true;

    return rows || columns || diagonals;
  }

  #selectPoint(x: number, y: number) {
    if (this.#board[x][y] !== "-") throw new Error("Point already selected");
    this.#board[x][y] = this.#mark;
  }

  onSelectPoint(x: number, y: number) {
    this.#selectPoint(x, y);
    this.#turn++;

    const winLine = this.#validateIfWin();
    if (winLine) this.#toggleMark();
  }

  #toggleMark() {
    this.#mark = this.#mark === "X" ? "O" : "X";
  }

  get playerTurn(): string {
    return this.#mark;
  }

  get turn() {
    return this.#turn;
  }
}
