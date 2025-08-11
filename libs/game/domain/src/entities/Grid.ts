import { nanoid } from 'nanoid';
import { Coordinates } from '../values/Coordinates.js';
import { Slot } from './Slot.js';
import { Case } from './Case.js';
import { GridDefinitionsSlot } from './GridDefinitionsSlot.js';

declare const gridId: unique symbol;
export type GridId = string & { [gridId]: true };

export class Grid {
  public readonly id: GridId = nanoid();

  constructor(
    public readonly width: number,
    public readonly height: number,
    public readonly definitions: GridDefinitionsSlot[]
  ) {
    const grid: (Case | undefined)[][] = new Array(this.width)
      .fill(0)
      .map(() => new Array(this.height).fill(0).map(() => undefined));

    definitions.forEach((definitionSlot) => {
      definitionSlot.definitions.forEach((definition) => {
        const gridDefinitionSlot =
          grid[definitionSlot.coordinates.x][definitionSlot.coordinates.y];
        console.log(gridDefinitionSlot);

        if (gridDefinitionSlot !== undefined) {
          throw new Error(
            `Grid Definition cannot be put in ${definitionSlot.coordinates}, there is ${gridDefinitionSlot} already`
          );
        }

        grid[definitionSlot.coordinates.x][definitionSlot.coordinates.y] =
          definitionSlot;

        definition.definition.answer.split('').forEach((letter, i) => {
          const letterCoordinates = definition.coordinateForIndex(
            definitionSlot.coordinates,
            i
          );
          this._validateCoordinates(letterCoordinates);
          const gridLetter = grid[letterCoordinates.x][letterCoordinates.y];
          const slotLetter = Slot.create(letter);

          if (gridLetter === undefined) {
            grid[letterCoordinates.x][letterCoordinates.y] = slotLetter;
          } else if (
            !(gridLetter instanceof Slot) ||
            !slotLetter.equals(gridLetter)
          ) {
            throw new Error(
              `Incoherence in Grid letters in ${letterCoordinates} => ${gridLetter} !== ${slotLetter}`
            );
          }
        });
      });
    });

    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if (grid[x][y] === undefined) {
          throw new Error(`Grid position (${x}, ${y}) is undefined`);
        }
      }
    }
  }

  private _validateCoordinates(coordinates: Coordinates) {
    if (coordinates.x >= this.width || coordinates.y >= this.height) {
      throw new Error(
        `Coordinates(${coordinates}) must be within than ${this}`
      );
    }
  }

  public toString() {
    return `Grid(${this.width}w${this.height}h)`;
  }
}
