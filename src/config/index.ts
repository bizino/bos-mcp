export interface BosMcpConfig {
  bosApiUrl: string;
  bosApiToken: string;
  timeout: number;
}

export const defaultConfig: BosMcpConfig = {
  bosApiUrl: process.env.BOS_API_URL || 'https://bos.ai.vn/api',
  bosApiToken: process.env.BOS_API_TOKEN || '',
  timeout: parseInt(process.env.BOS_API_TIMEOUT || '30000', 10),
};

export function mergeConfig(env?: Partial<BosMcpConfig>): BosMcpConfig {
  return {
    ...defaultConfig,
    ...env,
  };
}
