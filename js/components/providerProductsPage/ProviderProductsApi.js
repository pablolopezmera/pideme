import RestClient from 'react-native-rest-client';

export default class ProviderApi extends RestClient {
  constructor () {
    // Initialize with your base URL
    // super('http://192.168.1.4:9999');
    super('http://virtserver.swaggerhub.com/pideme/yopido/1.0.0');
  }
  // Now you can write your own methods easily
  query (providerId) {
    // Returns a Promise with the response.
    var url = '/providers/' + providerId + '/products';
    return this.GET(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log('Hay error: ' + error);
        throw error;
      });
  }
};
