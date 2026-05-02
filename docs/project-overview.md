# BOS MCP Server - Project Overview

## Mục tiêu

Tạo MCP server cho phép AI assistants (Claude, Cursor, Trae) tương tác trực tiếp với BOS ERP System qua REST API, giống như Haravan-MCP cho Haravan e-commerce.

## Architecture

```
AI Assistant (Claude/Cursor/Trae)
         │
         ▼ JSON-RPC 2.0
┌─────────────────────────┐
│    BOS MCP Server       │
│  ┌─────────────────┐   │
│  │ Tool Registry   │   │
│  │ 69 tools       │   │
│  └─────────────────┘   │
│  ┌─────────────────┐   │
│  │ HTTP Client     │   │
│  │ Rate Limiter    │   │
│  │ Retry Logic     │   │
│  └─────────────────┘   │
└─────────────────────────┘
         │
         ▼ REST API
┌─────────────────────────┐
│   BOS Laravel Backend   │
│   Modules/ZaloMiniapp   │
└─────────────────────────┘
```

## Module Structure

```
boscli-mcp/
├── src/
│   ├── index.ts          # Main MCP server (stdio)
│   ├── stdio.ts         # Stdio transport handler
│   ├── http.ts          # HTTP server mode
│   ├── config/
│   │   └── index.ts    # Configuration
│   ├── client/
│   │   └── index.ts    # BosApiClient with rate limiting
│   └── tools/
│       ├── index.ts     # Tool types & exports
│       ├── health.ts    # Health check tools
│       ├── module.ts    # Module management tools
│       ├── route.ts     # Route tools
│       ├── cache.ts     # Cache tools
│       ├── system.ts    # System info tools
│       └── miniapp.ts   # All MiniApp tools
├── dist/                # Compiled output
├── tests/
├── docs/
├── package.json
├── tsconfig.json
└── README.md
```

## API Endpoints

Tất cả tools map đến REST API endpoints trên BOS:

| Category | Base Path | Methods |
|----------|-----------|---------|
| Health | `/api/boscli/health/*` | GET |
| Modules | `/api/boscli/modules/*` | GET, POST |
| Routes | `/api/boscli/routes/*` | GET |
| Cache | `/api/boscli/cache/*` | GET, POST |
| System | `/api/boscli/system/*` | GET |
| Products | `/api/miniapp/products/*` | GET, POST, PUT, DELETE |
| Orders | `/api/miniapp/orders/*` | GET, POST, PUT |
| Cart | `/api/miniapp/cart/*` | GET, POST, PUT, DELETE |
| Customers | `/api/miniapp/customers/*` | GET, POST, PUT |
| Inventory | `/api/miniapp/inventory/*` | GET, POST |
| Vouchers | `/api/miniapp/vouchers/*` | GET, POST |
| Loyalty | `/api/miniapp/loyalty/*` | GET, POST |
| Stores | `/api/miniapp/stores/*` | GET |
| Checkout | `/api/miniapp/checkout/*` | POST, GET |
| Promotions | `/api/miniapp/promotions/*` | GET, POST |
| Engagement | `/api/miniapp/*` | GET, POST |

## Rate Limiting

- Token bucket: 60 requests/minute
- Exponential backoff: 1s, 2s, 3s retry
- Timeout: 30s default

## Development

```bash
# Build
npm run build

# Watch mode
npm run dev

# Test
npm test
```

## Deployment Options

1. **Local** - Chạy trực tiếp với node
2. **Docker** - Containerized deployment
3. **Claude Code** - stdio mode integration
4. **HTTP Server** - Remote AI assistants
