import { UseCase } from './../../../../core/usecases/usecase';
import { NumberTrivia } from '../entities/number_trivia';
import { NumberTriviaRepository } from '../repositories/number_trivia_repository';
import { Either } from '../../../../core/utils/Either';
import { Failure } from '../../../../core/error/failure';

export class GetConcreteNumberTrivia implements UseCase<NumberTrivia, Params> {
  private repository: NumberTriviaRepository;

  constructor(repository: NumberTriviaRepository) {
    this.repository = repository;
  }

  async call(params: Params): Promise<Either<Failure, NumberTrivia>> {
    return await this.repository.getConcreteNumberTrivia(params.number);
  }
}

export class Params {
  number: number;

  constructor(number: number) {
    this.number = number;
  }
}
