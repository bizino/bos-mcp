import { BosApiClient } from '../client/index.js';
import { McpTool } from './index.js';

export const cacheTools: McpTool[] = [
  {
    name: 'boscli_cache_list',
    description: 'Get BOS cache configuration and status',
    schema: {},
    handler: async (_, client) => client.get('/api/boscli/cache'),
  },
  {
    name: 'boscli_cache_clear',
    description: 'Clear BOS application caches',
    schema: {
      type: { type: 'string', enum: ['all', 'config', 'route', 'view', 'cache'], optional: true },
    },
    handler: async (args, client) => client.post('/api/boscli/cache/clear', { type: args.type || 'all' }),
  },
];
