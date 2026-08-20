import { prisma } from "../common/prisma/connect.prisma.js";
import { NotFoundError, BadRequestError } from "../common/helper/exception.helper.js";
import bcrypt from "bcrypt";

// Helper chuyển đổi Model Database sang định dạng API
const mapUserToApi = (u) => ({
  id: u.id,
  name: u.name,
  email: u.email,
  phone: u.phone,
  birthday: u.birth_day,
  gender: u.gender === "true" || u.gender === "1",
  role: u.role
});

export const nguoiDungService = {
  // 1. Lấy danh sách toàn bộ người dùng
  async layDanhSach() {
    const list = await prisma.nguoiDung.findMany();
    return list.map(mapUserToApi);
  },

  // 2. Tạo người dùng mới (Thường dành cho Admin)
  async taoNguoiDung(req) {
    const { name, email, password, phone, birthday, gender, role } = req.body;

    const existUser = await prisma.nguoiDung.findUnique({ where: { email } });
    if (existUser) {
      throw new BadRequestError("Email này đã được sử dụng!");
    }

    const hashPassword = bcrypt.hashSync(password, 10);
    const newUser = await prisma.nguoiDung.create({
      data: {
        name,
        email,
        pass_word: hashPassword,
        phone,
        birth_day: birthday,
        gender: String(gender),
        role: role || "user"
      }
    });
    return mapUserToApi(newUser);
  },

  // 3. Xóa người dùng (Nhận id qua query parameter)
  async xoaNguoiDung(req) {
    const { id } = req.query;

    const existUser = await prisma.nguoiDung.findUnique({
      where: { id: Number(id) }
    });
    if (!existUser) {
      throw new NotFoundError("Người dùng không tồn tại!");
    }

    await prisma.nguoiDung.delete({
      where: { id: Number(id) }
    });
    return true;
  },

  // 4. Phân trang tìm kiếm người dùng
  async phanTrangTimKiem(req) {
    const { pageIndex, pageSize, keyword } = req.query;

    const skip = (Number(pageIndex) - 1) * Number(pageSize);
    const take = Number(pageSize);
    const where = keyword ? {
      name: {
        contains: keyword
      }
    } : {};

    const [totalRow, data] = await prisma.$transaction([
      prisma.nguoiDung.count({ where }),
      prisma.nguoiDung.findMany({
        where,
        skip,
        take
      })
    ]);

    return {
      pageIndex: Number(pageIndex),
      pageSize: Number(pageSize),
      totalRow,
      data: data.map(mapUserToApi)
    };
  },

  // 5. Lấy thông tin chi tiết người dùng theo ID
  async layTheoId(req) {
    const { id } = req.params;

    const u = await prisma.nguoiDung.findUnique({
      where: { id: Number(id) }
    });
    if (!u) {
      throw new NotFoundError("Người dùng không tồn tại!");
    }
    return mapUserToApi(u);
  },

  // 6. Cập nhật thông tin người dùng theo ID
  async capNhatNguoiDung(req) {
    const { id } = req.params;
    const { name, email, phone, birthday, gender, role } = req.body;

    const existUser = await prisma.nguoiDung.findUnique({
      where: { id: Number(id) }
    });
    if (!existUser) {
      throw new NotFoundError("Người dùng không tồn tại!");
    }

    // Kiểm tra trùng email nếu thay đổi email
    if (email && email !== existUser.email) {
      const emailExist = await prisma.nguoiDung.findUnique({ where: { email } });
      if (emailExist) {
        throw new BadRequestError("Email này đã được sử dụng!");
      }
    }

    const updatedUser = await prisma.nguoiDung.update({
      where: { id: Number(id) },
      data: {
        name,
        email,
        phone,
        birth_day: birthday,
        gender: gender !== undefined ? String(gender) : undefined,
        role
      }
    });
    return mapUserToApi(updatedUser);
  },

  // 7. Tìm kiếm danh sách người dùng theo tên
  async timKiemTheoTen(req) {
    const { TenNguoiDung } = req.params;

    const list = await prisma.nguoiDung.findMany({
      where: {
        name: {
          contains: TenNguoiDung
        }
      }
    });
    return list.map(mapUserToApi);
  },

  // 8. Upload hình ảnh đại diện (avatar)
  async uploadAvatar(req) {
    if (!req.file) {
      throw new BadRequestError("Vui lòng tải lên một tập tin hình ảnh!");
    }

    const imagePath = `images/${req.file.filename}`;
    
    // DB không có cột avatar, ta trả về thông tin ảnh đã upload thành công
    return {
      userId: req.user.id,
      avatar: imagePath
    };
  }
};