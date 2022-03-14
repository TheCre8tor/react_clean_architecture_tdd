import { Failure } from '../../../../core/error/failure';
import { UseCase } from '../../../../core/usecases/usecase';
import { Either } from '../../../../core/utils/Either';
import { NumberTrivia } from '../entities/number_trivia';
import { NumberTriviaRepository } from '../repositories/number_trivia_repository';

export class GetRandomNumberTrivia implements UseCase<NumberTrivia, NoParams> {
  repository: NumberTriviaRepository;

  constructor(repository: NumberTriviaRepository) {
    this.repository = repository;
  }

  async call(params: NoParams): Promise<Either<Failure, NumberTrivia>> {
    return await this.repository.getRandomNumber();
  }
}

export class NoParams {}
