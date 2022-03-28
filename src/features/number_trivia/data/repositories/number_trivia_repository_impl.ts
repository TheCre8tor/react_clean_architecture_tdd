import {
  CacheException,
  ServerException,
} from '../../../../core/error/exception';
import { Failure } from '../../../../core/error/failure';
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
      try {
        const remoteTrivia =
          await this.remoteDataSource.getConcreteNumberTrivia(number);

        this.localDataSource.cacheNumberTrivia(remoteTrivia);

        return new Right(remoteTrivia);
      } catch (err) {
        return new Left(new ServerException());
      }
    } else {
      try {
        const localTrivia = await this.localDataSource.getLastNumberTrivia();
        return new Right(localTrivia);
      } catch (err) {
        console.log('');
      }
    }

    // throw new Error('Method not implemented.');
    return new Left('');
  }

  async getRandomNumber(): Promise<Either<Failure, NumberTrivia>> {
    throw new Error('Method not implemented.');
  }
}

export default NumberTriviaRepositoryImpl;
