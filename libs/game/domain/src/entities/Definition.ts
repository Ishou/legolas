import { nanoid } from 'nanoid';

declare const definitionId: unique symbol;
export type DefinitionId = string & { [definitionId]: true };

export class Definition {
  public readonly id: DefinitionId = nanoid();

  constructor(public readonly text: string, public readonly answer: string) {
    if (
      (this.text = text.trim()) === '' ||
      (this.answer = answer.trim()) === ''
    ) {
      throw new Error(
        'The Definition text and answer must a non-empty string.'
      );
    }
  }
}
