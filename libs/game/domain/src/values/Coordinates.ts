export class Coordinates {
  constructor(public readonly x: number, public readonly y: number) {
    // noop
  }

  static create(x: number, y: number) {
    if (x < 0 || y < 0) {
      throw new Error(`Coordinates(${x}, ${y}) must both be > 0`);
    }

    return new Coordinates(x, y);
  }

  public toString() {
    return `Coordinates(${this.x}, ${this.y})`;
  }

  public equals(other: Coordinates) {
    return this.x === other.x && this.y === other.y;
  }
}
