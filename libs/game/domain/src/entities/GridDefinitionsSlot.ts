import { GridDefinition } from './GridDefinition.js';
import { Case } from './Case.js';
import { Coordinates } from '../values/Coordinates.js';

export class GridDefinitionsSlot extends Case {
  constructor(
    public readonly definitions: GridDefinition[],
    public readonly coordinates: Coordinates
  ) {
    super();

    if (definitions.length === 0) {
      throw new Error('At least one GridDefinition must be specified');
    }

    definitions.forEach((d) => {
      if (
        definitions.findIndex(
          (other) => other !== d && other.orientation === d.orientation
        ) !== -1
      ) {
        throw new Error('Each GridDefinition must have a unique orientation');
      }
    });
  }

  public override toString() {
    return `GridDefinitionsSlot(${this.coordinates}, ${this.definitions})`;
  }
}
