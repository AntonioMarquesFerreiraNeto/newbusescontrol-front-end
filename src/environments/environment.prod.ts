import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: false,
  apiBaseUrl: 'http://localhost:5265/api/v1'
};
