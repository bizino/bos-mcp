import { BosApiClient } from '../client';
import { McpTool } from './index';

export const healthTools: McpTool[] = [
  {
    name: 'boscli_health_check',
    description: 'Full BOS system health check - modules, database, cache, routes',
    schema: {},
    handler: async (_, client) => client.get('/boscli/health'),
  },
  {
    name: 'boscli_health_modules',
    description: 'Check health of all BOS modules',
    schema: {},
    handler: async (_, client) => client.get('/boscli/health/modules'),
  },
  {
    name: 'boscli_health_database',
    description: 'Check BOS database connectivity',
    schema: {},
    handler: async (_, client) => client.get('/boscli/health/database'),
  },
  {
    name: 'boscli_health_cache',
    description: 'Check BOS cache systems',
    schema: {},
    handler: async (_, client) => client.get('/boscli/health/cache'),
  },
  {
    name: 'boscli_health_schema',
    description: 'Check BOS database schema integrity',
    schema: {},
    handler: async (_, client) => client.get('/boscli/health/schema'),
  },
];
