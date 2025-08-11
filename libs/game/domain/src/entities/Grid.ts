import { nanoid } from 'nanoid';
import { Coordinates } from '../values/Coordinates.js';
import { GridDefinition } from './GridDefinition.js';
import { Slot } from './Slot.js';

declare const gridId: unique symbol;
export type GridId = string & { [gridId]: true };

export class Grid {
  public readonly id: GridId = nanoid();

  constructor(
    public readonly width: number,
    public readonly height: number,
    public readonly definitions: GridDefinition[]
  ) {
    const grid: (Slot | undefined)[][] = new Array(this.width)
      .fill(0)
      .map(() => new Array(this.height).fill(undefined));

    definitions.forEach((definition) => {
      definition.definition.answer.split('').forEach((letter, i) => {
        const letterCoordinates = definition.coordinateForIndex(i);
        const gridLetter = grid[letterCoordinates.x][letterCoordinates.y];
        const slotLetter = Slot.create(letter);

        if (gridLetter === undefined) {
          grid[letterCoordinates.x][letterCoordinates.y] = slotLetter;
        } else if (!slotLetter.equals(gridLetter)) {
          throw new Error(
            `Incoherence in Grid letters in ${letterCoordinates} => ${gridLetter} !== ${slotLetter}`
          );
        }
      });
    });

    // TODO
    // ici lettres cohérentes ==> reste à vérifier s'il y a pas de trou dans la grille
    // vérifier s'il y'a pas une lettre sur une définition aussi !
    // pas même coordinates pour =/= GridDefinitionsSlot
  }

  private _validateCoordinates(coordinates: Coordinates) {
    if (coordinates.x >= this.width || coordinates.y >= this.height) {
      throw new Error(
        `Coordinates(${coordinates}) must be greater than ${this}`
      );
    }
  }

  public toString() {
    return `Grid(${this.width}w${this.height}h)`;
  }
}
