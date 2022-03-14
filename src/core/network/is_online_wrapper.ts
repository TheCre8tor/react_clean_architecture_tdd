import isOnline from 'is-online';

export default class IsOnlineWrapper {
  async query() {
    try {
      return await isOnline();
    } catch (err) {
      return false;
    }
  }

  async hasConnection() {
    return await this.query();
  }
}
