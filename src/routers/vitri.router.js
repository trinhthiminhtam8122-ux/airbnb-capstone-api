import express from "express";
import { viTriController } from "../controllers/vitri.controller.js";
import { authMiddleware } from "../common/middleware/auth.middleware.js";
import { uploadDiskStorage } from "../common/middleware/upload.middleware.js";

const viTriRouter = express.Router();

// Lấy danh sách vị trí 
viTriRouter.get("/", viTriController.layDanhSach);

// Tạo vị trí mới 
viTriRouter.post("/", authMiddleware, viTriController.taoViTri);

// Phân trang tìm kiếm vị trí 
viTriRouter.get("/phan-trang-tim-kiem", viTriController.phanTrangTimKiem);

// Lấy vị trí chi tiết theo ID 
viTriRouter.get("/:id", viTriController.layTheoId);

// Cập nhật vị trí 
viTriRouter.put("/:id", authMiddleware, viTriController.capNhatViTri);

// Xóa vị trí 
viTriRouter.delete("/:id", authMiddleware, viTriController.xoaViTri);

// Upload hình ảnh cho vị trí 
viTriRouter.post(
  "/upload-hinh-vitri",
  authMiddleware,
  uploadDiskStorage.single("hinhAnh"),
  viTriController.uploadHinhViTri
);

export default viTriRouter;