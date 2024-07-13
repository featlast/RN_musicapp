import axios from 'axios';

const ApiManager = axios.create({
  baseURL: 'https://ws.audioscrobbler.com/2.0/?',
  responseType: 'json',
  withCredentials: true,
});

export default ApiManager;

// import {API_URL, API_URL_DEV, API_URL_TESTING} from '@env';
