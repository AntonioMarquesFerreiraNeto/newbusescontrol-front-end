import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: false,
  apiBaseUrl: 'https://localhost:5265/api/v1',
  baseUrlWebSocket: 'https://localhost:5265/ws'
};
