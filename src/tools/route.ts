import { BosApiClient } from '../client/index.js';
import { McpTool } from './index.js';

export const routeTools: McpTool[] = [
  {
    name: 'boscli_route_list',
    description: 'List all BOS routes, optionally filtered by module',
    schema: {
      module: { type: 'string', optional: true },
      limit: { type: 'number', optional: true },
    },
    handler: async (args, client) => client.get('/api/boscli/routes'),
  },
  {
    name: 'boscli_route_by_module',
    description: 'Get all routes for a specific BOS module',
    schema: { module: { type: 'string', description: 'Module name to filter routes' } },
    handler: async (args, client) => client.get(`/boscli/routes/${args.module}`),
  },
];
