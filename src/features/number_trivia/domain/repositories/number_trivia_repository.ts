import Failure from '../../../../core/error/failures/failure';
import { NumberTrivia } from '../entities/number_trivia';

export type EitherResponse = Failure | NumberTrivia;

export abstract class NumberTriviaRepository {
  abstract getConcreteNumberTrivia(number: number): EitherResponse;
  abstract getRandomNumber(): EitherResponse;
}
