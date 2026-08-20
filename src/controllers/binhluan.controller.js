import { binhLuanService } from "../services/binhluan.service.js";
import { responseSuccess } from "../common/helper/response.helper.js";

export const binhLuanController = {
  async layDanhSach(req, res, next) {
    const result = await binhLuanService.layDanhSach();
    const response = responseSuccess(result, "Lấy danh sách bình luận thành công", 200);
    res.status(response.statusCode).json(response);
  },

  async taoBinhLuan(req, res, next) {
    const result = await binhLuanService.taoBinhLuan(req);
    const response = responseSuccess(result, "Tạo bình luận thành công", 200);
    res.status(response.statusCode).json(response);
  },

  async capNhatBinhLuan(req, res, next) {
    const result = await binhLuanService.capNhatBinhLuan(req);
    const response = responseSuccess(result, "Cập nhật bình luận thành công", 200);
    res.status(response.statusCode).json(response);
  },

  async xoaBinhLuan(req, res, next) {
    await binhLuanService.xoaBinhLuan(req);
    const response = responseSuccess(null, "Xóa bình luận thành công", 200);
    res.status(response.statusCode).json(response);
  },

  async layBinhLuanTheoPhong(req, res, next) {
    const result = await binhLuanService.layBinhLuanTheoPhong(req);
    const response = responseSuccess(result, "Lấy bình luận theo phòng thành công", 200);
    res.status(response.statusCode).json(response);
  }
};