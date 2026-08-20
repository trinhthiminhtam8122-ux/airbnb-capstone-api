import { prisma } from "../common/prisma/connect.prisma.js";
import { NotFoundError } from "../common/helper/exception.helper.js";

// Hàm chuyển đổi dữ liệu từ Database sang API format
const mapBinhLuanToApi = (bl) => ({
  id: bl.id,
  maPhong: bl.ma_cong_viec,
  maNguoiBinhLuan: bl.ma_nguoi_binh_luan,
  ngayBinhLuan: bl.ngay_binh_luan,
  noiDung: bl.noi_dung,
  saoBinhLuan: bl.sao_binh_luan
});

export const binhLuanService = {
  // 1. Lấy danh sách toàn bộ bình luận
  async layDanhSach() {
    const list = await prisma.binhLuan.findMany();
    return list.map(mapBinhLuanToApi);
  },

  // 2. Tạo bình luận mới
  async taoBinhLuan(req) {
    const { maPhong, maNguoiBinhLuan, ngayBinhLuan, noiDung, saoBinhLuan } = req.body;
    
    const newBl = await prisma.binhLuan.create({
      data: {
        ma_cong_viec: Number(maPhong),
        ma_nguoi_binh_luan: Number(maNguoiBinhLuan),
        ngay_binh_luan: ngayBinhLuan ? new Date(ngayBinhLuan) : new Date(),
        noi_dung: noiDung,
        sao_binh_luan: Number(saoBinhLuan)
      }
    });
    return mapBinhLuanToApi(newBl);
  },

  // 3. Cập nhật bình luận
  async capNhatBinhLuan(req) {
    const { id } = req.params;
    const { maPhong, maNguoiBinhLuan, ngayBinhLuan, noiDung, saoBinhLuan } = req.body;

    const existBl = await prisma.binhLuan.findUnique({
      where: { id: Number(id) }
    });
    if (!existBl) {
      throw new NotFoundError("Bình luận không tồn tại!");
    }

    const updatedBl = await prisma.binhLuan.update({
      where: { id: Number(id) },
      data: {
        ma_cong_viec: maPhong ? Number(maPhong) : undefined,
        ma_nguoi_binh_luan: maNguoiBinhLuan ? Number(maNguoiBinhLuan) : undefined,
        ngay_binh_luan: ngayBinhLuan ? new Date(ngayBinhLuan) : undefined,
        noi_dung: noiDung,
        sao_binh_luan: saoBinhLuan ? Number(saoBinhLuan) : undefined
      }
    });
    return mapBinhLuanToApi(updatedBl);
  },

  // 4. Xóa bình luận
  async xoaBinhLuan(req) {
    const { id } = req.params;

    const existBl = await prisma.binhLuan.findUnique({
      where: { id: Number(id) }
    });
    if (!existBl) {
      throw new NotFoundError("Bình luận không tồn tại!");
    }

    await prisma.binhLuan.delete({
      where: { id: Number(id) }
    });
    return true;
  },

  // 5. Lấy bình luận theo mã phòng
  async layBinhLuanTheoPhong(req) {
    const { MaPhong } = req.params;
    
    const list = await prisma.binhLuan.findMany({
      where: {
        ma_cong_viec: Number(MaPhong)
      }
    });
    return list.map(mapBinhLuanToApi);
  }
};