import { NumberTriviaModel } from '../models/number_trivia_model';

abstract class NumberTriviaLocalDataSource {
  /**
   * Gets the cache @constructor { NumberTriviaModel } which was gotten the last time
   * the user had an internet connection.
   *
   * @throws { CacheException } if no cached data is presented
   */
  abstract getLastNumberTrivia(): Promise<NumberTriviaModel>;
  abstract cacheNumberTrivia(trivia: NumberTriviaModel): void;
}
