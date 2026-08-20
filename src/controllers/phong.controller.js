import { phongService } from "../services/phong.service.js";
import { responseSuccess } from "../common/helper/response.helper.js";

export const phongController = {
  async layDanhSach(req, res, next) {
    const result = await phongService.layDanhSach();
    const response = responseSuccess(result, "Lấy danh sách phòng thành công", 200);
    res.status(response.statusCode).json(response);
  },

  async taoPhong(req, res, next) {
    const result = await phongService.taoPhong(req);
    const response = responseSuccess(result, "Tạo phòng thành công", 200);
    res.status(response.statusCode).json(response);
  },

  async layPhongTheoViTri(req, res, next) {
    const result = await phongService.layPhongTheoViTri(req);
    const response = responseSuccess(result, "Lấy phòng theo vị trí thành công", 200);
    res.status(response.statusCode).json(response);
  },

  async phanTrangTimKiem(req, res, next) {
    const result = await phongService.phanTrangTimKiem(req);
    const response = responseSuccess(result, "Tìm kiếm phân trang phòng thành công", 200);
    res.status(response.statusCode).json(response);
  },

  async layTheoId(req, res, next) {
    const result = await phongService.layTheoId(req);
    const response = responseSuccess(result, "Lấy thông tin phòng chi tiết thành công", 200);
    res.status(response.statusCode).json(response);
  },

  async capNhatPhong(req, res, next) {
    const result = await phongService.capNhatPhong(req);
    const response = responseSuccess(result, "Cập nhật thông tin phòng thành công", 200);
    res.status(response.statusCode).json(response);
  },

  async xoaPhong(req, res, next) {
    await phongService.xoaPhong(req);
    const response = responseSuccess(null, "Xóa phòng thành công", 200);
    res.status(response.statusCode).json(response);
  },

  async uploadHinhPhong(req, res, next) {
    const result = await phongService.uploadHinhPhong(req);
    const response = responseSuccess(result, "Tải lên hình ảnh phòng thành công", 200);
    res.status(response.statusCode).json(response);
  }
};