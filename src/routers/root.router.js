import express from "express";
import authRouter from "./auth.router.js"; 
import binhLuanRouter from "./binhluan.router.js";
import datPhongRouter from "./datphong.router.js";
import phongRouter from "./phong.router.js";
import viTriRouter from "./vitri.router.js";
import nguoiDungRouter from "./nguoidung.router.js";

const rootRouter = express.Router();

// Đăng ký route cho module auth
rootRouter.use("/auth", authRouter); 

rootRouter.use("/binh-luan", binhLuanRouter);

rootRouter.use("/dat-phong", datPhongRouter);

rootRouter.use("/phong-thue", phongRouter); 

rootRouter.use("/vi-tri", viTriRouter);

rootRouter.use("/users", nguoiDungRouter);

export default rootRouter;