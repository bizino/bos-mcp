import { BosApiClient } from '../client';

export interface McpTool {
  name: string;
  description: string;
  schema: any;
  handler: (args: any, client: BosApiClient) => Promise<any>;
}

export interface ToolCategory {
  name: string;
  tools: McpTool[];
}

export { bosApi as default } from '../client';
