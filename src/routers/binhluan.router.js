import express from "express";
import { binhLuanController } from "../controllers/binhluan.controller.js";
import { authMiddleware } from "../common/middleware/auth.middleware.js";

const binhLuanRouter = express.Router();

// Lấy danh sách bình luận 
binhLuanRouter.get("/", binhLuanController.layDanhSach);

// Tạo bình luận mới 
binhLuanRouter.post("/", authMiddleware, binhLuanController.taoBinhLuan);

// Cập nhật bình luận 
binhLuanRouter.put("/:id", authMiddleware, binhLuanController.capNhatBinhLuan);

// Xóa bình luận
binhLuanRouter.delete("/:id", authMiddleware, binhLuanController.xoaBinhLuan);

// Lấy bình luận theo mã phòng 
binhLuanRouter.get("/lay-binh-luan-theo-phong/:MaPhong", binhLuanController.layBinhLuanTheoPhong);

export default binhLuanRouter;