import express from "express";
import { nguoiDungController } from "../controllers/nguoidung.controller.js";
import { authMiddleware } from "../common/middleware/auth.middleware.js";
import { uploadDiskStorage } from "../common/middleware/upload.middleware.js";

const nguoiDungRouter = express.Router();

// 1. Lấy tất cả người dùng 
nguoiDungRouter.get("/", nguoiDungController.layDanhSach);

// 2. Thêm người dùng mới 
nguoiDungRouter.post("/", authMiddleware, nguoiDungController.taoNguoiDung);

// 3. Xóa người dùng 
nguoiDungRouter.delete("/", authMiddleware, nguoiDungController.xoaNguoiDung);

// 4. Phân trang tìm kiếm 
nguoiDungRouter.get("/phan-trang-tim-kiem", nguoiDungController.phanTrangTimKiem);

// 5. Lấy người dùng theo ID 
nguoiDungRouter.get("/:id", nguoiDungController.layTheoId);

// 6. Cập nhật người dùng 
nguoiDungRouter.put("/:id", authMiddleware, nguoiDungController.capNhatNguoiDung);

// 7. Tìm kiếm theo tên 
nguoiDungRouter.get("/search/:TenNguoiDung", nguoiDungController.timKiemTheoTen);

// 8. Upload ảnh đại diện 
nguoiDungRouter.post(
  "/upload-avatar",
  authMiddleware,
  uploadDiskStorage.single("avatar"),
  nguoiDungController.uploadAvatar
);

export default nguoiDungRouter;