import { McpTool } from './index.js';

const listSchema = {
  page: { type: 'number', optional: true },
  page_size: { type: 'number', optional: true },
};

const transactionSchema = {
  ...listSchema,
  from_date: { type: 'string', optional: true },
  to_date: { type: 'string', optional: true },
};

export const erpTools: McpTool[] = [
  {
    name: 'bos_erp_overview',
    description: 'Get ERP overview counts for customers, suppliers, products, sales, purchases, and expenses',
    schema: {},
    handler: async (_, client) => client.get('/mcp/erp/overview'),
  },
  {
    name: 'bos_purchase_list',
    description: 'List purchase transactions and purchase orders',
    schema: transactionSchema,
    handler: async (args, client) => client.get('/mcp/erp/purchases', args),
  },
  {
    name: 'bos_expense_list',
    description: 'List expense transactions and refunds',
    schema: transactionSchema,
    handler: async (args, client) => client.get('/mcp/erp/expenses', args),
  },
  {
    name: 'bos_stock_movement_list',
    description: 'List stock adjustments, transfers, and opening stock movements',
    schema: transactionSchema,
    handler: async (args, client) => client.get('/mcp/erp/stock-movements', args),
  },
  {
    name: 'bos_accounting_summary',
    description: 'Get sales, purchases, expenses, and journal entry summary',
    schema: {},
    handler: async (_, client) => client.get('/mcp/erp/accounting/summary'),
  },
  {
    name: 'bos_hr_employee_list',
    description: 'List ERP employees/users',
    schema: listSchema,
    handler: async (args, client) => client.get('/mcp/erp/hr/employees', args),
  },
  {
    name: 'bos_crm_lead_list',
    description: 'List CRM leads from CRM module or contact fallback',
    schema: listSchema,
    handler: async (args, client) => client.get('/mcp/erp/crm/leads', args),
  },
  {
    name: 'bos_approval_list',
    description: 'List approval requests/workflows when Approval module tables are installed',
    schema: listSchema,
    handler: async (args, client) => client.get('/mcp/erp/approvals', args),
  },
  {
    name: 'bos_delivery_shipment_list',
    description: 'List delivery shipments or delivery orders when Delivery module tables are installed',
    schema: listSchema,
    handler: async (args, client) => client.get('/mcp/erp/delivery/shipments', args),
  },
  {
    name: 'bos_integration_status',
    description: 'Get connection counts for ERP integration modules such as KiotViet, Sapo, EcomSync, Marketplace, and AMIS',
    schema: {},
    handler: async (_, client) => client.get('/mcp/erp/integrations/status'),
  },
];
