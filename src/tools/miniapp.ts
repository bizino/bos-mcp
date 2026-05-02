import { BosApiClient } from '../client';
import { McpTool } from './index';

// MiniApp Product Tools
export const productTools: McpTool[] = [
  {
    name: 'miniapp_product_list',
    description: 'List products with pagination and filters',
    schema: {
      page: { type: 'number', optional: true },
      page_size: { type: 'number', optional: true },
      category_id: { type: 'string', optional: true },
      search: { type: 'string', optional: true },
      status: { type: 'string', enum: ['active', 'inactive'], optional: true },
    },
    handler: async (args, client) => client.get('/miniapp/products'),
  },
  {
    name: 'miniapp_product_show',
    description: 'Get product details by ID',
    schema: { product_id: { type: 'string', description: 'Product ID' } },
    handler: async (args, client) => client.get(`/miniapp/products/${args.product_id}`),
  },
  {
    name: 'miniapp_product_search',
    description: 'Search products by name, SKU, or bar code',
    schema: { q: { type: 'string', description: 'Search query' } },
    handler: async (args, client) => client.get('/miniapp/products/search'),
  },
  {
    name: 'miniapp_product_categories',
    description: 'Get all product categories',
    schema: {},
    handler: async (_, client) => client.get('/miniapp/categories'),
  },
  {
    name: 'miniapp_product_create',
    description: 'Create a new product',
    schema: {
      name: { type: 'string' },
      sku: { type: 'string', optional: true },
      price: { type: 'number' },
      category_id: { type: 'string', optional: true },
      stock: { type: 'number', optional: true },
      description: { type: 'string', optional: true },
    },
    handler: async (args, client) => client.post('/miniapp/products', args),
  },
  {
    name: 'miniapp_product_update',
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
      return client.put(`/miniapp/products/${product_id}`, data);
    },
  },
  {
    name: 'miniapp_product_delete',
    description: 'Delete a product',
    schema: { product_id: { type: 'string' } },
    handler: async (args, client) => client.delete(`/miniapp/products/${args.product_id}`),
  },
];

// MiniApp Order Tools
export const orderTools: McpTool[] = [
  {
    name: 'miniapp_order_list',
    description: 'List orders with filters',
    schema: {
      page: { type: 'number', optional: true },
      page_size: { type: 'number', optional: true },
      status: { type: 'string', optional: true },
      from_date: { type: 'string', optional: true },
      to_date: { type: 'string', optional: true },
    },
    handler: async (args, client) => client.get('/miniapp/orders'),
  },
  {
    name: 'miniapp_order_show',
    description: 'Get order details by ID',
    schema: { order_id: { type: 'string' } },
    handler: async (args, client) => client.get(`/miniapp/orders/${args.order_id}`),
  },
  {
    name: 'miniapp_order_create',
    description: 'Create a new order',
    schema: {
      customer_id: { type: 'string' },
      items: { type: 'array', items: { type: 'object' } },
      shipping_address: { type: 'object', optional: true },
      payment_method: { type: 'string', optional: true },
      note: { type: 'string', optional: true },
    },
    handler: async (args, client) => client.post('/miniapp/orders', args),
  },
  {
    name: 'miniapp_order_update_status',
    description: 'Update order status',
    schema: {
      order_id: { type: 'string' },
      status: { type: 'string', enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'] },
    },
    handler: async (args, client) => {
      const { order_id, status } = args;
      return client.put(`/miniapp/orders/${order_id}/status`, { status });
    },
  },
  {
    name: 'miniapp_order_cancel',
    description: 'Cancel an order',
    schema: { order_id: { type: 'string' }, reason: { type: 'string', optional: true } },
    handler: async (args, client) => {
      const { order_id, reason } = args;
      return client.post(`/miniapp/orders/${order_id}/cancel`, { reason });
    },
  },
  {
    name: 'miniapp_order_count_by_status',
    description: 'Get order counts grouped by status',
    schema: {},
    handler: async (_, client) => client.get('/miniapp/orders/count-by-status'),
  },
];

// MiniApp Cart Tools
export const cartTools: McpTool[] = [
  {
    name: 'miniapp_cart_get',
    description: 'Get current user cart',
    schema: {},
    handler: async (_, client) => client.get('/miniapp/cart'),
  },
  {
    name: 'miniapp_cart_add_item',
    description: 'Add item to cart',
    schema: {
      product_id: { type: 'string' },
      quantity: { type: 'number' },
      variant_id: { type: 'string', optional: true },
      notes: { type: 'string', optional: true },
    },
    handler: async (args, client) => client.post('/miniapp/cart/items', args),
  },
  {
    name: 'miniapp_cart_update_item',
    description: 'Update cart item quantity',
    schema: { item_id: { type: 'string' }, quantity: { type: 'number' } },
    handler: async (args, client) => {
      const { item_id, ...data } = args;
      return client.put(`/miniapp/cart/items/${item_id}`, data);
    },
  },
  {
    name: 'miniapp_cart_remove_item',
    description: 'Remove item from cart',
    schema: { item_id: { type: 'string' } },
    handler: async (args, client) => client.delete(`/miniapp/cart/items/${args.item_id}`),
  },
  {
    name: 'miniapp_cart_clear',
    description: 'Clear all items from cart',
    schema: {},
    handler: async (_, client) => client.delete('/miniapp/cart'),
  },
  {
    name: 'miniapp_cart_apply_voucher',
    description: 'Apply voucher code to cart',
    schema: { voucher_code: { type: 'string' } },
    handler: async (args, client) => client.post('/miniapp/cart/apply-voucher', args),
  },
  {
    name: 'miniapp_cart_remove_voucher',
    description: 'Remove voucher from cart',
    schema: {},
    handler: async (_, client) => client.delete('/miniapp/cart/voucher'),
  },
];

// MiniApp Customer Tools
export const customerTools: McpTool[] = [
  {
    name: 'miniapp_customer_list',
    description: 'List customers with pagination',
    schema: {
      page: { type: 'number', optional: true },
      page_size: { type: 'number', optional: true },
      search: { type: 'string', optional: true },
    },
    handler: async (args, client) => client.get('/miniapp/customers'),
  },
  {
    name: 'miniapp_customer_show',
    description: 'Get customer details by ID',
    schema: { customer_id: { type: 'string' } },
    handler: async (args, client) => client.get(`/miniapp/customers/${args.customer_id}`),
  },
  {
    name: 'miniapp_customer_create',
    description: 'Create a new customer',
    schema: {
      name: { type: 'string' },
      phone: { type: 'string' },
      email: { type: 'string', optional: true },
      address: { type: 'string', optional: true },
    },
    handler: async (args, client) => client.post('/miniapp/customers', args),
  },
  {
    name: 'miniapp_customer_update',
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
      return client.put(`/miniapp/customers/${customer_id}`, data);
    },
  },
  {
    name: 'miniapp_customer_orders',
    description: 'Get order history for a customer',
    schema: { customer_id: { type: 'string' } },
    handler: async (args, client) => client.get(`/miniapp/customers/${args.customer_id}/orders`),
  },
];

// MiniApp Inventory Tools
export const inventoryTools: McpTool[] = [
  {
    name: 'miniapp_inventory_list',
    description: 'List inventory stock across all products',
    schema: {
      page: { type: 'number', optional: true },
      page_size: { type: 'number', optional: true },
      warehouse_id: { type: 'string', optional: true },
    },
    handler: async (args, client) => client.get('/miniapp/inventory'),
  },
  {
    name: 'miniapp_inventory_check',
    description: 'Check stock quantity for a product',
    schema: { product_id: { type: 'string' } },
    handler: async (args, client) => client.get(`/miniapp/inventory/check/${args.product_id}`),
  },
  {
    name: 'miniapp_inventory_update',
    description: 'Update inventory stock',
    schema: {
      product_id: { type: 'string' },
      quantity: { type: 'number' },
      type: { type: 'string', enum: ['set', 'add', 'subtract'] },
      reason: { type: 'string', optional: true },
    },
    handler: async (args, client) => client.post('/miniapp/inventory/update', args),
  },
  {
    name: 'miniapp_inventory_low_stock',
    description: 'Get products with low stock alerts',
    schema: { threshold: { type: 'number', optional: true } },
    handler: async (args, client) => client.get('/miniapp/inventory/low-stock'),
  },
];

// MiniApp Voucher Tools
export const voucherTools: McpTool[] = [
  {
    name: 'miniapp_voucher_list',
    description: 'List available vouchers',
    schema: {
      page: { type: 'number', optional: true },
      page_size: { type: 'number', optional: true },
      status: { type: 'string', optional: true },
    },
    handler: async (args, client) => client.get('/miniapp/vouchers'),
  },
  {
    name: 'miniapp_voucher_validate',
    description: 'Validate a voucher code',
    schema: { code: { type: 'string' } },
    handler: async (args, client) => client.post('/miniapp/vouchers/validate', args),
  },
  {
    name: 'miniapp_voucher_create',
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
    handler: async (args, client) => client.post('/miniapp/vouchers', args),
  },
  {
    name: 'miniapp_customer_vouchers',
    description: 'Get vouchers for current customer',
    schema: { status: { type: 'string', enum: ['available', 'used', 'expired'], optional: true } },
    handler: async (args, client) => client.get('/miniapp/customer/vouchers'),
  },
];

// MiniApp Loyalty Tools
export const loyaltyTools: McpTool[] = [
  {
    name: 'miniapp_loyalty_points_balance',
    description: 'Get loyalty points balance for customer',
    schema: { customer_id: { type: 'string' } },
    handler: async (args, client) => client.get(`/miniapp/loyalty/${args.customer_id}/balance`),
  },
  {
    name: 'miniapp_loyalty_points_history',
    description: 'Get loyalty points transaction history',
    schema: {
      customer_id: { type: 'string' },
      page: { type: 'number', optional: true },
      page_size: { type: 'number', optional: true },
    },
    handler: async (args, client) => client.get(`/miniapp/loyalty/${args.customer_id}/history`),
  },
  {
    name: 'miniapp_loyalty_earn',
    description: 'Earn loyalty points',
    schema: {
      customer_id: { type: 'string' },
      points: { type: 'number' },
      order_id: { type: 'string', optional: true },
      description: { type: 'string', optional: true },
    },
    handler: async (args, client) => client.post('/miniapp/loyalty/earn', args),
  },
  {
    name: 'miniapp_loyalty_redeem',
    description: 'Redeem loyalty points',
    schema: {
      customer_id: { type: 'string' },
      points: { type: 'number' },
      reward_id: { type: 'string', optional: true },
    },
    handler: async (args, client) => client.post('/miniapp/loyalty/redeem', args),
  },
  {
    name: 'miniapp_loyalty_tiers',
    description: 'Get loyalty tier information',
    schema: {},
    handler: async (_, client) => client.get('/miniapp/loyalty/tiers'),
  },
];

// MiniApp Store Tools
export const storeTools: McpTool[] = [
  {
    name: 'miniapp_store_list',
    description: 'List all stores locations',
    schema: {},
    handler: async (_, client) => client.get('/miniapp/stores'),
  },
  {
    name: 'miniapp_store_show',
    description: 'Get store details',
    schema: { store_id: { type: 'string' } },
    handler: async (args, client) => client.get(`/miniapp/stores/${args.store_id}`),
  },
  {
    name: 'miniapp_store_nearby',
    description: 'Find nearby stores by location',
    schema: {
      latitude: { type: 'number' },
      longitude: { type: 'number' },
      radius: { type: 'number', optional: true },
    },
    handler: async (args, client) => client.get('/miniapp/stores/nearby'),
  },
];

// MiniApp Checkout Tools
export const checkoutTools: McpTool[] = [
  {
    name: 'miniapp_checkout_calculate',
    description: 'Calculate checkout totals',
    schema: {
      customer_id: { type: 'string' },
      shipping_address_id: { type: 'string', optional: true },
      voucher_code: { type: 'string', optional: true },
    },
    handler: async (args, client) => client.post('/miniapp/checkout/calculate', args),
  },
  {
    name: 'miniapp_checkout_create',
    description: 'Create order from cart',
    schema: {
      customer_id: { type: 'string' },
      shipping_address: { type: 'object' },
      payment_method: { type: 'string' },
      voucher_code: { type: 'string', optional: true },
    },
    handler: async (args, client) => client.post('/miniapp/checkout/create', args),
  },
  {
    name: 'miniapp_payment_methods',
    description: 'Get available payment methods',
    schema: {},
    handler: async (_, client) => client.get('/miniapp/payment-methods'),
  },
  {
    name: 'miniapp_payment_verify',
    description: 'Verify payment status',
    schema: { order_id: { type: 'string' } },
    handler: async (args, client) => client.get(`/miniapp/payments/verify/${args.order_id}`),
  },
];

// MiniApp Promotion Tools
export const promotionTools: McpTool[] = [
  {
    name: 'miniapp_promotion_list',
    description: 'List active promotions and campaigns',
    schema: {
      page: { type: 'number', optional: true },
      page_size: { type: 'number', optional: true },
    },
    handler: async (args, client) => client.get('/miniapp/promotions'),
  },
  {
    name: 'miniapp_promotion_show',
    description: 'Get promotion details',
    schema: { promotion_id: { type: 'string' } },
    handler: async (args, client) => client.get(`/miniapp/promotions/${args.promotion_id}`),
  },
  {
    name: 'miniapp_promotion_apply',
    description: 'Apply promotion to order',
    schema: { promotion_id: { type: 'string' }, order_id: { type: 'string' } },
    handler: async (args, client) => client.post('/miniapp/promotions/apply', args),
  },
];

// MiniApp Home & Engagement Tools
export const engagementTools: McpTool[] = [
  {
    name: 'miniapp_home',
    description: 'Get home page data (banners, categories, featured products)',
    schema: {},
    handler: async (_, client) => client.get('/miniapp/home'),
  },
  {
    name: 'miniapp_banners',
    description: 'Get promotional banners',
    schema: { location: { type: 'string', optional: true } },
    handler: async (args, client) => client.get('/miniapp/banners'),
  },
  {
    name: 'miniapp_notifications',
    description: 'Get user notifications',
    schema: {
      page: { type: 'number', optional: true },
      unread_only: { type: 'boolean', optional: true },
    },
    handler: async (args, client) => client.get('/miniapp/notifications'),
  },
  {
    name: 'miniapp_notification_mark_read',
    description: 'Mark notification as read',
    schema: { notification_id: { type: 'string' } },
    handler: async (args, client) => client.post(`/miniapp/notifications/${args.notification_id}/read`),
  },
];
