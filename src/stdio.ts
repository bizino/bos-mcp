import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

import { BosApiClient } from './client/index.js';
import { McpTool, toZodSchema } from './tools/index.js';
import { healthTools } from './tools/health.js';
import { moduleTools } from './tools/module.js';
import { routeTools } from './tools/route.js';
import { cacheTools } from './tools/cache.js';
import { systemTools } from './tools/system.js';
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
} from './tools/bos.js';
import { smartTools } from './tools/smart.js';
import { erpTools } from './tools/erp.js';

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
  ...erpTools,
  ...smartTools,
];

const client = new BosApiClient();
const server = new McpServer({
  name: 'bos-mcp',
  version: '1.0.0',
});

for (const tool of allTools) {
  const zodSchema = toZodSchema(tool.schema);
  server.tool(
    tool.name,
    tool.description,
    zodSchema.shape,
    async (args: any) => {
      try {
        const result = await tool.handler(args, client);
        return {
          content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }],
        };
      } catch (error: any) {
        return {
          content: [{ type: 'text' as const, text: JSON.stringify({ error: error.message || 'Unknown error' }) }],
          isError: true,
        };
      }
    }
  );
}

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('BosMCP STDIO Server started -', allTools.length, 'tools available');
}

main().catch(console.error);
