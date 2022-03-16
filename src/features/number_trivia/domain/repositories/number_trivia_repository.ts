import { Failure } from '../../../../core/error/failure';
import { Either } from '../../../../core/utils/Either';
import { NumberTrivia } from '../entities/number_trivia';

export abstract class NumberTriviaRepository {
  abstract getConcreteNumberTrivia(
    number: number,
  ): Promise<Either<Failure, NumberTrivia>>;
  abstract getRandomNumber(): Promise<Either<Failure, NumberTrivia>>;
}
