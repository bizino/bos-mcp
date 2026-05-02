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
    handler: async (args, client) => client.get('/mcp/products', args),
  },
  {
    name: 'bos_product_show',
    description: 'Get product details by ID',
    schema: { product_id: { type: 'string', description: 'Product ID' } },
    handler: async (args, client) => client.get(`/mcp/products/${args.product_id}`),
  },
  {
    name: 'bos_product_search',
    description: 'Search products by name, SKU, or bar code',
    schema: { q: { type: 'string', description: 'Search query' } },
    handler: async (args, client) => client.get('/mcp/products/search', args),
  },
  {
    name: 'bos_product_categories',
    description: 'Get all product categories',
    schema: {},
    handler: async (_, client) => client.get('/mcp/categories'),
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
    handler: async (args, client) => client.post('/mcp/products', args),
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
      return client.put(`/mcp/products/${product_id}`, data);
    },
  },
  {
    name: 'bos_product_delete',
    description: 'Delete a product',
    schema: { product_id: { type: 'string' } },
    handler: async (args, client) => client.delete(`/mcp/products/${args.product_id}`),
  },
  {
    name: 'bos_product_variants',
    description: 'Get all variants for a product',
    schema: { product_id: { type: 'string' } },
    handler: async (args, client) => client.get(`/mcp/products/${args.product_id}/variants`),
  },
  {
    name: 'bos_product_stock',
    description: 'Get stock levels for a product across all locations',
    schema: { product_id: { type: 'string' } },
    handler: async (args, client) => client.get(`/mcp/products/${args.product_id}/stock`),
  },
  {
    name: 'bos_product_images',
    description: 'Get images for a product',
    schema: { product_id: { type: 'string' } },
    handler: async (args, client) => client.get(`/mcp/products/${args.product_id}/images`),
  },
  {
    name: 'bos_product_count',
    description: 'Get total product count with optional filters',
    schema: { status: { type: 'string', optional: true } },
    handler: async (args, client) => client.get('/mcp/products/count', args),
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
    handler: async (args, client) => client.get('/mcp/orders', args),
  },
  {
    name: 'bos_order_show',
    description: 'Get order details by ID',
    schema: { order_id: { type: 'string' } },
    handler: async (args, client) => client.get(`/mcp/orders/${args.order_id}`),
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
    handler: async (args, client) => client.post('/mcp/orders', args),
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
      return client.put(`/mcp/orders/${order_id}/status`, { status });
    },
  },
  {
    name: 'bos_order_cancel',
    description: 'Cancel an order',
    schema: { order_id: { type: 'string' }, reason: { type: 'string', optional: true } },
    handler: async (args, client) => {
      const { order_id, reason } = args;
      return client.post(`/mcp/orders/${order_id}/cancel`, { reason });
    },
  },
  {
    name: 'bos_order_count_by_status',
    description: 'Get order counts grouped by status',
    schema: {},
    handler: async (_, client) => client.get('/mcp/orders/count-by-status'),
  },
  {
    name: 'bos_order_search',
    description: 'Search orders by invoice number or customer name',
    schema: { q: { type: 'string' } },
    handler: async (args, client) => client.get('/mcp/orders/search', args),
  },
  {
    name: 'bos_order_transactions',
    description: 'Get payment transactions for an order',
    schema: { order_id: { type: 'string' } },
    handler: async (args, client) => client.get(`/mcp/orders/${args.order_id}/transactions`),
  },
  {
    name: 'bos_order_shipping_info',
    description: 'Get shipping information for an order',
    schema: { order_id: { type: 'string' } },
    handler: async (args, client) => client.get(`/mcp/orders/${args.order_id}/shipping`),
  },
  {
    name: 'bos_order_update_shipping',
    description: 'Update shipping status for an order',
    schema: {
      order_id: { type: 'string' },
      shipping_status: { type: 'string', enum: ['pending', 'shipped', 'delivered', 'returned'] },
      tracking_number: { type: 'string', optional: true },
    },
    handler: async (args, client) => {
      const { order_id, ...data } = args;
      return client.put(`/mcp/orders/${order_id}/shipping`, data);
    },
  },
  {
    name: 'bos_order_add_note',
    description: 'Add a staff note to an order',
    schema: { order_id: { type: 'string' }, note: { type: 'string' } },
    handler: async (args, client) => client.post(`/mcp/orders/${args.order_id}/notes`, { note: args.note }),
  },
  {
    name: 'bos_order_refund',
    description: 'Process a refund for an order',
    schema: {
      order_id: { type: 'string' },
      amount: { type: 'number', optional: true },
      reason: { type: 'string', optional: true },
    },
    handler: async (args, client) => {
      const { order_id, ...data } = args;
      return client.post(`/mcp/orders/${order_id}/refund`, data);
    },
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
    handler: async (_, client) => client.get('/mcp/cart'),
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
    handler: async (args, client) => client.post('/mcp/cart/items', args),
  },
  {
    name: 'bos_cart_update_item',
    description: 'Update cart item quantity',
    schema: { item_id: { type: 'string' }, quantity: { type: 'number' } },
    handler: async (args, client) => {
      const { item_id, ...data } = args;
      return client.put(`/mcp/cart/items/${item_id}`, data);
    },
  },
  {
    name: 'bos_cart_remove_item',
    description: 'Remove item from cart',
    schema: { item_id: { type: 'string' } },
    handler: async (args, client) => client.delete(`/mcp/cart/items/${args.item_id}`),
  },
  {
    name: 'bos_cart_clear',
    description: 'Clear all items from cart',
    schema: {},
    handler: async (_, client) => client.delete('/mcp/cart'),
  },
  {
    name: 'bos_cart_apply_voucher',
    description: 'Apply voucher code to cart',
    schema: { voucher_code: { type: 'string' } },
    handler: async (args, client) => client.post('/mcp/cart/apply-voucher', args),
  },
  {
    name: 'bos_cart_remove_voucher',
    description: 'Remove voucher from cart',
    schema: {},
    handler: async (_, client) => client.delete('/mcp/cart/voucher'),
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
    handler: async (args, client) => client.get('/mcp/customers', args),
  },
  {
    name: 'bos_customer_show',
    description: 'Get customer details by ID',
    schema: { customer_id: { type: 'string' } },
    handler: async (args, client) => client.get(`/mcp/customers/${args.customer_id}`),
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
    handler: async (args, client) => client.post('/mcp/customers', args),
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
      return client.put(`/mcp/customers/${customer_id}`, data);
    },
  },
  {
    name: 'bos_customer_delete',
    description: 'Delete a customer',
    schema: { customer_id: { type: 'string' } },
    handler: async (args, client) => client.delete(`/mcp/customers/${args.customer_id}`),
  },
  {
    name: 'bos_customer_search',
    description: 'Search customers by name, phone or email',
    schema: { q: { type: 'string' } },
    handler: async (args, client) => client.get('/mcp/customers/search', args),
  },
  {
    name: 'bos_customer_orders',
    description: 'Get order history for a customer',
    schema: { customer_id: { type: 'string' } },
    handler: async (args, client) => client.get(`/mcp/customers/${args.customer_id}/orders`),
  },
  {
    name: 'bos_customer_transactions',
    description: 'Get payment transactions for a customer',
    schema: { customer_id: { type: 'string' } },
    handler: async (args, client) => client.get(`/mcp/customers/${args.customer_id}/transactions`),
  },
  {
    name: 'bos_customer_address_list',
    description: 'List all addresses for a customer',
    schema: { customer_id: { type: 'string' } },
    handler: async (args, client) => client.get(`/mcp/customers/${args.customer_id}/addresses`),
  },
  {
    name: 'bos_customer_address_create',
    description: 'Add a new address for a customer',
    schema: {
      customer_id: { type: 'string' },
      address_line_1: { type: 'string' },
      city: { type: 'string', optional: true },
      state: { type: 'string', optional: true },
      country: { type: 'string', optional: true },
      zip_code: { type: 'string', optional: true },
    },
    handler: async (args, client) => {
      const { customer_id, ...data } = args;
      return client.post(`/mcp/customers/${customer_id}/addresses`, data);
    },
  },
  {
    name: 'bos_customer_address_update',
    description: 'Update a customer address',
    schema: {
      customer_id: { type: 'string' },
      address_id: { type: 'string' },
      address_line_1: { type: 'string', optional: true },
      city: { type: 'string', optional: true },
      state: { type: 'string', optional: true },
    },
    handler: async (args, client) => {
      const { customer_id, address_id, ...data } = args;
      return client.put(`/mcp/customers/${customer_id}/addresses/${address_id}`, data);
    },
  },
  {
    name: 'bos_customer_address_delete',
    description: 'Delete a customer address',
    schema: { customer_id: { type: 'string' }, address_id: { type: 'string' } },
    handler: async (args, client) => client.delete(`/mcp/customers/${args.customer_id}/addresses/${args.address_id}`),
  },
  {
    name: 'bos_customer_loyalty_summary',
    description: 'Get loyalty points summary for a customer',
    schema: { customer_id: { type: 'string' } },
    handler: async (args, client) => client.get(`/mcp/customers/${args.customer_id}/loyalty`),
  },
  {
    name: 'bos_customer_count',
    description: 'Get total customer count with optional filters',
    schema: { status: { type: 'string', optional: true } },
    handler: async (args, client) => client.get('/mcp/customers/count', args),
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
    handler: async (args, client) => client.get('/mcp/inventory', args),
  },
  {
    name: 'bos_inventory_check',
    description: 'Check stock quantity for a product',
    schema: { product_id: { type: 'string' } },
    handler: async (args, client) => client.get(`/mcp/inventory/check/${args.product_id}`),
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
    handler: async (args, client) => client.post('/mcp/inventory/update', args),
  },
  {
    name: 'bos_inventory_low_stock',
    description: 'Get products with low stock alerts',
    schema: { threshold: { type: 'number', optional: true } },
    handler: async (args, client) => client.get('/mcp/inventory/low-stock', args),
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
    handler: async (args, client) => client.get('/mcp/vouchers', args),
  },
  {
    name: 'bos_voucher_validate',
    description: 'Validate a voucher code',
    schema: { code: { type: 'string' } },
    handler: async (args, client) => client.post('/mcp/vouchers/validate', args),
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
    handler: async (args, client) => client.post('/mcp/vouchers', args),
  },
  {
    name: 'bos_customer_vouchers',
    description: 'Get vouchers for current customer',
    schema: { status: { type: 'string', enum: ['available', 'used', 'expired'], optional: true } },
    handler: async (args, client) => client.get('/mcp/customer/vouchers', args),
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
    handler: async (args, client) => client.get(`/mcp/loyalty/${args.customer_id}/balance`),
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
      return client.get(`/mcp/loyalty/${customer_id}/history`, params);
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
    handler: async (args, client) => client.post('/mcp/loyalty/earn', args),
  },
  {
    name: 'bos_loyalty_redeem',
    description: 'Redeem loyalty points',
    schema: {
      customer_id: { type: 'string' },
      points: { type: 'number' },
      reward_id: { type: 'string', optional: true },
    },
    handler: async (args, client) => client.post('/mcp/loyalty/redeem', args),
  },
  {
    name: 'bos_loyalty_tiers',
    description: 'Get loyalty tier information',
    schema: {},
    handler: async (_, client) => client.get('/mcp/loyalty/tiers'),
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
    handler: async (_, client) => client.get('/mcp/stores'),
  },
  {
    name: 'bos_store_show',
    description: 'Get store details',
    schema: { store_id: { type: 'string' } },
    handler: async (args, client) => client.get(`/mcp/stores/${args.store_id}`),
  },
  {
    name: 'bos_store_nearby',
    description: 'Find nearby stores by location',
    schema: {
      latitude: { type: 'number' },
      longitude: { type: 'number' },
      radius: { type: 'number', optional: true },
    },
    handler: async (args, client) => client.get('/mcp/stores/nearby', args),
  },
  {
    name: 'bos_store_staff',
    description: 'Get staff members for a store',
    schema: { store_id: { type: 'string' } },
    handler: async (args, client) => client.get(`/mcp/stores/${args.store_id}/staff`),
  },
  {
    name: 'bos_store_inventory',
    description: 'Get inventory summary for a specific store',
    schema: { store_id: { type: 'string' } },
    handler: async (args, client) => client.get(`/mcp/stores/${args.store_id}/inventory`),
  },
  {
    name: 'bos_business_info',
    description: 'Get business/shop settings and profile information',
    schema: {},
    handler: async (_, client) => client.get('/mcp/business/info'),
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
    handler: async (args, client) => client.post('/mcp/checkout/calculate', args),
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
    handler: async (args, client) => client.post('/mcp/checkout/create', args),
  },
  {
    name: 'bos_payment_methods',
    description: 'Get available payment methods',
    schema: {},
    handler: async (_, client) => client.get('/mcp/payment-methods'),
  },
  {
    name: 'bos_payment_verify',
    description: 'Verify payment status',
    schema: { order_id: { type: 'string' } },
    handler: async (args, client) => client.get(`/mcp/payments/verify/${args.order_id}`),
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
    handler: async (args, client) => client.get('/mcp/promotions', args),
  },
  {
    name: 'bos_promotion_show',
    description: 'Get promotion details',
    schema: { promotion_id: { type: 'string' } },
    handler: async (args, client) => client.get(`/mcp/promotions/${args.promotion_id}`),
  },
  {
    name: 'bos_promotion_apply',
    description: 'Apply promotion to order',
    schema: { promotion_id: { type: 'string' }, order_id: { type: 'string' } },
    handler: async (args, client) => client.post('/mcp/promotions/apply', args),
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
    handler: async (_, client) => client.get('/mcp/home'),
  },
  {
    name: 'bos_banners',
    description: 'Get promotional banners',
    schema: { location: { type: 'string', optional: true } },
    handler: async (args, client) => client.get('/mcp/banners', args),
  },
  {
    name: 'bos_notifications',
    description: 'Get user notifications',
    schema: {
      page: { type: 'number', optional: true },
      unread_only: { type: 'boolean', optional: true },
    },
    handler: async (args, client) => client.get('/mcp/notifications', args),
  },
  {
    name: 'bos_notification_mark_read',
    description: 'Mark notification as read',
    schema: { notification_id: { type: 'string' } },
    handler: async (args, client) => client.post(`/mcp/notifications/${args.notification_id}/read`),
  },
];
