import { Definition } from './Definition.js';
import { Coordinates } from '../values/Coordinates.js';

export enum Orientation {
  BOTTOM,
  RIGHT,
  TOP_RIGHT,
  BOTTOM_RIGHT,
}

export class GridDefinition {
  constructor(
    public readonly definition: Definition,
    public readonly orientation: Orientation
  ) {}

  public coordinateForIndex(coordinates: Coordinates, i: number) {
    let xDelta = 0;
    let xFactor = 0;
    let yDelta = 0;
    let yFactor = 0;

    switch (this.orientation) {
      case Orientation.BOTTOM_RIGHT:
        xFactor = 1;
        yDelta = 1;
        break;

      case Orientation.BOTTOM:
        yDelta = 1;
        yFactor = 1;
        break;

      case Orientation.TOP_RIGHT:
        yDelta = -1;
        xFactor = 1;
        break;

      case Orientation.RIGHT:
        xDelta = 1;
        xFactor = 1;
        break;
    }

    const x = coordinates.x + xDelta + xFactor * i;
    const y = coordinates.y + yDelta + yFactor * i;

    return Coordinates.create(x, y);
  }
}
