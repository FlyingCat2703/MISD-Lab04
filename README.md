# MISD Lab04 - Task Management Application

Ứng dụng quản lý task cá nhân với React (TypeScript) và ASP.NET Core Web API.
<br>
Thông tin sinh viên
<br>
22127101 - Lý Ngọc Hân
## 📋 Mô tả

Ứng dụng quản lý task cho phép:
- ✅ Thêm, sửa, xóa task
- ✅ Tìm kiếm và lọc task theo trạng thái, độ ưu tiên, ngày
- ✅ Phân trang dữ liệu
- ✅ Xem chi tiết task
- ✅ Cập nhật trạng thái task nhanh chóng

## 🛠️ Công nghệ sử dụng

### Backend (TaskApi)
- **Framework**: ASP.NET Core 9.0
- **Database**: MySQL
- **ORM**: Entity Framework Core
- **Port**: `http://localhost:5010`

### Frontend (task-client)
- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **UI**: CSS Modules
- **HTTP Client**: Axios
- **Port**: `http://localhost:5173` (mặc định)

## 📦 Cài đặt

### 1. Yêu cầu hệ thống

- **Node.js**: >= 18.x
- **.NET SDK**: >= 9.0
- **MySQL**: >= 8.0

### 2. Cài đặt Backend (TaskApi)

#### 2.1. Cấu hình Database

Tạo file `appsettings.json` trong thư mục `TaskApi/` (hoặc sửa file có sẵn):

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "DBConnection": "server=localhost;port=3306;database=studentdb;user=root;password=YOUR_PASSWORD"
  }
}
```

**Lưu ý**: Thay `YOUR_PASSWORD` bằng mật khẩu MySQL của bạn.

#### 2.2. Tạo Database

```bash
cd TaskApi
dotnet ef database update
```

Lệnh này sẽ tạo database `studentdb` và các bảng cần thiết.

#### 2.3. Chạy Backend

```bash
dotnet run
```

Backend sẽ chạy tại: `http://localhost:5010`

**API Endpoints**:
- `GET /api/tasks/filter` - Lấy danh sách task (có phân trang và filter)
- `GET /api/tasks/{id}` - Lấy chi tiết task
- `POST /api/tasks` - Tạo task mới
- `PUT /api/tasks/{id}` - Cập nhật task
- `DELETE /api/tasks/{id}` - Xóa task

### 3. Cài đặt Frontend (task-client)

#### 3.1. Cài đặt dependencies

```bash
cd task-client
npm install
```

#### 3.2. Cấu hình môi trường

Tạo file `.env` trong thư mục `task-client/`:

```env
VITE_API_BASE_URL=http://localhost:5010/api
```

**Lưu ý**: Nếu backend chạy ở port khác, cập nhật URL cho phù hợp.

#### 3.3. Chạy Frontend

```bash
npm run dev
```

Frontend sẽ chạy tại: `http://localhost:5173` (hoặc port khác nếu 5173 đã được sử dụng)

## 🚀 Chạy toàn bộ ứng dụng

### Cách 1: Chạy thủ công (2 terminal)

**Terminal 1 - Backend**:
```bash
cd TaskApi
dotnet run
```

**Terminal 2 - Frontend**:
```bash
cd task-client
npm run dev
```

### Cách 2: Chạy từ root folder

**PowerShell**:
```powershell
# Terminal 1 - Backend
cd TaskApi; dotnet run

# Terminal 2 - Frontend  
cd task-client; npm run dev
```

## 📝 Cấu trúc dự án

```
MISD-Lab04/
├── TaskApi/                      # Backend API
│   ├── Controllers/              # API Controllers
│   ├── Data/                     # DbContext
│   ├── Enums/                    # TaskStatus, Priority
│   ├── Models/                   # Entity models & DTOs
│   ├── Services/                 # Business logic
│   ├── Repositories/             # Data access layer
│   ├── Migrations/               # EF Core migrations
│   ├── appsettings.json          # Cấu hình DB & app
│   └── Program.cs                # Entry point
│
├── task-client/                  # Frontend React
│   ├── src/
│   │   ├── components/           # React components
│   │   ├── pages/                # Pages (TaskList)
│   │   ├── services/             # API service (axios)
│   │   ├── types/                # TypeScript types
│   │   ├── utils/                # Utility functions
│   │   └── styles/               # Global styles
│   ├── .env                      # ⚙️ Environment variables
│   ├── package.json              # Dependencies
│   └── vite.config.ts            # Vite configuration
│
└── README.md                     # 📖 Hướng dẫn này
```

## 🔧 Cấu hình quan trọng

### Backend Configuration

**File**: `TaskApi/appsettings.json`

```json
{
  "ConnectionStrings": {
    "DBConnection": "server=localhost;port=3306;database=studentdb;user=root;password=YOUR_PASSWORD"
  }
}
```

**Port**: Được cấu hình trong `TaskApi/Properties/launchSettings.json`
```json
{
  "profiles": {
    "http": {
      "applicationUrl": "http://localhost:5010"
    }
  }
}
```

### Frontend Configuration

**File**: `task-client/.env`

```env
# API Base URL
VITE_API_BASE_URL=http://localhost:5010/api
```

**Port**: Mặc định của Vite là 5173, có thể thay đổi trong `vite.config.ts`:

```typescript
export default defineConfig({
  server: {
    port: 3000  // Thay đổi port nếu cần
  }
})
```

## 🗄️ Database Schema

### Bảng Tasks

| Column      | Type         | Description                    |
|-------------|--------------|--------------------------------|
| Id          | int          | Primary key (auto-increment)   |
| Title       | varchar(255) | Tên task                       |
| Description | text         | Mô tả chi tiết                 |
| DueDate     | datetime     | Ngày hết hạn                   |
| Status      | int          | 0=Pending, 1=InProgress, 2=Completed, 3=Cancelled |
| Priority    | int          | 0=Low, 1=Medium, 2=High        |
| CreatedAt   | datetime     | Thời gian tạo                  |

## 🔍 Troubleshooting

### Backend không kết nối được Database

1. Kiểm tra MySQL đang chạy:
   ```bash
   mysql -u root -p
   ```

2. Kiểm tra connection string trong `appsettings.json`

3. Chạy lại migrations:
   ```bash
   dotnet ef database drop
   dotnet ef database update
   ```

### Frontend không gọi được API

1. Kiểm tra backend đang chạy tại `http://localhost:5010`

2. Kiểm tra file `.env` có đúng URL không

3. Kiểm tra CORS trong backend (đã được cấu hình sẵn)

### Port bị trùng

**Backend**: Thay đổi port trong `TaskApi/Properties/launchSettings.json`

**Frontend**: Thay đổi port trong `vite.config.ts` hoặc chạy:
```bash
npm run dev -- --port 3000