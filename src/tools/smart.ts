import { McpTool } from './index.js';

export const smartTools: McpTool[] = [
  {
    name: 'bos_smart_orders_summary',
    description: 'Tổng hợp doanh thu, AOV, phân bổ trạng thái/nguồn/lý do huỷ, và so sánh với kỳ trước. Rất hữu ích cho báo cáo tổng quan.',
    schema: {
      start_date: { type: 'string', description: 'Ngày bắt đầu (YYYY-MM-DD)' },
      end_date: { type: 'string', description: 'Ngày kết thúc (YYYY-MM-DD)' },
      compare_previous: { type: 'boolean', description: 'So sánh với kỳ trước đó' }
    },
    handler: async (args, client) => client.get('/api/mcp/smart/orders/summary', args),
  },
  {
    name: 'bos_smart_top_products',
    description: 'Lấy top N sản phẩm theo doanh thu, số lượng bán, bao gồm chi tiết hiệu suất từng phân loại (variant).',
    schema: {
      limit: { type: 'number', description: 'Số lượng sản phẩm cần lấy (mặc định 10)' },
      sort_by: { type: 'string', description: 'Sắp xếp theo doanh thu hoặc số lượng' },
      start_date: { type: 'string', description: 'Ngày bắt đầu (YYYY-MM-DD)' },
      end_date: { type: 'string', description: 'Ngày kết thúc (YYYY-MM-DD)' }
    },
    handler: async (args, client) => client.get('/api/mcp/smart/products/top', args),
  },
  {
    name: 'bos_smart_order_cycle_time',
    description: 'Phân tích thời gian xử lý đơn hàng (từ lúc tạo đến xác nhận, đóng gói, giao hàng) để tìm ra điểm nghẽn.',
    schema: {
      start_date: { type: 'string', description: 'Ngày bắt đầu (YYYY-MM-DD)' },
      end_date: { type: 'string', description: 'Ngày kết thúc (YYYY-MM-DD)' }
    },
    handler: async (args, client) => client.get('/api/mcp/smart/orders/cycle-time', args),
  },
  {
    name: 'bos_smart_customer_segments',
    description: 'Phân tích RFM (Recency, Frequency, Monetary) chia khách hàng thành 8 tập (segments) kèm gợi ý hành động marketing.',
    schema: {},
    handler: async (_, client) => client.get('/api/mcp/smart/customers/segments'),
  },
  {
    name: 'bos_smart_inventory_health',
    description: 'Phân loại tình trạng kho hàng: out_of_stock, low, dead (tồn kho khó bán), healthy.',
    schema: {
      store_id: { type: 'number', description: 'ID cửa hàng/kho cần kiểm tra' }
    },
    handler: async (args, client) => client.get('/api/mcp/smart/inventory/health', args),
  },
  {
    name: 'bos_smart_stock_reorder_plan',
    description: 'Dự báo tốc độ bán hàng (DSR), điểm đặt hàng lại (reorder point) và số lượng đề xuất nhập cho từng sản phẩm.',
    schema: {
      store_id: { type: 'number', description: 'ID cửa hàng/kho cần kiểm tra' },
      days_to_cover: { type: 'number', description: 'Số ngày tồn kho mục tiêu (mặc định 30)' }
    },
    handler: async (args, client) => client.get('/api/mcp/smart/inventory/reorder-plan', args),
  },
  {
    name: 'bos_smart_inventory_imbalance',
    description: 'Phát hiện sự mất cân bằng tồn kho giữa các chi nhánh và đề xuất chuyển kho nội bộ.',
    schema: {},
    handler: async (_, client) => client.get('/api/mcp/smart/inventory/imbalance'),
  }
];
