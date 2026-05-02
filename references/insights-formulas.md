# Insights & Formulas

Tài liệu này chứa các công thức và metrics tiêu chuẩn để đánh giá hiệu suất kinh doanh trên nền tảng BOS. Sử dụng các công thức này khi phân tích dữ liệu từ các Smart Tools.

## 1. Order Operations (Vận hành Đơn hàng)

- **ODR (Order Defect Rate - Tỷ lệ đơn lỗi)**:
  `(Số đơn bị huỷ do lỗi Shop + Số đơn trả hàng / Tổng số đơn) * 100`
- **Revenue at Risk (Doanh thu rủi ro)**:
  `Tổng giá trị các đơn hàng đang bị kẹt (stuck) hoặc giao quá hạn > 3 ngày`
- **Order Cycle Time (Thời gian quay vòng đơn)**:
  `Thời gian từ lúc Khách đặt -> Xác nhận -> Đóng gói -> Xuất kho -> Giao thành công`

## 2. Inventory Intelligence (Phân tích Kho hàng)

- **ABC-FSN Analysis**: Phân loại mức độ quan trọng (A, B, C dựa trên Doanh thu) và Tốc độ luân chuyển (Fast, Slow, Non-moving dựa trên tần suất xuất kho).
- **DSR (Daily Sales Rate - Tốc độ bán/ngày)**:
  `Tổng lượng bán trong 30 ngày / 30`
- **DOS (Days of Sales - Số ngày tồn kho)**:
  `Tồn kho hiện tại / DSR`
- **GMROI (Gross Margin Return on Inventory Investment)**:
  `Lợi nhuận gộp / Giá trị tồn kho trung bình`

## 3. Customer Analytics (Phân tích Khách hàng)

- **RFM Scoring**:
  - **Recency**: Thời gian kể từ lần mua cuối
  - **Frequency**: Số lần mua
  - **Monetary**: Tổng giá trị đã mua
  (Chia khách hàng thành 5 quintiles 1-5 cho mỗi chỉ số, tổng điểm 3-15)
- **Purchase Gap Analysis**: Khoảng thời gian trung bình giữa 2 lần mua liên tiếp của khách hàng.
- **Acquisition vs Retention Economics**: So sánh chi phí/doanh thu mang lại giữa Khách hàng mới (Acquisition) và Khách hàng cũ (Retention).

## 4. Product Intelligence (Phân tích Sản phẩm)

- **Catalog Health Score (Thang 0-100)**: Chấm điểm danh mục sản phẩm dựa trên 12 tiêu chí (có hình ảnh, mô tả > 50 từ, có variant rõ ràng, tỷ lệ chuyển đổi, tỷ lệ hoàn...).
- **Variant Performance Matrix**: Phân tích đóng góp của từng biến thể (màu sắc, kích thước) vào tổng doanh thu của Sản phẩm cha.
- **Price-Volume Curve**: Biểu đồ đánh giá mức độ co giãn của giá bán so với số lượng bán ra.
