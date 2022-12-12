export class Node {
  #id: string;
  #value: Record<string, unknown>;
  #adjacent: Node[] = [];

  constructor(value: Record<string, unknown>) {
    this.#id = crypto.randomUUID();
    this.#value = value;
  }

  get id(): string {
    return this.#id;
  }

  get value(): Record<string, unknown> {
    return this.#value;
  }

  set value(value: Record<string, unknown>) {
    this.#value = value;
  }

  addAdjacent(node: Node): void {
    this.#adjacent.push(node);
  }

  get adjacent(): Node[] {
    return this.#adjacent;
  }

  set adjacent(adjacent: Node[]) {
    this.#adjacent = adjacent;
  }

  // no se usara en el proyecto pero como ejemplo de como se puede hacer
  removeAdjacent(node: Node): void {
    const index = this.#adjacent.indexOf(node);
    if (index > -1) {
      this.#adjacent.splice(index, 1);
    }
  }

  isAdjacent(node: Node): boolean {
    return this.#adjacent.indexOf(node) > -1;
  }
}
