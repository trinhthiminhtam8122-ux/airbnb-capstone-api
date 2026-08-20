import { prisma } from "../common/prisma/connect.prisma.js";
import { NotFoundError, BadRequestError } from "../common/helper/exception.helper.js";

// Helper map dữ liệu từ Database sang API format
const mapViTriToApi = (vt) => ({
  id: vt.id,
  tenViTri: vt.ten_vi_tri,
  tinhThanh: vt.tinh_thanh,
  quocGia: vt.quoc_gia,
  hinhAnh: vt.hinh_anh
});

export const viTriService = {
  // 1. Lấy toàn bộ danh sách vị trí
  async layDanhSach() {
    const list = await prisma.viTri.findMany();
    return list.map(mapViTriToApi);
  },

  // 2. Tạo vị trí mới
  async taoViTri(req) {
    const { tenViTri, tinhThanh, quocGia, hinhAnh } = req.body;

    const newVt = await prisma.viTri.create({
      data: {
        ten_vi_tri: tenViTri,
        tinh_thanh: tinhThanh,
        quoc_gia: quocGia,
        hinh_anh: hinhAnh
      }
    });
    return mapViTriToApi(newVt);
  },

  // 3. Phân trang tìm kiếm vị trí
  async phanTrangTimKiem(req) {
    const { pageIndex, pageSize, keyword } = req.query;

    const skip = (Number(pageIndex) - 1) * Number(pageSize);
    const take = Number(pageSize);
    const where = keyword ? {
      ten_vi_tri: {
        contains: keyword
      }
    } : {};

    const [totalRow, data] = await prisma.$transaction([
      prisma.viTri.count({ where }),
      prisma.viTri.findMany({
        where,
        skip,
        take
      })
    ]);

    return {
      pageIndex: Number(pageIndex),
      pageSize: Number(pageSize),
      totalRow,
      data: data.map(mapViTriToApi)
    };
  },

  // 4. Lấy vị trí theo ID
  async layTheoId(req) {
    const { id } = req.params;

    const vt = await prisma.viTri.findUnique({
      where: { id: Number(id) }
    });
    if (!vt) {
      throw new NotFoundError("Vị trí không tồn tại!");
    }
    return mapViTriToApi(vt);
  },

  // 5. Cập nhật vị trí
  async capNhatViTri(req) {
    const { id } = req.params;
    const { tenViTri, tinhThanh, quocGia, hinhAnh } = req.body;

    const existVt = await prisma.viTri.findUnique({
      where: { id: Number(id) }
    });
    if (!existVt) {
      throw new NotFoundError("Vị trí không tồn tại!");
    }

    const updatedVt = await prisma.viTri.update({
      where: { id: Number(id) },
      data: {
        ten_vi_tri: tenViTri,
        tinh_thanh: tinhThanh,
        quoc_gia: quocGia,
        hinh_anh: hinhAnh
      }
    });
    return mapViTriToApi(updatedVt);
  },

  // 6. Xóa vị trí
  async xoaViTri(req) {
    const { id } = req.params;

    const existVt = await prisma.viTri.findUnique({
      where: { id: Number(id) }
    });
    if (!existVt) {
      throw new NotFoundError("Vị trí không tồn tại!");
    }

    await prisma.viTri.delete({
      where: { id: Number(id) }
    });
    return true;
  },

  // 7. Upload hình ảnh cho vị trí
  async uploadHinhViTri(req) {
    const { maViTri } = req.query;
    if (!req.file) {
      throw new BadRequestError("Vui lòng tải lên một hình ảnh!");
    }

    const existVt = await prisma.viTri.findUnique({
      where: { id: Number(maViTri) }
    });
    if (!existVt) {
      throw new NotFoundError("Vị trí không tồn tại!");
    }

    const imagePath = `images/${req.file.filename}`;
    const updatedVt = await prisma.viTri.update({
      where: { id: Number(maViTri) },
      data: {
        hinh_anh: imagePath
      }
    });
    return mapViTriToApi(updatedVt);
  }
};