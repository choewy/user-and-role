const keys = ['Server', 'Cors', 'Typeorm'] as const;

export type ConfigKeys = typeof keys[number];
export const ConfigEnvKey = {} as Record<ConfigKeys, any>;
export const ConfigTokenKey = {} as Record<ConfigKeys, any>;

keys.forEach((key) => {
  ConfigEnvKey[key] = key.toUpperCase();
  ConfigTokenKey[key] = key.toLowerCase();
});
