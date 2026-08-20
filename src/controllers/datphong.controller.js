import { datPhongService } from "../services/datphong.service.js";
import { responseSuccess } from "../common/helper/response.helper.js";

export const datPhongController = {
  async layDanhSach(req, res, next) {
    const result = await datPhongService.layDanhSach();
    const response = responseSuccess(result, "Lấy danh sách đặt phòng thành công", 200);
    res.status(response.statusCode).json(response);
  },

  async taoDatPhong(req, res, next) {
    const result = await datPhongService.taoDatPhong(req);
    const response = responseSuccess(result, "Đặt phòng thành công", 200);
    res.status(response.statusCode).json(response);
  },

  async layTheoId(req, res, next) {
    const result = await datPhongService.layTheoId(req);
    const response = responseSuccess(result, "Lấy thông tin đặt phòng thành công", 200);
    res.status(response.statusCode).json(response);
  },

  async capNhatDatPhong(req, res, next) {
    const result = await datPhongService.capNhatDatPhong(req);
    const response = responseSuccess(result, "Cập nhật đặt phòng thành công", 200);
    res.status(response.statusCode).json(response);
  },

  async xoaDatPhong(req, res, next) {
    await datPhongService.xoaDatPhong(req);
    const response = responseSuccess(null, "Xóa thông tin đặt phòng thành công", 200);
    res.status(response.statusCode).json(response);
  },

  async layTheoNguoiDung(req, res, next) {
    const result = await datPhongService.layTheoNguoiDung(req);
    const response = responseSuccess(result, "Lấy danh sách đặt phòng theo người dùng thành công", 200);
    res.status(response.statusCode).json(response);
  }
};