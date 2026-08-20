import { prisma } from "../common/prisma/connect.prisma.js";
import { NotFoundError } from "../common/helper/exception.helper.js";

// Helper map dữ liệu từ Database sang API format
const mapDatPhongToApi = (dp) => ({
  id: dp.id,
  maPhong: dp.ma_phong,
  ngayDen: dp.ngay_den,
  ngayDi: dp.ngay_di,
  soLuongKhach: dp.so_luong_khach,
  maNguoiDung: dp.ma_nguoi_dat
});

export const datPhongService = {
  // 1. Lấy danh sách toàn bộ đặt phòng
  async layDanhSach() {
    const list = await prisma.datPhong.findMany();
    return list.map(mapDatPhongToApi);
  },

  // 2. Tạo đặt phòng mới
  async taoDatPhong(req) {
    const { maPhong, ngayDen, ngayDi, soLuongKhach, maNguoiDung } = req.body;

    const newDp = await prisma.datPhong.create({
      data: {
        ma_phong: Number(maPhong),
        ngay_den: new Date(ngayDen),
        ngay_di: new Date(ngayDi),
        so_luong_khach: Number(soLuongKhach),
        ma_nguoi_dat: Number(maNguoiDung)
      }
    });
    return mapDatPhongToApi(newDp);
  },

  // 3. Lấy thông tin đặt phòng theo ID
  async layTheoId(req) {
    const { id } = req.params;

    const dp = await prisma.datPhong.findUnique({
      where: { id: Number(id) }
    });
    if (!dp) {
      throw new NotFoundError("Thông tin đặt phòng không tồn tại!");
    }
    return mapDatPhongToApi(dp);
  },

  // 4. Cập nhật đặt phòng
  async capNhatDatPhong(req) {
    const { id } = req.params;
    const { maPhong, ngayDen, ngayDi, soLuongKhach, maNguoiDung } = req.body;

    const existDp = await prisma.datPhong.findUnique({
      where: { id: Number(id) }
    });
    if (!existDp) {
      throw new NotFoundError("Thông tin đặt phòng không tồn tại!");
    }

    const updatedDp = await prisma.datPhong.update({
      where: { id: Number(id) },
      data: {
        ma_phong: maPhong ? Number(maPhong) : undefined,
        ngay_den: ngayDen ? new Date(ngayDen) : undefined,
        ngay_di: ngayDi ? new Date(ngayDi) : undefined,
        so_luong_khach: soLuongKhach ? Number(soLuongKhach) : undefined,
        ma_nguoi_dat: maNguoiDung ? Number(maNguoiDung) : undefined
      }
    });
    return mapDatPhongToApi(updatedDp);
  },

  // 5. Xóa đặt phòng
  async xoaDatPhong(req) {
    const { id } = req.params;

    const existDp = await prisma.datPhong.findUnique({
      where: { id: Number(id) }
    });
    if (!existDp) {
      throw new NotFoundError("Thông tin đặt phòng không tồn tại!");
    }

    await prisma.datPhong.delete({
      where: { id: Number(id) }
    });
    return true;
  },

  // 6. Lấy danh sách đặt phòng theo mã người dùng
  async layTheoNguoiDung(req) {
    const { MaNguoiDung } = req.params;

    const list = await prisma.datPhong.findMany({
      where: {
        ma_nguoi_dat: Number(MaNguoiDung)
      }
    });
    return list.map(mapDatPhongToApi);
  }
};