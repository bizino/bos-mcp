import * as readline from 'readline';
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

const client = new BosApiClient();

interface JsonRpcRequest {
  jsonrpc: '2.0';
  id: number | string | null;
  method: string;
  params?: any;
}

function sendResponse(response: any): void {
  process.stdout.write(JSON.stringify(response) + '\n');
}

function handleRequest(request: JsonRpcRequest): void {
  const { id, method, params } = request;

  if (method === 'tools/list') {
    sendResponse({
      jsonrpc: '2.0',
      id,
      result: {
        tools: allTools.map((tool) => ({
          name: tool.name,
          description: tool.description,
          inputSchema: { type: 'object', properties: tool.schema },
        })),
      },
    });
    return;
  }

  if (method === 'tools/call') {
    const { name, arguments: args } = params;
    const tool = allTools.find((t) => t.name === name);

    if (!tool) {
      sendResponse({ jsonrpc: '2.0', id, error: { code: -32601, message: `Tool not found: ${name}` } });
      return;
    }

    tool
      .handler(args || {}, client)
      .then((result) => {
        sendResponse({
          jsonrpc: '2.0',
          id,
          result: { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] },
        });
      })
      .catch((error: any) => {
        sendResponse({
          jsonrpc: '2.0',
          id,
          error: { code: -32603, message: error.message || 'Unknown error' },
        });
      });
    return;
  }

  sendResponse({ jsonrpc: '2.0', id, error: { code: -32601, message: `Method not found: ${method}` } });
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });

rl.on('line', (line: string) => {
  try {
    const request = JSON.parse(line);
    handleRequest(request);
  } catch (e) {
    // Ignore non-JSON lines
  }
});

process.stdin.on('error', (err: any) => {
  console.error('Stdin error:', err);
  process.exit(1);
});

process.stdout.on('error', (err: any) => {
  console.error('Stdout error:', err);
  process.exit(1);
});

console.error(`BosMCP Server started - ${allTools.length} tools available on stdio`);
