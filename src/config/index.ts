export interface BosMcpConfig {
  bosApiUrl: string;
  bosApiToken: string;
  mcpApiKey: string;
  timeout: number;
}

// BUG 4 FIX: baseURL should NOT include /api because
// Laravel RouteServiceProvider already adds /api prefix,
// and all tool endpoints already specify /api/mcp/...
export const defaultConfig: BosMcpConfig = {
  bosApiUrl: process.env.BOS_API_URL || 'https://bos.ai.vn',
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
