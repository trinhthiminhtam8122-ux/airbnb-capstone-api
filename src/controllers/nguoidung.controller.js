import { nguoiDungService } from "../services/nguoidung.service.js"; 
import { responseSuccess } from "../common/helper/response.helper.js";

export const nguoiDungController = {
  async layDanhSach(req, res, next) {
    const result = await nguoiDungService.layDanhSach();
    const response = responseSuccess(result, "Lấy danh sách người dùng thành công", 200);
    res.status(response.statusCode).json(response);
  },

  async taoNguoiDung(req, res, next) {
    const result = await nguoiDungService.taoNguoiDung(req);
    const response = responseSuccess(result, "Tạo người dùng thành công", 200);
    res.status(response.statusCode).json(response);
  },

  async xoaNguoiDung(req, res, next) {
    await nguoiDungService.xoaNguoiDung(req);
    const response = responseSuccess(null, "Xóa người dùng thành công", 200);
    res.status(response.statusCode).json(response);
  },

  async phanTrangTimKiem(req, res, next) {
    const result = await nguoiDungService.phanTrangTimKiem(req);
    const response = responseSuccess(result, "Phân trang tìm kiếm thành công", 200);
    res.status(response.statusCode).json(response);
  },

  async layTheoId(req, res, next) {
    const result = await nguoiDungService.layTheoId(req);
    const response = responseSuccess(result, "Lấy thông tin người dùng thành công", 200);
    res.status(response.statusCode).json(response);
  },

  async capNhatNguoiDung(req, res, next) {
    const result = await nguoiDungService.capNhatNguoiDung(req);
    const response = responseSuccess(result, "Cập nhật người dùng thành công", 200);
    res.status(response.statusCode).json(response);
  },

  async timKiemTheoTen(req, res, next) {
    const result = await nguoiDungService.timKiemTheoTen(req);
    const response = responseSuccess(result, "Tìm kiếm người dùng thành công", 200);
    res.status(response.statusCode).json(response);
  },

  async uploadAvatar(req, res, next) {
    const result = await nguoiDungService.uploadAvatar(req);
    const response = responseSuccess(result, "Tải lên ảnh đại diện thành công", 200);
    res.status(response.statusCode).json(response);
  }
};