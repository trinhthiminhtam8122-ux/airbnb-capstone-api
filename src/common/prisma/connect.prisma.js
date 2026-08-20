import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "./generated/client/index.js";
import { DATABASE_URL } from "../constant/app.constant.js";

const url = new URL(DATABASE_URL);

// Khởi tạo bộ adapter kết nối MySQL từ chuỗi DATABASE_URL
const adapter = new PrismaMariaDb({
  host: url.hostname,
  user: url.username,
  password: url.password,
  database: url.pathname.substring(1),
  port: Number(url.port) || 3306,
  connectionLimit: 5,
});

// Truyền adapter vào PrismaClient (Đúng chuẩn Prisma 7 yêu cầu)
const prisma = new PrismaClient({
  adapter,
});

// Kiểm tra kết nối database khi chạy server
try {
  await prisma.$queryRaw`SELECT 1+1 AS result`;
  console.log("[PRISMA] Kết nối MySQL Database thành công!");
} catch (error) {
  console.error("[PRISMA] Lỗi kết nối Database:", error);
}

export { prisma };