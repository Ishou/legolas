import { nanoid } from 'nanoid';

import { nanoid } from 'nanoid';
import { Case } from './Case.js';
import { Scope } from 'eslint';
import Definition = Scope.Definition;
import { GridCoordinates } from '../values/Coordinates.js';

declare const gameId: unique symbol;
export type GameId = string & { [gameId]: true };

export class Game {
  public readonly id: GameId = nanoid();
  private readonly grid: readonly Case[][];

  private constructor() {
    // noop
  }

  public static Builder = class {
    addDefinition(definition: Definition, coordinates: GridCoordinates) {}
  };
}
