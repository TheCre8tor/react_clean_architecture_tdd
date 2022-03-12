import { NumberTrivia } from './../../../../../src/features/number_trivia/domain/entities/number_trivia';
import { NumberTriviaRepository } from './../../../../../src/features/number_trivia/domain/repositories/number_trivia_repository';
import {
  GetConcreteNumberTrivia,
  Params,
} from './../../../../../src/features/number_trivia/domain/usecases/get_concrete_number_trivia';

type MockConcreteNumberTrivia<T> = { [K in keyof T]: jest.Mock<any, any> };

let mockConcreteNumberTrivia: MockConcreteNumberTrivia<NumberTriviaRepository> =
  {
    getConcreteNumberTrivia: jest.fn(),
    getRandomNumber: jest.fn(),
  };

describe('GetConcreteNumberTrivia', () => {
  const testNumber = 1;

  const numberTrivia: NumberTrivia = {
    text: 'This is a test response from Trivia',
    number: testNumber,
  };

  test('should get trivia for the number from the repository', async () => {
    mockConcreteNumberTrivia.getConcreteNumberTrivia.mockReturnValue(
      numberTrivia,
    );
    const usecase = new GetConcreteNumberTrivia(mockConcreteNumberTrivia);

    let result = await usecase.call(new Params(1));

    expect(result).toEqual<NumberTrivia>(numberTrivia);
    expect(mockConcreteNumberTrivia.getConcreteNumberTrivia).toBeCalledWith(1);
    expect(mockConcreteNumberTrivia.getConcreteNumberTrivia).toBeCalledTimes(1);
  });
});
