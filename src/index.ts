import { Server } from '@modelcontextprotocol/sdk/server/stdio.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types';

import { BosApiClient } from './client';
import { McpTool } from './tools/index';
import { healthTools } from './tools/health';
import { moduleTools } from './tools/module';
import { routeTools } from './tools/route';
import { cacheTools } from './tools/cache';
import { systemTools } from './tools/system';
import {
  productTools,
  orderTools,
  cartTools,
  customerTools,
  inventoryTools,
  voucherTools,
  loyaltyTools,
  storeTools,
  checkoutTools,
  promotionTools,
  engagementTools,
} from './tools/bos';
import { smartTools } from './tools/smart';

const allTools: McpTool[] = [
  ...healthTools,
  ...moduleTools,
  ...routeTools,
  ...cacheTools,
  ...systemTools,
  ...productTools,
  ...orderTools,
  ...cartTools,
  ...customerTools,
  ...inventoryTools,
  ...voucherTools,
  ...loyaltyTools,
  ...storeTools,
  ...checkoutTools,
  ...promotionTools,
  ...engagementTools,
  ...smartTools,
];

const server = new Server(
  {
    name: 'bos-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

const client = new BosApiClient();

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  const tool = allTools.find((t) => t.name === name);

  if (!tool) {
    return {
      content: [{ type: 'text', text: JSON.stringify({ error: `Tool not found: ${name}` }) }],
      isError: true,
    };
  }

  try {
    const result = await tool.handler(args || {}, client);
    return {
      content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
    };
  } catch (error: any) {
    return {
      content: [{ type: 'text', text: JSON.stringify({ error: error.message || 'Unknown error' }) }],
      isError: true,
    };
  }
});

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: allTools.map((tool) => ({
      name: tool.name,
      description: tool.description,
      inputSchema: {
        type: 'object',
        properties: tool.schema,
      },
    })),
  };
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('BosMCP Server started -', allTools.length, 'tools available');
}

main().catch(console.error);
