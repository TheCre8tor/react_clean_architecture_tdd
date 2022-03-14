import IsOnlineWrapper from './is_online_wrapper';

export abstract class NetworkInfo {
  abstract isConnected(): Promise<boolean>;
}

export class NetworkInfoImpl implements NetworkInfo {
  private isOnlineWrapper: IsOnlineWrapper;

  constructor(isOnlineWrapper: IsOnlineWrapper) {
    this.isOnlineWrapper = isOnlineWrapper;
  }

  async isConnected(): Promise<boolean> {
    return await this.isOnlineWrapper.hasConnection();
  }
}
