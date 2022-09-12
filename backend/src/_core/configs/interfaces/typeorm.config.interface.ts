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
