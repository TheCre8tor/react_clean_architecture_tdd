import { ServerException } from '../../../../core/error/exception';
import { Failure, ServerFailure } from '../../../../core/error/failure';
import { NetworkInfo } from '../../../../core/network/network_info';
import { Either, Left, Right } from '../../../../core/utils/Either';
import { NumberTrivia } from '../../domain/entities/number_trivia';
import { NumberTriviaRepository } from '../../domain/repositories/number_trivia_repository';
import NumberTriviaLocalDataSource from '../datasources/number_trivia_local_datasource';
import NumberTriviaRemoteDataSource from '../datasources/number_trivia_remote_datasource';

class NumberTriviaRepositoryImpl implements NumberTriviaRepository {
  remoteDataSource: NumberTriviaRemoteDataSource;
  localDataSource: NumberTriviaLocalDataSource;
  networkInfo: NetworkInfo;

  constructor(
    remoteDataSource: NumberTriviaRemoteDataSource,
    localDataSource: NumberTriviaLocalDataSource,
    networkInfo: NetworkInfo,
  ) {
    this.remoteDataSource = remoteDataSource;
    this.localDataSource = localDataSource;
    this.networkInfo = networkInfo;
  }

  async getConcreteNumberTrivia(
    number: number,
  ): Promise<Either<Failure, NumberTrivia>> {
    const isOnline: boolean = await this.networkInfo.isConnected();

    if (isOnline) {
      const trivia = await this.remoteDataSource.getConcreteNumberTrivia(
        number,
      );
      return new Right(trivia);
    }

    throw new Error('Method not implemented.');
  }

  async getRandomNumber(): Promise<Either<Failure, NumberTrivia>> {
    throw new Error('Method not implemented.');
  }
}

export default NumberTriviaRepositoryImpl;
