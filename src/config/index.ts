export interface BosMcpConfig {
  bosApiUrl: string;
  bosApiToken: string;
  mcpApiKey: string;
  timeout: number;
}

// BUG 4 FIX: baseURL now includes /api because
// tools should use relative paths like '/mcp/products'
export const defaultConfig: BosMcpConfig = {
  bosApiUrl: process.env.BOS_API_URL || 'https://bos.ai.vn/api',
  bosApiToken: process.env.BOS_API_TOKEN || '',
  // BUG 5 FIX: Add MCP API key config
  mcpApiKey: process.env.MCP_API_KEY || '',
  timeout: parseInt(process.env.BOS_API_TIMEOUT || '30000', 10),
};

export function mergeConfig(env?: Partial<BosMcpConfig>): BosMcpConfig {
  return {
    ...defaultConfig,
    ...env,
  };
}
