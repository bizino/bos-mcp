import { describe, expect, it } from '@jest/globals';
import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const projectRoot = resolve(process.cwd(), '..');
const toolsDir = resolve(process.cwd(), 'src/tools');

function readToolSources() {
  return readdirSync(toolsDir)
    .filter((file) => file.endsWith('.ts'))
    .map((file) => readFileSync(resolve(toolsDir, file), 'utf8'))
    .join('\n');
}

function toolNames() {
  const matches = readToolSources().matchAll(/name:\s*'([^']+)'/g);
  return [...matches].map((match) => match[1]);
}

describe('BOS MCP tool catalog', () => {
  it('has unique tool names and ERP coverage tools', () => {
    const names = toolNames();
    const uniqueNames = new Set(names);

    expect(names).toHaveLength(uniqueNames.size);
    expect(names.length).toBeGreaterThanOrEqual(108);
    expect(names).toEqual(expect.arrayContaining([
      'bos_erp_overview',
      'bos_purchase_list',
      'bos_accounting_summary',
      'bos_hr_employee_list',
      'bos_crm_lead_list',
      'bos_integration_status',
    ]));
  });

  it('keeps MCP and BosCli Laravel routes mapped to existing controller methods', () => {
    const php = `
$errors = 0;
foreach (app('router')->getRoutes() as $route) {
    $uri = $route->uri();
    if (!str_contains($uri, 'mcp') && !str_contains($uri, 'boscli')) {
        continue;
    }
    $action = $route->getActionName();
    if (!str_contains($action, '@')) {
        continue;
    }
    [$controller, $method] = explode('@', $action, 2);
    if (!class_exists($controller) || !method_exists($controller, $method)) {
        echo "BROKEN {$uri} -> {$action}" . PHP_EOL;
        $errors++;
    }
}
echo "checked" . PHP_EOL;
if ($errors > 0) {
    exit(1);
}
`;
    const result = spawnSync('php', ['artisan', 'tinker', '--execute', php], {
      cwd: projectRoot,
      encoding: 'utf8',
      timeout: 120000,
    });

    expect(result.stdout + result.stderr).not.toContain('BROKEN');
    expect(result.status).toBe(0);
  });
});
