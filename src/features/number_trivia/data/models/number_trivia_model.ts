import { Collection } from 'immutable';
import { NumberTrivia } from './../../domain/entities/number_trivia';

export class NumberTriviaModel extends NumberTrivia {
  text: string;
  number: number;

  constructor(text: string, number: number) {
    super(text, number);
    this.text = text;
    this.number = number;
  }

  static fromJson(json: Collection<unknown, unknown>) {
    return new NumberTriviaModel(
      json.get('text') as string,
      json.get('number') as number,
    );
  }

  toJson() {
    return { text: this.text, number: this.number };
  }
}
