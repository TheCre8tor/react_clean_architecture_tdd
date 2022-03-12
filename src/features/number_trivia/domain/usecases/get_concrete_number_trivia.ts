import { UseCase } from './../../../../core/usecases/usecase';
import { NumberTrivia } from '../entities/number_trivia';
import {
  EitherResponse,
  NumberTriviaRepository,
} from '../repositories/number_trivia_repository';

export class GetConcreteNumberTrivia implements UseCase<NumberTrivia, Params> {
  private repository: NumberTriviaRepository;

  constructor(repository: NumberTriviaRepository) {
    this.repository = repository;
  }

  async call(params: Params): Promise<EitherResponse> {
    return await this.repository.getConcreteNumberTrivia(params.number);
  }
}

export class Params {
  number: number;

  constructor(number: number) {
    this.number = number;
  }
}
