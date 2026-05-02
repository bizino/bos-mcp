# BOS MCP - Claude Skill

Bộ não phân tích dành cho Claude, kết hợp với các `Smart Tools` của BOS MCP Server để giúp AI phân tích dữ liệu eCommerce một cách hiệu quả, tiết kiệm token và đưa ra insight chuyên sâu.

## 1. Token Efficiency — Lý do tồn tại

Việc gọi trực tiếp hàng tá API cơ bản (Base Tools) để lấy dữ liệu sẽ tiêu tốn quá nhiều Token và vượt quá ngữ cảnh (context window) của AI. Giải pháp của chúng tôi:
Sử dụng **Smart Tools** (Aggregation APIs) trên BOS kết hợp với Claude Skill.

| Kịch bản | Không tối ưu (Dùng Base Tools) | Có Skill + Smart Tools | Tiết kiệm |
| :--- | :--- | :--- | :--- |
| "Doanh thu tháng này" | 17 API calls, ~250,000 tokens | 1 tool call, ~300 tokens | 99.9% |
| "Top 10 sản phẩm" | 17+342 calls, ~800,000 tokens | 1 tool call, ~500 tokens | 99.9% |
| "Phân tích RFM khách hàng" | 50+ calls, ~500,000 tokens | 1 tool call, ~800 tokens | 99.8% |
| "Tổng quan cửa hàng" | 100+ calls, ~1,500,000 tokens | 3 calls song song, ~1,200 tokens | 99.9% |

## 2. 10 Kịch bản phân tích có sẵn (Decision Tree)

Khi người dùng hỏi một trong các chủ đề sau, hãy đi theo quy trình (Decision Tree) được định sẵn để thu thập thông tin một cách song song và tối ưu nhất:

1. **Store Pulse — Tổng quan cửa hàng**: Gọi song song `bos_smart_orders_summary`, `bos_smart_top_products`, và `bos_smart_inventory_health`.
2. **Revenue Breakdown — Phân tích đa chiều**: Phân tích kênh, sản phẩm, địa lý (4 calls).
3. **Order Pipeline — Thời gian xử lý & Tắc nghẽn**: Gọi `bos_smart_order_cycle_time` kết hợp `bos_order_count_by_status`.
4. **Stock Health — Sức khỏe Kho hàng**: Phân loại kho, đề xuất nhập (`bos_smart_stock_reorder_plan`), cân bằng đa chi nhánh (`bos_smart_inventory_imbalance`).
5. **Customer RFM — Phân khúc khách hàng**: Phân tích 7/8 segments + marketing actions cho từng segment qua `bos_smart_customer_segments`.
6. **Product Performance — Hiệu suất Sản phẩm**: Best sellers, catalog health, discount ROI qua `bos_smart_top_products`.
7. **Operations Scorecard — Chấm điểm vận hành**: Chấm 10 chỉ số (1-10), highlight top 3 mạnh/yếu.
8. **COD Monitor — Giám sát COD**: Fail rate theo tỉnh, risk scoring.
9. **Smart Search — Tìm kiếm thông minh**: Tìm đơn/khách/sản phẩm bằng ngôn ngữ tự nhiên.
10. **Store Action — Thao tác nhanh**: Khuyến nghị thao tác với bước xác nhận trước khi write/update.

## 3. Tri thức tích hợp

- Xem `references/insights-formulas.md` để áp dụng 20+ công thức (ví dụ: ABC-FSN, DSR/DOS, Catalog Health Score, RFM).
- Xem `references/mcp-tools.md` để so sánh với Benchmarks của ngành E-commerce.

> **Hướng dẫn cho AI (Claude):**
> Trước khi trả lời bất cứ yêu cầu nào liên quan đến Phân Tích, hãy luôn tìm kiếm xem có "Smart Tool" nào có thể gộp data (Aggregate) để tiết kiệm token không. KHÔNG lặp (loop) qua các danh sách API cơ bản (Base Tools) nếu đã có Smart Tool thay thế.
