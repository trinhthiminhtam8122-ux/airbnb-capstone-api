import { viTriService } from "../services/vitri.service.js";
import { responseSuccess } from "../common/helper/response.helper.js";

export const viTriController = {
  async layDanhSach(req, res, next) {
    const result = await viTriService.layDanhSach();
    const response = responseSuccess(result, "Lấy danh sách vị trí thành công", 200);
    res.status(response.statusCode).json(response);
  },

  async taoViTri(req, res, next) {
    const result = await viTriService.taoViTri(req);
    const response = responseSuccess(result, "Tạo vị trí thành công", 200);
    res.status(response.statusCode).json(response);
  },

  async phanTrangTimKiem(req, res, next) {
    const result = await viTriService.phanTrangTimKiem(req);
    const response = responseSuccess(result, "Phân trang tìm kiếm vị trí thành công", 200);
    res.status(response.statusCode).json(response);
  },

  async layTheoId(req, res, next) {
    const result = await viTriService.layTheoId(req);
    const response = responseSuccess(result, "Lấy chi tiết vị trí thành công", 200);
    res.status(response.statusCode).json(response);
  },

  async capNhatViTri(req, res, next) {
    const result = await viTriService.capNhatViTri(req);
    const response = responseSuccess(result, "Cập nhật vị trí thành công", 200);
    res.status(response.statusCode).json(response);
  },

  async xoaViTri(req, res, next) {
    await viTriService.xoaViTri(req);
    const response = responseSuccess(null, "Xóa vị trí thành công", 200);
    res.status(response.statusCode).json(response);
  },

  async uploadHinhViTri(req, res, next) {
    const result = await viTriService.uploadHinhViTri(req);
    const response = responseSuccess(result, "Tải lên hình ảnh vị trí thành công", 200);
    res.status(response.statusCode).json(response);
  }
};