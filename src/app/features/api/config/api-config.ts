import { API_URL } from "../../../../environments/environment";

const baseUrl = API_URL;

export const API_CONFIG = {

  baseUrl: baseUrl,

  localizationUrl: baseUrl + '/i18n',
  securityPolicy: baseUrl + '/security-policy',
  authUrl: baseUrl + '/auth',
  sessionUrl: baseUrl + '/session',
  themesUrl: baseUrl + '/themes',
  decksUrl: baseUrl + '/decks',
  cardVideos: baseUrl + '/cards-videos',
  languagesUrl: baseUrl + '/languages'

}