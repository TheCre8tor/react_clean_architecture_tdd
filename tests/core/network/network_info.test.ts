import IsOnlineWrapper from '../../../src/core/network/is_online_wrapper';
import { NetworkInfoImpl } from './../../../src/core/network/network_info';

type MockInternetChecker<T> = { [P in keyof T]: jest.Mock };

describe('isConnected', () => {
  test.todo(
    'should test is-online libary wrapper',
    //   async () => {
    //     const internetChecker = new IsOnlineWrapper();

    //     const result = await internetChecker.hasConnection();

    //     expect(result).toBeTruthy();
    //   }
  );

  test('should mock is-online libary wrapper and return espected result', async () => {
    const mockInternetChecker: MockInternetChecker<IsOnlineWrapper> = {
      hasConnection: jest.fn(),
      query: jest.fn(),
    };
    mockInternetChecker.hasConnection.mockReturnValue(true);
    const networkInfo = new NetworkInfoImpl(mockInternetChecker);

    const result = await networkInfo.isConnected();

    expect(result).toBeTruthy();
    expect(mockInternetChecker.hasConnection).toBeCalledTimes(1);
    expect(mockInternetChecker.hasConnection).toBeCalledWith();
  });
});
