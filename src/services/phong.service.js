import { prisma } from "../common/prisma/connect.prisma.js";
import { NotFoundError, BadRequestError } from "../common/helper/exception.helper.js";

// Helper map dữ liệu database sang API format
const mapPhongToApi = (p) => ({
  id: p.id,
  tenPhong: p.ten_phong,
  khach: p.khach,
  phongNgu: p.phong_ngu,
  giuong: p.giuong,
  phongTam: p.phong_tam,
  moTa: p.mo_ta,
  giaTien: p.gia_tien,
  mayGiat: p.may_giat,
  banLa: p.ban_la,
  tivi: p.tivi,
  dieuHoa: p.dieu_hoa,
  wifi: p.wifi,
  bep: p.bep,
  doXe: p.do_xe,
  hoBoi: p.ho_boi,
  banUi: p.ban_ui,
  hinhAnh: p.hinh_anh,
  maViTri: p.ma_vi_tri
});

export const phongService = {
  // 1. Lấy tất cả phòng thuê
  async layDanhSach() {
    const list = await prisma.phong.findMany();
    return list.map(mapPhongToApi);
  },

  // 2. Tạo phòng thuê mới
  async taoPhong(req) {
    const { tenPhong, khach, phongNgu, giuong, phongTam, moTa, giaTien, mayGiat, banLa, tivi, dieuHoa, wifi, bep, doXe, hoBoi, banUi, maViTri, hinhAnh } = req.body;

    const newP = await prisma.phong.create({
      data: {
        ten_phong: tenPhong,
        khach: khach ? Number(khach) : undefined,
        phong_ngu: phongNgu ? Number(phongNgu) : undefined,
        giuong: giuong ? Number(giuong) : undefined,
        phong_tam: phongTam ? Number(phongTam) : undefined,
        mo_ta: moTa,
        gia_tien: giaTien ? Number(giaTien) : undefined,
        may_giat: mayGiat,
        ban_la: banLa,
        tivi: tivi,
        dieu_hoa: dieuHoa,
        wifi: wifi,
        bep: bep,
        do_xe: doXe,
        ho_boi: hoBoi,
        ban_ui: banUi,
        ma_vi_tri: maViTri ? Number(maViTri) : undefined,
        hinh_anh: hinhAnh
      }
    });
    return mapPhongToApi(newP);
  },

  // 3. Lấy phòng theo vị trí
  async layPhongTheoViTri(req) {
    const { maViTri } = req.query;
    
    const list = await prisma.phong.findMany({
      where: {
        ma_vi_tri: Number(maViTri)
      }
    });
    return list.map(mapPhongToApi);
  },

  // 4. Phân trang tìm kiếm phòng
  async phanTrangTimKiem(req) {
    const { pageIndex, pageSize, keyword } = req.query;
    
    const skip = (Number(pageIndex) - 1) * Number(pageSize);
    const take = Number(pageSize);
    const where = keyword ? {
      ten_phong: {
        contains: keyword
      }
    } : {};

    const [totalRow, data] = await prisma.$transaction([
      prisma.phong.count({ where }),
      prisma.phong.findMany({
        where,
        skip,
        take
      })
    ]);

    return {
      pageIndex: Number(pageIndex),
      pageSize: Number(pageSize),
      totalRow,
      data: data.map(mapPhongToApi)
    };
  },

  // 5. Lấy phòng theo ID
  async layTheoId(req) {
    const { id } = req.params;

    const p = await prisma.phong.findUnique({
      where: { id: Number(id) }
    });
    if (!p) {
      throw new NotFoundError("Phòng không tồn tại!");
    }
    return mapPhongToApi(p);
  },

  // 6. Cập nhật phòng
  async capNhatPhong(req) {
    const { id } = req.params;
    const { tenPhong, khach, phongNgu, giuong, phongTam, moTa, giaTien, mayGiat, banLa, tivi, dieuHoa, wifi, bep, doXe, hoBoi, banUi, maViTri, hinhAnh } = req.body;

    const existP = await prisma.phong.findUnique({
      where: { id: Number(id) }
    });
    if (!existP) {
      throw new NotFoundError("Phòng không tồn tại!");
    }

    const updatedP = await prisma.phong.update({
      where: { id: Number(id) },
      data: {
        ten_phong: tenPhong,
        khach: khach ? Number(khach) : undefined,
        phong_ngu: phongNgu ? Number(phongNgu) : undefined,
        giuong: giuong ? Number(giuong) : undefined,
        phong_tam: phongTam ? Number(phongTam) : undefined,
        mo_ta: moTa,
        gia_tien: giaTien ? Number(giaTien) : undefined,
        may_giat: mayGiat,
        ban_la: banLa,
        tivi: tivi,
        dieu_hoa: dieuHoa,
        wifi: wifi,
        bep: bep,
        do_xe: doXe,
        ho_boi: hoBoi,
        ban_ui: banUi,
        ma_vi_tri: maViTri ? Number(maViTri) : undefined,
        hinh_anh: hinhAnh
      }
    });
    return mapPhongToApi(updatedP);
  },

  // 7. Xóa phòng
  async xoaPhong(req) {
    const { id } = req.params;

    const existP = await prisma.phong.findUnique({
      where: { id: Number(id) }
    });
    if (!existP) {
      throw new NotFoundError("Phòng không tồn tại!");
    }

    await prisma.phong.delete({
      where: { id: Number(id) }
    });
    return true;
  },

  // 8. Upload hình ảnh cho phòng
  async uploadHinhPhong(req) {
    const { maPhong } = req.query;
    if (!req.file) {
      throw new BadRequestError("Vui lòng tải lên một tập tin hình ảnh!");
    }

    const existP = await prisma.phong.findUnique({
      where: { id: Number(maPhong) }
    });
    if (!existP) {
      throw new NotFoundError("Phòng không tồn tại!");
    }

    const imagePath = `images/${req.file.filename}`;
    const updatedP = await prisma.phong.update({
      where: { id: Number(maPhong) },
      data: {
        hinh_anh: imagePath
      }
    });
    return mapPhongToApi(updatedP);
  }
};