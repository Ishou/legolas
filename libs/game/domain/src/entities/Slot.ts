import { nanoid } from 'nanoid';
import { Case } from './Case.js';

declare const slotId: unique symbol;
export type SlotId = string & { [slotId]: true };

export class Slot extends Case {
  public readonly id: SlotId = nanoid();

  constructor(public letter: string) {
    super();

    if ((this.letter = letter.trim()).length > 1) {
      throw new Error('Slot must be empty or exactly one letter');
    }

    if (!/[A-Z]/.test(this.letter)) {
      throw new Error('Slot must be an uppercase letter');
    }
  }

  public override toString() {
    return `Slot(${this.letter})`;
  }

  public equals(other: Slot) {
    return this.letter === other.letter;
  }

  static create(letter: string) {
    return new Slot(letter);
  }
}
