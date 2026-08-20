import { BadRequestError } from "../common/helper/exception.helper.js";
import {
  signAccessToken,
  signRefreshToken,
} from "../common/helper/jwt.helper.js";
import { prisma } from "../common/prisma/connect.prisma.js";
import bcrypt from "bcrypt";

export const authService = {
  // Nghiệp vụ đăng ký tài khoản
  async signup(req) {
    // Hàm signup:
    const { name, email, password, phone, birthday, gender, role } = req.body;

    // 1. Kiểm tra email đã tồn tại trong DB chưa
    const existingUser = await prisma.nguoiDung.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestError(
        "Email người dùng đã tồn tại, vui lòng đăng nhập!",
      );
    }

    // 2. Mã hóa mật khẩu
    const hashPassword = bcrypt.hashSync(password, 10);

    // 3. Tạo mới người dùng
    const newUser = await prisma.nguoiDung.create({
      data: {
        name,
        email,
        pass_word: hashPassword,
        phone,
        birth_day: birthday,
        gender: String(gender), 
        role: role || "user",
      },
    });

    // 4. Ẩn mật khẩu trước khi trả về dữ liệu cho FE
    const { pass_word, ...userInfo } = newUser;
    return userInfo;
  },

  // Nghiệp vụ đăng nhập
  async signin(req) {
    // Hàm signin:
    const { email, password } = req.body;

    // 1. Kiểm tra email người dùng
    const user = await prisma.nguoiDung.findUnique({
      where: { email },
    });

    if (!user) {
      throw new BadRequestError("Tài khoản hoặc mật khẩu không chính xác!");
    }

    // 2. So sánh mật khẩu băm
    const isPasswordValid = bcrypt.compareSync(password, user.pass_word);
    if (!isPasswordValid) {
      throw new BadRequestError("Tài khoản hoặc mật khẩu không chính xác!");
    }

    // 3. Tạo Access Token & Refresh Token
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
    };
  },
};
