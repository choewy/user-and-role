export const parseEnvToJSON = <T>(key: string): T => {
  return JSON.parse(process.env[key]);
};
