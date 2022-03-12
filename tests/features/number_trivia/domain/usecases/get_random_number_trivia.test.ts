import { NumberTrivia } from '../../../../../src/features/number_trivia/domain/entities/number_trivia';
import {
  GetRandomNumberTrivia,
  NoParams,
} from '../../../../../src/features/number_trivia/domain/usecases/get_random_number_trivia';
import { NumberTriviaRepository } from './../../../../../src/features/number_trivia/domain/repositories/number_trivia_repository';

type MockGetRandomNumberTrivia<T> = { [K in keyof T]: jest.Mock };

const mockGetRandomNumberTrivia: MockGetRandomNumberTrivia<NumberTriviaRepository> =
  { getConcreteNumberTrivia: jest.fn(), getRandomNumber: jest.fn() };

describe('GetRandomNumberTrivia', () => {
  const numberTrivia: NumberTrivia = {
    text: 'This is a test response from Trivia',
    number: 1,
  };

  test('should get trivia from the repository', async () => {
    mockGetRandomNumberTrivia.getRandomNumber.mockReturnValue(numberTrivia);
    const usecase = new GetRandomNumberTrivia(mockGetRandomNumberTrivia);

    const result = await usecase.call(new NoParams());

    expect(result).toBe<NumberTrivia>(numberTrivia);
    expect(mockGetRandomNumberTrivia.getRandomNumber).toBeCalledTimes(1);
    expect(mockGetRandomNumberTrivia.getRandomNumber).toBeCalledWith();
  });
});
