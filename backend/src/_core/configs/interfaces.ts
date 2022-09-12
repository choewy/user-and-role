export interface ServerEnv {
  PORT: number;
  HOST: string;
  LIMIT: string;
}

export interface ServerConfig {
  port: number;
  host: string;
  limit: string;
}

export interface CorsEnv {
  ORIGINS: string[];
  METHODS: string[];
  ALLOWED_HEADERS: string[];
  EXPOSED_HEADERS: string[];
  PREFLIGHT_CONTINUE: boolean;
  CREDENTIALS: boolean;
}

export interface TypeormEnv {
  TYPE: any;
  HOST: string;
  PORT: number;
  USERNAME: string;
  PASSWORD: string;
  DATABASE: string;
  SYNCHRONIZE: boolean;
  LOGGING: boolean;
  ENTITIES: string[];
  MIGRATIONS: string[];
  TIMEZONE: string;
  SSL_REQUIRED: boolean;
  SSL_REJECT_UNAUTHORIZED: boolean;
  SSL_CERTIFICATE_PATH: string;
}
