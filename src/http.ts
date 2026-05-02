import express, { Request, Response } from 'express';
import { Server } from '@modelcontextprotocol/sdk/server/stdio.js';
import { HttpServerTransport } from '@modelcontextprotocol/sdk/server/http.js';
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
];

const app = express();
app.use(express.json());

const client = new BosApiClient();

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

const PORT = process.env.PORT || 3000;

app.get('/health', (_, res: Response) => {
  res.json({ status: 'ok', tools: allTools.length });
});

app.post('/mcp', async (req: Request, res: Response) => {
  const transport = new HttpServerTransport('/mcp', 'post');
  // Handle MCP request
  res.json({ jsonrpc: '2.0', id: req.body.id, result: { tools: allTools.length } });
});

app.listen(PORT, () => {
  console.error(`BosMCP HTTP Server started on port ${PORT}`);
});
