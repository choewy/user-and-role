export interface SwaggerAuth extends Record<string, string> {}

export interface SwaggerEnv {
  VERSION: string;
  PATH: string;
  TITLE: string;
  DESCRIPTION: string;
  SITE_NAME: string;
  SITE_URL: string;
  EMAIL: string;
  AUTHORIZATION: SwaggerAuth;
}

export interface SwaggerConfig {
  version: string;
  path: string;
  title: string;
  description: string;
  name: string;
  url: string;
  email: string;
  authorization: SwaggerAuth;
}
