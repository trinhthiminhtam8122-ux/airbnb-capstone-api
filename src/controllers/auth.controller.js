import { authService } from "../services/auth.service.js";
import { responseSuccess } from "../common/helper/response.helper.js";

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax",
  secure: false, // development: false
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
};

export const authController = {
  // Controller đăng ký
  async signup(req, res, next) {
    const result = await authService.signup(req);
    const response = responseSuccess(result, "Đăng ký thành công", 200);
    res.status(response.statusCode).json(response);
  },

  // Controller đăng nhập
  async signin(req, res, next) {
    const { accessToken, refreshToken } = await authService.signin(req);

    // Lưu token vào Cookies bảo mật
    res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
    res.cookie("accessToken", accessToken, COOKIE_OPTIONS);

    const response = responseSuccess(
      { accessToken },
      "Đăng nhập thành công"
    );
    res.status(response.statusCode).json(response);
  },
};