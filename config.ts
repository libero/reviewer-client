declare var CONFIG: {
  API_HOST: string;
  LOGIN_URL: string;
} 

CONFIG = {
  "API_HOST": "${CLIENT_API_URL}:${CLIENT_PORT}",
  "LOGIN_URL": "${CONTINUUM_LOGIN_URL}:${CONTINUUM_LOGIN_PORT}/submit",
}