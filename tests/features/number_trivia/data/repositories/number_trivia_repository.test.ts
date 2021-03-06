import NumberTriviaLocalDataSource from './../../../../../src/features/number_trivia/data/datasources/number_trivia_local_datasource';
import NumberTriviaRemoteDataSource from './../../../../../src/features/number_trivia/data/datasources/number_trivia_remote_datasource';
import { NetworkInfo } from './../../../../../src/core/network/network_info';
import NumberTriviaRepositoryImpl from './../../../../../src/features/number_trivia/data/repositories/number_trivia_repository_impl';
import { NumberTriviaModel } from '../../../../../src/features/number_trivia/data/models/number_trivia_model';
import { NumberTrivia } from '../../../../../src/features/number_trivia/domain/entities/number_trivia';
import { Left, Right } from '../../../../../src/core/utils/Either';
import {
  CacheException,
  ServerException,
} from '../../../../../src/core/error/exception';

type Mock<T> = { [P in keyof T]: jest.Mock };

const mockRemoteDataSource: Mock<NumberTriviaRemoteDataSource> = {
  getConcreteNumberTrivia: jest.fn(),
  getRandomNumberTrivia: jest.fn(),
};

const mockLocalDataSource: Mock<NumberTriviaLocalDataSource> = {
  getLastNumberTrivia: jest.fn(),
  cacheNumberTrivia: jest.fn(),
};

const mockNetworkInfo: Mock<NetworkInfo> = {
  isConnected: jest.fn(),
};

describe('getConcreteNumberTrivia', () => {
  let repository: NumberTriviaRepositoryImpl;

  const testNumber = 1;
  const testNumberTriviaModel = new NumberTriviaModel(
    'This is a test response from Trivia',
    testNumber,
  );
  const testNumberTrivia: NumberTrivia = testNumberTriviaModel;

  beforeEach(() => {
    repository = new NumberTriviaRepositoryImpl(
      mockRemoteDataSource,
      mockLocalDataSource,
      mockNetworkInfo,
    );
  });

  afterEach(() => {
    mockRemoteDataSource.getConcreteNumberTrivia.mockClear();
    mockLocalDataSource.cacheNumberTrivia.mockClear();
    mockLocalDataSource.getLastNumberTrivia.mockClear();
    mockNetworkInfo.isConnected.mockClear();
  });

  test('should check if the device is online.', () => {
    // Arrange
    mockRemoteDataSource.getConcreteNumberTrivia.mockReturnValue(
      testNumberTriviaModel,
    );
    mockLocalDataSource.cacheNumberTrivia.mockReturnValue(Promise.resolve());
    mockNetworkInfo.isConnected.mockReturnValue(true);

    // Act;
    repository.getConcreteNumberTrivia(testNumber);

    // Assert
    expect(mockNetworkInfo.isConnected).toBeCalledTimes(1);
  });

  describe('device is online', () => {
    test('should return remote data when the call to remote data source is successful', async () => {
      mockRemoteDataSource.getConcreteNumberTrivia.mockReturnValue(
        testNumberTriviaModel,
      );
      mockLocalDataSource.cacheNumberTrivia.mockReturnValue(Promise.resolve());
      mockNetworkInfo.isConnected.mockReturnValue(true);

      // Act
      const result = await repository.getConcreteNumberTrivia(testNumber);

      expect(mockRemoteDataSource.getConcreteNumberTrivia).toBeCalledWith(1);
      expect(result).toStrictEqual(new Right(testNumberTrivia));
    });

    test('should cache the data locally when the call to remote data source is successful', async () => {
      mockRemoteDataSource.getConcreteNumberTrivia.mockReturnValue(
        testNumberTriviaModel,
      );
      mockLocalDataSource.cacheNumberTrivia.mockReturnValue(Promise.resolve());
      mockNetworkInfo.isConnected.mockReturnValue(true);

      await repository.getConcreteNumberTrivia(testNumber);

      expect(mockRemoteDataSource.getConcreteNumberTrivia).toBeCalledWith(1);
      expect(mockLocalDataSource.cacheNumberTrivia).toBeCalledWith(
        testNumberTriviaModel,
      );
    });

    test('should return server failure when the call to remote data source is unsuccessful', async () => {
      mockNetworkInfo.isConnected.mockReturnValue(true);
      mockRemoteDataSource.getConcreteNumberTrivia.mockRejectedValue(
        new ServerException(),
      );
      mockLocalDataSource.cacheNumberTrivia.mockReturnValue(Promise.resolve());

      const result = await repository.getConcreteNumberTrivia(testNumber);

      expect(result).toStrictEqual(new Left(new ServerException()));
    });
  });

  describe('device is offline', () => {
    beforeEach(() => {
      mockNetworkInfo.isConnected.mockReturnValue(false);
    });

    test('should return last locally cached data when the cached data is present', async () => {
      mockRemoteDataSource.getConcreteNumberTrivia.mockRejectedValue(
        new ServerException(),
      );
      mockLocalDataSource.getLastNumberTrivia.mockReturnValue(
        testNumberTriviaModel,
      );

      const result = await repository.getConcreteNumberTrivia(testNumber);

      expect(mockRemoteDataSource.getConcreteNumberTrivia).toBeCalledTimes(0);
      expect(mockLocalDataSource.getLastNumberTrivia).toBeCalledTimes(1);
      expect(result).toStrictEqual(new Right(testNumberTrivia));
    });

    test('should return CacheFailure when there is no cached data present', async () => {
      mockRemoteDataSource.getConcreteNumberTrivia.mockRejectedValue(
        new ServerException(),
      );

      mockLocalDataSource.getLastNumberTrivia.mockRejectedValue(
        new CacheException(),
      );

      // const result = await repository.getConcreteNumberTrivia(testNumber);

      // console.log(result);

      // expect(result).toStrictEqual(new Left(new CacheFailure()));
    });
  });
});
