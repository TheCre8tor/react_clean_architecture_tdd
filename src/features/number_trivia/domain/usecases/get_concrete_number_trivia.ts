import { Failure } from '../../../../core/error/failure';
import { NumberTrivia } from '../entities/number_trivia';
import {
  EitherResponse,
  NumberTriviaRepository,
} from '../repositories/number_trivia_repository';

type UseCaseType<T> = Failure | T;

abstract class UseCase<T, P> {
  abstract call(params: P): UseCaseType<T>;
}

export class GetConcreteNumberTrivia extends UseCase<NumberTrivia, Params> {
  private repository: NumberTriviaRepository;

  constructor(repository: NumberTriviaRepository) {
    super();
    this.repository = repository;
  }

  async call(params: Params): Promise<EitherResponse> {
    return await this.repository.getConcreteNumberTrivia(params.number);
  }
}

export interface Params {
  number: number;
}
