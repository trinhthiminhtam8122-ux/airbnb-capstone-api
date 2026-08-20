import express from "express";
import { phongController } from "../controllers/phong.controller.js";
import { authMiddleware } from "../common/middleware/auth.middleware.js";
import { uploadDiskStorage } from "../common/middleware/upload.middleware.js";

const phongRouter = express.Router();

// Lấy danh sách toàn bộ phòng 
phongRouter.get("/", phongController.layDanhSach);

// Tạo phòng mới 
phongRouter.post("/", authMiddleware, phongController.taoPhong);

// Lấy phòng theo vị trí 
phongRouter.get("/lay-phong-theo-vi-tri", phongController.layPhongTheoViTri);

// Phân trang tìm kiếm phòng 
phongRouter.get("/phan-trang-tim-kiem", phongController.phanTrangTimKiem);

// Lấy phòng theo ID chi tiết 
phongRouter.get("/:id", phongController.layTheoId);

// Cập nhật thông tin phòng 
phongRouter.put("/:id", authMiddleware, phongController.capNhatPhong);

// Xóa phòng 
phongRouter.delete("/:id", authMiddleware, phongController.xoaPhong);

// Upload hình ảnh phòng 
phongRouter.post(
  "/upload-hinh-phong",
  authMiddleware,
  uploadDiskStorage.single("hinhAnh"),
  phongController.uploadHinhPhong
);

export default phongRouter;