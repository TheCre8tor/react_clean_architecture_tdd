import { UseCase } from '../../../../core/usecases/usecase';
import { NumberTrivia } from '../entities/number_trivia';
import {
  EitherResponse,
  NumberTriviaRepository,
} from '../repositories/number_trivia_repository';

export class GetRandomNumberTrivia implements UseCase<NumberTrivia, NoParams> {
  repository: NumberTriviaRepository;

  constructor(repository: NumberTriviaRepository) {
    this.repository = repository;
  }

  async call(params: NoParams): Promise<EitherResponse> {
    return await this.repository.getRandomNumber();
  }
}

export class NoParams {}
