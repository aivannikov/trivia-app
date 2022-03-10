import apiConfig from './apiConfig.json';

const QUIZ_API_URL = `${apiConfig.SERVER_URL}${apiConfig.QUIZ_API_PATH}?${apiConfig.QUIZ_QUERY_STRING}`;

export { QUIZ_API_URL };