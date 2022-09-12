export interface CorsEnv {
  ORIGINS: string[];
  METHODS: string[];
  ALLOWED_HEADERS: string[];
  EXPOSED_HEADERS: string[];
  PREFLIGHT_CONTINUE: boolean;
  CREDENTIALS: boolean;
}
