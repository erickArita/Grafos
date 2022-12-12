import { Node } from "./Node.ts";

interface ICellProps {
  x: number;
  y: number;
  value: string;
}

export class Cell extends Node {
  get values(): ICellProps {
    return super.value as unknown as ICellProps;
  }

  set values(value: ICellProps) {
    super.value = value as unknown as Record<string, unknown>;
  }

  constructor(x: number, y: number, value: string = "-") {
    super({ x, y, value });
  }

  select(mark: string): void {
    this.value = { ...this.values, value: mark };
  }

  get x(): number {
    return this.values.x;
  }

  get y(): number {
    return this.values.y;
  }
}
