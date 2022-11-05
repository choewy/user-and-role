const keys = ['Server', 'Cors', 'Typeorm', 'Swagger'] as const;

export type ConfigKeys = typeof keys[number];
export const ConfigEnvKey = {} as Record<ConfigKeys, any>;
export const ConfigToken = {} as Record<ConfigKeys, any>;

keys.forEach((key) => {
  ConfigEnvKey[key] = key.toUpperCase();
  ConfigToken[key] = key.toLowerCase();
});
