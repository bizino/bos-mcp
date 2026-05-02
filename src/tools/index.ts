import { BosApiClient } from '../client/index.js';
import { z } from 'zod';

export interface McpTool {
  name: string;
  description: string;
  schema: Record<string, any>;
  handler: (args: any, client: BosApiClient) => Promise<any>;
}

export interface ToolCategory {
  name: string;
  tools: McpTool[];
}

/**
 * Convert our simple schema format to Zod schema for MCP SDK.
 * Input: { field: { type: 'string', optional: true, description: '...' } }
 * Output: z.object({ field: z.string().optional().describe('...') })
 */
export function toZodSchema(schema: Record<string, any>): z.ZodObject<any> {
  const shape: Record<string, z.ZodTypeAny> = {};

  for (const [key, def] of Object.entries(schema)) {
    let field: z.ZodTypeAny;

    switch (def.type) {
      case 'number':
        field = z.number();
        break;
      case 'boolean':
        field = z.boolean();
        break;
      case 'array':
        field = z.array(z.any());
        break;
      case 'object':
        field = z.record(z.any());
        break;
      case 'string':
      default:
        if (def.enum) {
          field = z.enum(def.enum);
        } else {
          field = z.string();
        }
        break;
    }

    if (def.description) {
      field = field.describe(def.description);
    }

    if (def.optional) {
      field = field.optional();
    }

    shape[key] = field;
  }

  return z.object(shape);
}

export { bosApi as default } from '../client/index.js';
