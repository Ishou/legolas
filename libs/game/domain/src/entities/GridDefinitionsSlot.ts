import { GridDefinition } from './GridDefinition.js';
import { Case } from './Case.js';

export class GridDefinitionsSlot extends Case {
  constructor(public readonly definitions: GridDefinition[]) {
    if (definitions.length === 0) {
      throw new Error('At least one GridDefinition must be specified');
    }

    const coordinates = definitions[0].coordinates;

    if (definitions.some((d) => !coordinates.equals(d.coordinates))) {
      throw new Error('All GridDefinition must have the same coordinates');
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
}
