import RestClient from 'react-native-rest-client';

export default class ProviderApi extends RestClient {
  constructor () {
    // Initialize with your base URL
    // super('http://www.mocky.io/v2/5963faea26000024043d7297');
    super('http://virtserver.swaggerhub.com/pideme/yopido/1.0.0');
  }
  // Now you can write your own methods easily
  query () {
    // Returns a Promise with the response.
    return this.GET('/providers')
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log('Hay error: ' + error);
        throw error;
      });
  }
};
