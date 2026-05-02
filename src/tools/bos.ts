import { BosApiClient } from '../client/index.js';
import { McpTool } from './index.js';

// ============================================
// Products (7 tools)
// ============================================
export const productTools: McpTool[] = [
  {
    name: 'bos_product_list',
    description: 'List products with pagination and filters',
    schema: {
      page: { type: 'number', optional: true },
      page_size: { type: 'number', optional: true },
      category_id: { type: 'string', optional: true },
      search: { type: 'string', optional: true },
      status: { type: 'string', enum: ['active', 'inactive'], optional: true },
    },
    handler: async (args, client) => client.get('/api/mcp/products', args),
  },
  {
    name: 'bos_product_show',
    description: 'Get product details by ID',
    schema: { product_id: { type: 'string', description: 'Product ID' } },
    handler: async (args, client) => client.get(`/api/mcp/products/${args.product_id}`),
  },
  {
    name: 'bos_product_search',
    description: 'Search products by name, SKU, or bar code',
    schema: { q: { type: 'string', description: 'Search query' } },
    handler: async (args, client) => client.get('/api/mcp/products/search', args),
  },
  {
    name: 'bos_product_categories',
    description: 'Get all product categories',
    schema: {},
    handler: async (_, client) => client.get('/api/mcp/categories'),
  },
  {
    name: 'bos_product_create',
    description: 'Create a new product',
    schema: {
      name: { type: 'string' },
      sku: { type: 'string', optional: true },
      price: { type: 'number' },
      category_id: { type: 'string', optional: true },
      stock: { type: 'number', optional: true },
      description: { type: 'string', optional: true },
    },
    handler: async (args, client) => client.post('/api/mcp/products', args),
  },
  {
    name: 'bos_product_update',
    description: 'Update an existing product',
    schema: {
      product_id: { type: 'string' },
      name: { type: 'string', optional: true },
      price: { type: 'number', optional: true },
      stock: { type: 'number', optional: true },
      status: { type: 'string', optional: true },
    },
    handler: async (args, client) => {
      const { product_id, ...data } = args;
      return client.put(`/api/mcp/products/${product_id}`, data);
    },
  },
  {
    name: 'bos_product_delete',
    description: 'Delete a product',
    schema: { product_id: { type: 'string' } },
    handler: async (args, client) => client.delete(`/api/mcp/products/${args.product_id}`),
  },
];

// ============================================
// Orders (6 tools)
// ============================================
export const orderTools: McpTool[] = [
  {
    name: 'bos_order_list',
    description: 'List orders with filters',
    schema: {
      page: { type: 'number', optional: true },
      page_size: { type: 'number', optional: true },
      status: { type: 'string', optional: true },
      from_date: { type: 'string', optional: true },
      to_date: { type: 'string', optional: true },
    },
    handler: async (args, client) => client.get('/api/mcp/orders', args),
  },
  {
    name: 'bos_order_show',
    description: 'Get order details by ID',
    schema: { order_id: { type: 'string' } },
    handler: async (args, client) => client.get(`/api/mcp/orders/${args.order_id}`),
  },
  {
    name: 'bos_order_create',
    description: 'Create a new order',
    schema: {
      customer_id: { type: 'string' },
      items: { type: 'array', items: { type: 'object' } },
      shipping_address: { type: 'object', optional: true },
      payment_method: { type: 'string', optional: true },
      note: { type: 'string', optional: true },
    },
    handler: async (args, client) => client.post('/api/mcp/orders', args),
  },
  {
    name: 'bos_order_update_status',
    description: 'Update order status',
    schema: {
      order_id: { type: 'string' },
      status: { type: 'string', enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'] },
    },
    handler: async (args, client) => {
      const { order_id, status } = args;
      return client.put(`/api/mcp/orders/${order_id}/status`, { status });
    },
  },
  {
    name: 'bos_order_cancel',
    description: 'Cancel an order',
    schema: { order_id: { type: 'string' }, reason: { type: 'string', optional: true } },
    handler: async (args, client) => {
      const { order_id, reason } = args;
      return client.post(`/api/mcp/orders/${order_id}/cancel`, { reason });
    },
  },
  {
    name: 'bos_order_count_by_status',
    description: 'Get order counts grouped by status',
    schema: {},
    handler: async (_, client) => client.get('/api/mcp/orders/count-by-status'),
  },
];

// ============================================
// Cart (7 tools)
// ============================================
export const cartTools: McpTool[] = [
  {
    name: 'bos_cart_get',
    description: 'Get current user cart',
    schema: {},
    handler: async (_, client) => client.get('/api/mcp/cart'),
  },
  {
    name: 'bos_cart_add_item',
    description: 'Add item to cart',
    schema: {
      product_id: { type: 'string' },
      quantity: { type: 'number' },
      variant_id: { type: 'string', optional: true },
      notes: { type: 'string', optional: true },
    },
    handler: async (args, client) => client.post('/api/mcp/cart/items', args),
  },
  {
    name: 'bos_cart_update_item',
    description: 'Update cart item quantity',
    schema: { item_id: { type: 'string' }, quantity: { type: 'number' } },
    handler: async (args, client) => {
      const { item_id, ...data } = args;
      return client.put(`/api/mcp/cart/items/${item_id}`, data);
    },
  },
  {
    name: 'bos_cart_remove_item',
    description: 'Remove item from cart',
    schema: { item_id: { type: 'string' } },
    handler: async (args, client) => client.delete(`/api/mcp/cart/items/${args.item_id}`),
  },
  {
    name: 'bos_cart_clear',
    description: 'Clear all items from cart',
    schema: {},
    handler: async (_, client) => client.delete('/api/mcp/cart'),
  },
  {
    name: 'bos_cart_apply_voucher',
    description: 'Apply voucher code to cart',
    schema: { voucher_code: { type: 'string' } },
    handler: async (args, client) => client.post('/api/mcp/cart/apply-voucher', args),
  },
  {
    name: 'bos_cart_remove_voucher',
    description: 'Remove voucher from cart',
    schema: {},
    handler: async (_, client) => client.delete('/api/mcp/cart/voucher'),
  },
];

// ============================================
// Customers (5 tools)
// ============================================
export const customerTools: McpTool[] = [
  {
    name: 'bos_customer_list',
    description: 'List customers with pagination',
    schema: {
      page: { type: 'number', optional: true },
      page_size: { type: 'number', optional: true },
      search: { type: 'string', optional: true },
    },
    handler: async (args, client) => client.get('/api/mcp/customers', args),
  },
  {
    name: 'bos_customer_show',
    description: 'Get customer details by ID',
    schema: { customer_id: { type: 'string' } },
    handler: async (args, client) => client.get(`/api/mcp/customers/${args.customer_id}`),
  },
  {
    name: 'bos_customer_create',
    description: 'Create a new customer',
    schema: {
      name: { type: 'string' },
      phone: { type: 'string' },
      email: { type: 'string', optional: true },
      address: { type: 'string', optional: true },
    },
    handler: async (args, client) => client.post('/api/mcp/customers', args),
  },
  {
    name: 'bos_customer_update',
    description: 'Update customer information',
    schema: {
      customer_id: { type: 'string' },
      name: { type: 'string', optional: true },
      phone: { type: 'string', optional: true },
      email: { type: 'string', optional: true },
      address: { type: 'string', optional: true },
    },
    handler: async (args, client) => {
      const { customer_id, ...data } = args;
      return client.put(`/api/mcp/customers/${customer_id}`, data);
    },
  },
  {
    name: 'bos_customer_orders',
    description: 'Get order history for a customer',
    schema: { customer_id: { type: 'string' } },
    handler: async (args, client) => client.get(`/api/mcp/customers/${args.customer_id}/orders`),
  },
];

// ============================================
// Inventory (4 tools)
// ============================================
export const inventoryTools: McpTool[] = [
  {
    name: 'bos_inventory_list',
    description: 'List inventory stock across all products',
    schema: {
      page: { type: 'number', optional: true },
      page_size: { type: 'number', optional: true },
      warehouse_id: { type: 'string', optional: true },
    },
    handler: async (args, client) => client.get('/api/mcp/inventory', args),
  },
  {
    name: 'bos_inventory_check',
    description: 'Check stock quantity for a product',
    schema: { product_id: { type: 'string' } },
    handler: async (args, client) => client.get(`/api/mcp/inventory/check/${args.product_id}`),
  },
  {
    name: 'bos_inventory_update',
    description: 'Update inventory stock',
    schema: {
      product_id: { type: 'string' },
      quantity: { type: 'number' },
      type: { type: 'string', enum: ['set', 'add', 'subtract'] },
      reason: { type: 'string', optional: true },
    },
    handler: async (args, client) => client.post('/api/mcp/inventory/update', args),
  },
  {
    name: 'bos_inventory_low_stock',
    description: 'Get products with low stock alerts',
    schema: { threshold: { type: 'number', optional: true } },
    handler: async (args, client) => client.get('/api/mcp/inventory/low-stock', args),
  },
];

// ============================================
// Vouchers (4 tools)
// ============================================
export const voucherTools: McpTool[] = [
  {
    name: 'bos_voucher_list',
    description: 'List available vouchers',
    schema: {
      page: { type: 'number', optional: true },
      page_size: { type: 'number', optional: true },
      status: { type: 'string', optional: true },
    },
    handler: async (args, client) => client.get('/api/mcp/vouchers', args),
  },
  {
    name: 'bos_voucher_validate',
    description: 'Validate a voucher code',
    schema: { code: { type: 'string' } },
    handler: async (args, client) => client.post('/api/mcp/vouchers/validate', args),
  },
  {
    name: 'bos_voucher_create',
    description: 'Create a new voucher',
    schema: {
      code: { type: 'string' },
      type: { type: 'string', enum: ['percentage', 'fixed'] },
      value: { type: 'number' },
      min_order_amount: { type: 'number', optional: true },
      max_discount: { type: 'number', optional: true },
      start_date: { type: 'string' },
      end_date: { type: 'string' },
      usage_limit: { type: 'number', optional: true },
    },
    handler: async (args, client) => client.post('/api/mcp/vouchers', args),
  },
  {
    name: 'bos_customer_vouchers',
    description: 'Get vouchers for current customer',
    schema: { status: { type: 'string', enum: ['available', 'used', 'expired'], optional: true } },
    handler: async (args, client) => client.get('/api/mcp/customer/vouchers', args),
  },
];

// ============================================
// Loyalty (5 tools)
// ============================================
export const loyaltyTools: McpTool[] = [
  {
    name: 'bos_loyalty_points_balance',
    description: 'Get loyalty points balance for customer',
    schema: { customer_id: { type: 'string' } },
    handler: async (args, client) => client.get(`/api/mcp/loyalty/${args.customer_id}/balance`),
  },
  {
    name: 'bos_loyalty_points_history',
    description: 'Get loyalty points transaction history',
    schema: {
      customer_id: { type: 'string' },
      page: { type: 'number', optional: true },
      page_size: { type: 'number', optional: true },
    },
    handler: async (args, client) => {
      const { customer_id, ...params } = args;
      return client.get(`/api/mcp/loyalty/${customer_id}/history`, params);
    },
  },
  {
    name: 'bos_loyalty_earn',
    description: 'Earn loyalty points',
    schema: {
      customer_id: { type: 'string' },
      points: { type: 'number' },
      order_id: { type: 'string', optional: true },
      description: { type: 'string', optional: true },
    },
    handler: async (args, client) => client.post('/api/mcp/loyalty/earn', args),
  },
  {
    name: 'bos_loyalty_redeem',
    description: 'Redeem loyalty points',
    schema: {
      customer_id: { type: 'string' },
      points: { type: 'number' },
      reward_id: { type: 'string', optional: true },
    },
    handler: async (args, client) => client.post('/api/mcp/loyalty/redeem', args),
  },
  {
    name: 'bos_loyalty_tiers',
    description: 'Get loyalty tier information',
    schema: {},
    handler: async (_, client) => client.get('/api/mcp/loyalty/tiers'),
  },
];

// ============================================
// Stores (3 tools)
// ============================================
export const storeTools: McpTool[] = [
  {
    name: 'bos_store_list',
    description: 'List all stores locations',
    schema: {},
    handler: async (_, client) => client.get('/api/mcp/stores'),
  },
  {
    name: 'bos_store_show',
    description: 'Get store details',
    schema: { store_id: { type: 'string' } },
    handler: async (args, client) => client.get(`/api/mcp/stores/${args.store_id}`),
  },
  {
    name: 'bos_store_nearby',
    description: 'Find nearby stores by location',
    schema: {
      latitude: { type: 'number' },
      longitude: { type: 'number' },
      radius: { type: 'number', optional: true },
    },
    handler: async (args, client) => client.get('/api/mcp/stores/nearby', args),
  },
];

// ============================================
// Checkout & Payment (4 tools)
// ============================================
export const checkoutTools: McpTool[] = [
  {
    name: 'bos_checkout_calculate',
    description: 'Calculate checkout totals',
    schema: {
      customer_id: { type: 'string' },
      shipping_address_id: { type: 'string', optional: true },
      voucher_code: { type: 'string', optional: true },
    },
    handler: async (args, client) => client.post('/api/mcp/checkout/calculate', args),
  },
  {
    name: 'bos_checkout_create',
    description: 'Create order from cart',
    schema: {
      customer_id: { type: 'string' },
      shipping_address: { type: 'object' },
      payment_method: { type: 'string' },
      voucher_code: { type: 'string', optional: true },
    },
    handler: async (args, client) => client.post('/api/mcp/checkout/create', args),
  },
  {
    name: 'bos_payment_methods',
    description: 'Get available payment methods',
    schema: {},
    handler: async (_, client) => client.get('/api/mcp/payment-methods'),
  },
  {
    name: 'bos_payment_verify',
    description: 'Verify payment status',
    schema: { order_id: { type: 'string' } },
    handler: async (args, client) => client.get(`/api/mcp/payments/verify/${args.order_id}`),
  },
];

// ============================================
// Promotions (3 tools)
// ============================================
export const promotionTools: McpTool[] = [
  {
    name: 'bos_promotion_list',
    description: 'List active promotions and campaigns',
    schema: {
      page: { type: 'number', optional: true },
      page_size: { type: 'number', optional: true },
    },
    handler: async (args, client) => client.get('/api/mcp/promotions', args),
  },
  {
    name: 'bos_promotion_show',
    description: 'Get promotion details',
    schema: { promotion_id: { type: 'string' } },
    handler: async (args, client) => client.get(`/api/mcp/promotions/${args.promotion_id}`),
  },
  {
    name: 'bos_promotion_apply',
    description: 'Apply promotion to order',
    schema: { promotion_id: { type: 'string' }, order_id: { type: 'string' } },
    handler: async (args, client) => client.post('/api/mcp/promotions/apply', args),
  },
];

// ============================================
// Home & Engagement (4 tools)
// ============================================
export const engagementTools: McpTool[] = [
  {
    name: 'bos_home',
    description: 'Get home page data (banners, categories, featured products)',
    schema: {},
    handler: async (_, client) => client.get('/api/mcp/home'),
  },
  {
    name: 'bos_banners',
    description: 'Get promotional banners',
    schema: { location: { type: 'string', optional: true } },
    handler: async (args, client) => client.get('/api/mcp/banners', args),
  },
  {
    name: 'bos_notifications',
    description: 'Get user notifications',
    schema: {
      page: { type: 'number', optional: true },
      unread_only: { type: 'boolean', optional: true },
    },
    handler: async (args, client) => client.get('/api/mcp/notifications', args),
  },
  {
    name: 'bos_notification_mark_read',
    description: 'Mark notification as read',
    schema: { notification_id: { type: 'string' } },
    handler: async (args, client) => client.post(`/api/mcp/notifications/${args.notification_id}/read`),
  },
];
