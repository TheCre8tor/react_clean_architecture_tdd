import { NumberTrivia } from './../../../../../src/features/number_trivia/domain/entities/number_trivia';
import { NumberTriviaRepository } from './../../../../../src/features/number_trivia/domain/repositories/number_trivia_repository';
import {
  GetConcreteNumberTrivia,
  Params,
} from './../../../../../src/features/number_trivia/domain/usecases/get_concrete_number_trivia';

type MockNumberTriviaRepository<T> = { [K in keyof T]: jest.Mock<any, any> };
let mockTriviaRepository: MockNumberTriviaRepository<NumberTriviaRepository> = {
  getConcreteNumberTrivia: jest.fn(),
  getRandomNumber: jest.fn(),
};

describe('GetConcreteNumberTrivia', () => {
  const testNumber = 1;
  const params: Params = { number: 1 };

  const numberTrivia: NumberTrivia = {
    text: 'This is a test response from Trivia',
    number: testNumber,
  };

  test('should get trivia for the number from the repository', async () => {
    mockTriviaRepository.getConcreteNumberTrivia.mockReturnValue(numberTrivia);
    let usecase = new GetConcreteNumberTrivia(mockTriviaRepository);

    let result = await usecase.call(params);

    expect(result).toEqual<NumberTrivia>(numberTrivia);
    expect(mockTriviaRepository.getConcreteNumberTrivia).toBeCalledTimes(1);
  });
});
