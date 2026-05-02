# BOS MCP Server

**MCP (Model Context Protocol) server** cho phép AI assistants (Claude, Cursor, Trae) tương tác trực tiếp với BOS ERP System qua REST API.

## Tính năng

- **69 tools** cho business operations
- TypeScript + Node.js 18+
- Token bucket rate limiting (60 RPM)
- Exponential backoff retry
- Stdio & HTTP transport
- JSON-RPC 2.0

## Cài đặt

```bash
npm install
npm run build
```

## Environment Variables

| Variable | Default | Mô tả |
|----------|---------|--------|
| `BOS_API_URL` | `https://bos.ai.vn/api` | BOS API base URL |
| `BOS_API_TOKEN` | `` | Bearer token cho auth |
| `BOS_API_TIMEOUT` | `30000` | Request timeout (ms) |

## Chạy

```bash
# Stdio mode (default - cho Claude Code)
npm start

# HTTP mode (cho web deployments)
npm run http
```

## Claude Code Integration

```json
{
  "mcpServers": {
    "bos": {
      "command": "node",
      "args": ["/path/to/bos-mcp/dist/index.js"],
      "env": {
        "BOS_API_URL": "https://bos.ai.vn/api"
      }
    }
  }
}
```

## Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json dist/
RUN npm install
CMD ["node", "dist/http.js"]
```

## Tools Categories (69 total)

### Health & Management (18 tools)
- `boscli_health_*` - System health checks
- `boscli_module_*` - Module CRUD
- `boscli_route_*` - Route listing
- `boscli_cache_*` - Cache management
- `boscli_system_*` - System info, logs, git, deploy

### Products (6 tools)
- `miniapp_product_list`, `miniapp_product_show`, `miniapp_product_search`
- `miniapp_product_create`, `miniapp_product_update`, `miniapp_product_delete`

### Orders (6 tools)
- `miniapp_order_list`, `miniapp_order_show`, `miniapp_order_create`
- `miniapp_order_update_status`, `miniapp_order_cancel`, `miniapp_order_count_by_status`

### Cart (7 tools)
- `miniapp_cart_get`, `miniapp_cart_add_item`, `miniapp_cart_update_item`
- `miniapp_cart_remove_item`, `miniapp_cart_clear`
- `miniapp_cart_apply_voucher`, `miniapp_cart_remove_voucher`

### Customers (5 tools)
- `miniapp_customer_list`, `miniapp_customer_show`, `miniapp_customer_create`
- `miniapp_customer_update`, `miniapp_customer_orders`

### Inventory (4 tools)
- `miniapp_inventory_list`, `miniapp_inventory_check`, `miniapp_inventory_update`
- `miniapp_inventory_low_stock`

### Vouchers (4 tools)
- `miniapp_voucher_list`, `miniapp_voucher_validate`, `miniapp_voucher_create`
- `miniapp_customer_vouchers`

### Loyalty (5 tools)
- `miniapp_loyalty_points_balance`, `miniapp_loyalty_points_history`
- `miniapp_loyalty_earn`, `miniapp_loyalty_redeem`, `miniapp_loyalty_tiers`

### Stores (3 tools)
- `miniapp_store_list`, `miniapp_store_show`, `miniapp_store_nearby`

### Checkout & Payment (4 tools)
- `miniapp_checkout_calculate`, `miniapp_checkout_create`
- `miniapp_payment_methods`, `miniapp_payment_verify`

### Promotions (3 tools)
- `miniapp_promotion_list`, `miniapp_promotion_show`, `miniapp_promotion_apply`

### Home & Engagement (4 tools)
- `miniapp_home`, `miniapp_banners`
- `miniapp_notifications`, `miniapp_notification_mark_read`

## License

MIT
