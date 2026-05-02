import { BosApiClient } from '../client/index.js';
import { McpTool } from './index.js';

export const moduleTools: McpTool[] = [
  {
    name: 'boscli_module_list',
    description: 'List all BOS modules with their enabled/disabled status',
    schema: {},
    handler: async (_, client) => client.get('/boscli/modules'),
  },
  {
    name: 'boscli_module_show',
    description: 'Get details of a specific BOS module',
    schema: { module_name: { type: 'string', description: 'Name of the module to check' } },
    handler: async (args, client) => client.get(`/boscli/modules/${args.module_name}`),
  },
  {
    name: 'boscli_module_enable',
    description: 'Enable a BOS module by name',
    schema: { module_name: { type: 'string', description: 'Name of the module to enable' } },
    handler: async (args, client) => client.post(`/boscli/modules/${args.module_name}/enable`),
  },
  {
    name: 'boscli_module_disable',
    description: 'Disable a BOS module by name',
    schema: { module_name: { type: 'string', description: 'Name of the module to disable' } },
    handler: async (args, client) => client.post(`/boscli/modules/${args.module_name}/disable`),
  },
];
