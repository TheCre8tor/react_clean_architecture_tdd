import { NumberTriviaModel } from '../models/number_trivia_model';

abstract class NumberTriviaRemoteDataSource {
  /**
   * Calls the http://numberapi.com/{number} endpoints.
   *
   * @throws {ServerException} for all error codes.
   */
  abstract getConcreteNumberTrivia(number: number): Promise<NumberTriviaModel>;

  /**
   * Calls the http://numberapi.com/random endpoint.
   *
   * @throws a [ServerException] for all error codes.
   */
  abstract getRandomNumberTrivia(): Promise<void>;
}

export default NumberTriviaRemoteDataSource;
