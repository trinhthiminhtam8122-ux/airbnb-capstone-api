import express from "express";
import { datPhongController } from "../controllers/datphong.controller.js";
import { authMiddleware } from "../common/middleware/auth.middleware.js";

const datPhongRouter = express.Router();

// Lấy danh sách đặt phòng 
datPhongRouter.get("/", datPhongController.layDanhSach);

// Đặt phòng mới 
datPhongRouter.post("/", authMiddleware, datPhongController.taoDatPhong);

// Lấy thông tin đặt phòng theo ID 
datPhongRouter.get("/:id", datPhongController.layTheoId);

// Cập nhật đặt phòng 
datPhongRouter.put("/:id", authMiddleware, datPhongController.capNhatDatPhong);

// Xóa đặt phòng 
datPhongRouter.delete("/:id", authMiddleware, datPhongController.xoaDatPhong);

// Lấy danh sách đặt phòng theo mã người dùng 
datPhongRouter.get("/lay-theo-nguoi-dung/:MaNguoiDung", datPhongController.layTheoNguoiDung);

export default datPhongRouter;