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
- `bos_product_list`, `bos_product_show`, `bos_product_search`
- `bos_product_create`, `bos_product_update`, `bos_product_delete`

### Orders (6 tools)
- `bos_order_list`, `bos_order_show`, `bos_order_create`
- `bos_order_update_status`, `bos_order_cancel`, `bos_order_count_by_status`

### Cart (7 tools)
- `bos_cart_get`, `bos_cart_add_item`, `bos_cart_update_item`
- `bos_cart_remove_item`, `bos_cart_clear`
- `bos_cart_apply_voucher`, `bos_cart_remove_voucher`

### Customers (5 tools)
- `bos_customer_list`, `bos_customer_show`, `bos_customer_create`
- `bos_customer_update`, `bos_customer_orders`

### Inventory (4 tools)
- `bos_inventory_list`, `bos_inventory_check`, `bos_inventory_update`
- `bos_inventory_low_stock`

### Vouchers (4 tools)
- `bos_voucher_list`, `bos_voucher_validate`, `bos_voucher_create`
- `bos_customer_vouchers`

### Loyalty (5 tools)
- `bos_loyalty_points_balance`, `bos_loyalty_points_history`
- `bos_loyalty_earn`, `bos_loyalty_redeem`, `bos_loyalty_tiers`

### Stores (3 tools)
- `bos_store_list`, `bos_store_show`, `bos_store_nearby`

### Checkout & Payment (4 tools)
- `bos_checkout_calculate`, `bos_checkout_create`
- `bos_payment_methods`, `bos_payment_verify`

### Promotions (3 tools)
- `bos_promotion_list`, `bos_promotion_show`, `bos_promotion_apply`

### Home & Engagement (4 tools)
- `bos_home`, `bos_banners`
- `bos_notifications`, `bos_notification_mark_read`

## License

MIT
