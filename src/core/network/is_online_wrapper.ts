import isOnline from 'is-online';

export default class IsOnlineWrapper {
  async hasConnection() {
    try {
      return await isOnline();
    } catch (err) {
      return false;
    }
  }
}
