import { fromJS } from 'immutable';
import { NumberTriviaModel } from '../../../../../src/features/number_trivia/data/models/number_trivia_model';
import { NumberTrivia } from '../../../../../src/features/number_trivia/domain/entities/number_trivia';
import { fixture } from '../../../../fixtures/fixture_reader';

describe('NumberTriviaModel', () => {
  const testNumberTriviaModel = new NumberTriviaModel(
    'This is a test response from Trivia',
    1,
  );

  test('should be a subclass of NumberTrivia entity', () => {
    expect(testNumberTriviaModel).toBeInstanceOf(NumberTrivia);
  });

  describe('fromJson', () => {
    test('should return a valid model when the JSON `number` field is an integer', () => {
      const jsonMap = fromJS(fixture('trivia.json'));

      const result = NumberTriviaModel.fromJson(jsonMap);

      expect(result).toStrictEqual(testNumberTriviaModel);
    });

    test('should return a valid model when the JSON `number` field is regarded as a double', () => {
      const jsonMap = fromJS(fixture('trivia_double.json'));

      const result = NumberTriviaModel.fromJson(jsonMap);

      expect(result).toStrictEqual(testNumberTriviaModel);
    });
  });

  describe('toJson', () => {
    test('should return a JSON containing the proper data.', () => {
      const result = testNumberTriviaModel.toJson();

      const expectedMap = {
        text: 'This is a test response from Trivia',
        number: 1,
      };

      expect(result).toStrictEqual(expectedMap);
    });
  });
});
