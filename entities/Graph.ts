import { GraphTypes } from '../enums/GraphTypes.ts';
import { Node } from './Node.ts';

export class Graph<T> {
  nodes: { [key: string]: Node };
  edgeDirection: GraphTypes;

  constructor(edgeDirection = GraphTypes.UNDIRECTED) {
    this.nodes = {};
    this.edgeDirection = edgeDirection;
  }

  #createNode(value: Record<string, unknown>): Node {
    return new Node(value);
  }

  addNode(value: Node | Record<string, unknown>) {
    if (value instanceof Node && this.nodes[value.id]) {
      return value;
    }

    const newNode =
      value instanceof Node
        ? value
        : this.#createNode(value as Record<string, unknown>);

    this.nodes[newNode.id] = newNode;

    return newNode;
  }

  addEdge(source: Node, destination: Node): void {
    const sourceNode = this.addNode(source);
    const destinationNode = this.addNode(destination);

    sourceNode.addAdjacent(destinationNode);

    if (this.edgeDirection === GraphTypes.UNDIRECTED) {
      destinationNode.addAdjacent(sourceNode);
    }
  }

  #removeNode(node: Node): void {
    const currentNode = this.nodes[node.id];
    if (currentNode) {
      for (const node of Object.values(this.nodes)) {
        node.removeAdjacent(currentNode);
      }
      // deno-lint-ignore ban-ts-comment
      // @ts-ignore
      this.nodes[currentNode.id] = null;
    }
  }

  removeEdge(source: Node, destination: Node): void {
    const sourceNode = this.nodes[source.id];
    const destinationNode = this.nodes[destination.id];

    if (sourceNode && destinationNode) {
      sourceNode.removeAdjacent(destinationNode);

      if (this.edgeDirection === GraphTypes.UNDIRECTED) {
        destinationNode.removeAdjacent(sourceNode);
      }
    }
  }

  getNode({ x, y }: { x: number; y: number }): Node | T {
    const node = Object.values(this.nodes).find(
      (node) => node.value.x === x && node.value.y === y
    ) as Node;

    return node;
  }

  map(callback: (node: T) => boolean): T[] {
    const result: T[] = [];

    for (const node of Object.values(this.nodes)) {
      if (callback(node as unknown as T)) {
        result.push(node as unknown as T);
      }
    }
    return result;
  }

  find(callback: (node: Node) => boolean): T | undefined {
    for (const node of Object.values(this.nodes)) {
      if (callback(node as unknown as Node)) {
        return node as any;
      }
    }
  }
}
