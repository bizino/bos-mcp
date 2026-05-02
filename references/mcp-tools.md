# E-Commerce Benchmarks (Vietnam) & MCP Tools Reference

## 1. Benchmarks ngành (Thị trường Việt Nam)

Dùng các mốc chuẩn này khi phân tích dữ liệu trả về từ các Smart Tools để đưa ra cảnh báo (Red/Yellow/Green) cho người dùng.

| Metric | Tốt (Green) | Trung bình (Yellow) | Cần cải thiện (Red) |
| :--- | :--- | :--- | :--- |
| **Cancel Rate** (Tỷ lệ huỷ đơn) | < 3% | 3 - 5% | > 5% |
| **Repeat Purchase Rate** (Tỷ lệ mua lặp lại) | > 30% | 20 - 30% | < 20% |
| **COD Fail Rate** (Tỷ lệ hoàn COD) | < 15% | 15 - 25% | > 25% |
| **Catalog Health Score** (Điểm chuẩn danh mục) | > 80 | 60 - 80 | < 60 |
| **Discount Penetration** (Tỷ trọng đơn có KM) | 10 - 20% | 20 - 40% | > 40% |

## 2. Base Tools (63 Tools)

Ngoài 7 Smart Tools (`bos_smart_*`), BOS MCP hỗ trợ các nhóm Base Tools dùng để truy xuất/chỉnh sửa dữ liệu chi tiết (CRUD):

- **Customers (14 tools)**: `bos_customer_list`, `bos_customer_show`, `bos_customer_create`, `bos_customer_update`, v.v. (CRUD khách hàng + địa chỉ).
- **Orders (13 tools)**: `bos_order_list`, `bos_order_show`, `bos_order_create`, v.v. (CRUD đơn hàng + transactions).
- **Products (11 tools)**: `bos_product_list`, `bos_product_show`, `bos_product_create`, v.v. (CRUD sản phẩm + variants).
- **Inventory (5 tools)**: `bos_inventory_list`, `bos_inventory_check`, v.v. (Kiểm kho + locations).
- **Shop (6 tools)**: `bos_store_list`, v.v. (Thông tin shop, nhân viên).
- **Vouchers/Promotions (7 tools)**: `bos_voucher_list`, `bos_promotion_list`, v.v. (Khuyến mãi).
- **Loyalty (5 tools)**: `bos_loyalty_points_balance`, v.v. (Điểm thưởng).

> **Ghi chú Token:**
> - Base Tools thích hợp cho thao tác 1:1, chi tiết 1 đối tượng, hoặc lấy < 20 dòng dữ liệu.
> - Nếu người dùng hỏi "Top 10" hay "Phân tích/Tổng kết", HÃY SỬ DỤNG **Smart Tools** thay thế để tránh quá tải API và Token.
