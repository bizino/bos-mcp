import express from 'express';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';

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

const client = new BosApiClient();

function createServer(): McpServer {
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
  return server;
}

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', tools: allTools.length });
});

// SSE endpoint for MCP over HTTP
app.get('/sse', async (_req, res) => {
  const server = createServer();
  const transport = new SSEServerTransport('/messages', res);
  await server.connect(transport);
});

app.post('/messages', async (_req, res) => {
  res.status(200).json({ ok: true });
});

app.listen(PORT, () => {
  console.error(`BosMCP HTTP Server started on port ${PORT} — ${allTools.length} tools available`);
});
