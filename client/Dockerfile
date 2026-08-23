# Câu 51: Khai báo Node.js Image bản 20
FROM node:20-alpine

# Câu 52: Thiết lập thư mục làm việc bên trong Container
WORKDIR /app

# Câu 53: Sao chép các file package vào Container
COPY package.json package-lock.json ./

# Câu 54: Cài đặt các thư viện cần thiết
RUN npm install

# Câu 55: Sao chép toàn bộ source code React vào Container
COPY . .

# Câu 56 & 57: Build ứng dụng React (tạo ra thư mục dist/build)
RUN npm run build

# --- Cấu hình phần chạy Web Server ---
# Cài đặt một web server nhẹ nhàng (serve) để chạy các file tĩnh vừa build
RUN npm install -g serve

# Mở cổng 3000 để truy cập
EXPOSE 3000

# Khởi động web server, trỏ vào thư mục chứa kết quả build (thường là 'build' hoặc 'dist')
# Ở đây mình giả định thư mục kết quả là 'build'
CMD ["serve", "-s", "dist", "-l", "3000"]