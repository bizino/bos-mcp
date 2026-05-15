import { BosApiClient } from '../client/index.js';
import { McpTool } from './index.js';

export const systemTools: McpTool[] = [
  {
    name: 'boscli_system_info',
    description: 'Get BOS system information - version, PHP, Laravel, environment',
    schema: {},
    handler: async (_, client) => client.get('/boscli/system/info'),
  },
  {
    name: 'boscli_system_logs',
    description: 'Read recent BOS log entries',
    schema: {
      lines: { type: 'number', optional: true },
      level: { type: 'string', enum: ['error', 'warning', 'info'], optional: true },
    },
    handler: async (args, client) => client.get('/boscli/system/logs', args),
  },
  {
    name: 'boscli_system_git_status',
    description: 'Get BOS git repository status - branch, commit, changed files',
    schema: {},
    handler: async (_, client) => client.get('/boscli/system/git-status'),
  },
  {
    name: 'boscli_system_deploy_status',
    description: 'Get deployment status for BOS servers',
    schema: { customer: { type: 'string', optional: true } },
    handler: async (args, client) => client.get('/boscli/system/deploy-status', args),
  },
];
