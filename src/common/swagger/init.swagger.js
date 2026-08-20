import { authSwagger } from "./auth.swagger.js";
import { binhLuanSwagger } from "./binhluan.swagger.js";
import { datPhongSwagger } from "./datphong.swagger.js";
import { phongSwagger } from "./phong.swagger.js";
import { viTriSwagger } from "./vitri.swagger.js";
import { nguoiDungSwagger } from "./nguoidung.swagger.js";

export const swaggerDocument = {
  openapi: "3.0.3", 
  info: {
    title: "Airbnb Capstone API - Cybersoft",
    description: "",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3069", 
      description: "Local dev server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    // Định nghĩa các Models 
    schemas: {
      ThongTinNguoiDung: {
        type: "object",
        properties: {
          id: { type: "integer", format: "int32", example: 0 },
          name: { type: "string", example: "Nguyen Van A" },
          email: { type: "string", example: "vana@gmail.com" },
          password: { type: "string", example: "123456" },
          phone: { type: "string", example: "0901234567" },
          birthday: { type: "string", example: "1995-10-15" },
          gender: { type: "boolean", example: true },
          role: { type: "string", example: "user" }
        },
        required: ["name", "email", "password"]
      },
      DangNhapView: {
        type: "object",
        properties: {
          email: { type: "string", example: "vana@gmail.com" },
          password: { type: "string", example: "123456" }
        },
        required: ["email", "password"]
      },

      BinhLuanViewModel: {
        type: "object",
        properties: {
          id: { type: "integer", format: "int32", example: 0 },
          maPhong: { type: "integer", format: "int32", example: 1 },
          maNguoiBinhLuan: { type: "integer", format: "int32", example: 1 },
          ngayBinhLuan: { type: "string", example: "2026-08-20T12:00:00Z" },
          noiDung: { type: "string", example: "Phòng sạch sẽ, phục vụ rất tốt!" },
          saoBinhLuan: { type: "integer", format: "int32", example: 5 }
        },
        required: ["maPhong", "maNguoiBinhLuan", "noiDung", "saoBinhLuan"]
      },

      DatPhongViewModel: {
        type: "object",
        properties: {
          id: { type: "integer", format: "int32", example: 0 },
          maPhong: { type: "integer", format: "int32", example: 1 },
          ngayDen: { type: "string", format: "date-time", example: "2026-09-01T14:00:00Z" },
          ngayDi: { type: "string", format: "date-time", example: "2026-09-05T12:00:00Z" },
          soLuongKhach: { type: "integer", format: "int32", example: 2 },
          maNguoiDung: { type: "integer", format: "int32", example: 1 }
        },
        required: ["maPhong", "ngayDen", "ngayDi", "soLuongKhach", "maNguoiDung"]
      },

      
      CapNhatNguoiDung: {
        type: "object",
        properties: {
          id: { type: "integer", format: "int32", example: 0 },
          name: { type: "string", example: "Nguyen Van A" },
          email: { type: "string", example: "vana@gmail.com" },
          phone: { type: "string", example: "0901234567" },
          birthday: { type: "string", example: "1995-10-15" },
          gender: { type: "boolean", example: true },
          role: { type: "string", example: "user" }
        },
        required: ["name", "email"]
      },
    
      
      PhongViewModel: {
        type: "object",
        properties: {
          id: { type: "integer", format: "int32", example: 0 },
          tenPhong: { type: "string", example: "Căn hộ Luxury Landmark 81 View Sông" },
          khach: { type: "integer", format: "int32", example: 4 },
          phongNgu: { type: "integer", format: "int32", example: 2 },
          giuong: { type: "integer", format: "int32", example: 2 },
          phongTam: { type: "integer", format: "int32", example: 2 },
          moTa: { type: "string", example: "Căn hộ tuyệt vời đầy đủ tiện nghi..." },
          giaTien: { type: "integer", format: "int32", example: 2500000 },
          mayGiat: { type: "boolean", example: true },
          banLa: { type: "boolean", example: true },
          tivi: { type: "boolean", example: true },
          dieuHoa: { type: "boolean", example: true },
          wifi: { type: "boolean", example: true },
          bep: { type: "boolean", example: true },
          doXe: { type: "boolean", example: true },
          hoBoi: { type: "boolean", example: false },
          banUi: { type: "boolean", example: true },
          maViTri: { type: "integer", format: "int32", example: 1 },
          hinhAnh: { type: "string", example: "images/phong-1.jpg" }
        },
        required: ["tenPhong", "khach", "phongNgu", "giuong", "phongTam", "giaTien", "maViTri"]
      },

       ViTriViewModel: {
        type: "object",
        properties: {
          id: { type: "integer", format: "int32", example: 0 },
          tenViTri: { type: "string", example: "Quận 1" },
          tinhThanh: { type: "string", example: "Hồ Chí Minh" },
          quocGia: { type: "string", example: "Việt Nam" },
          hinhAnh: { type: "string", example: "images/vitri-q1.jpg" }
        },
        required: ["tenViTri", "tinhThanh", "quocGia"]
      },
    
    },
  },

     

  security: [
    {
      bearerAuth: [],
    },
  ],
  paths: {
    ...authSwagger,
    ...binhLuanSwagger,
    ...nguoiDungSwagger,
    ...datPhongSwagger,
    ...phongSwagger,
    ...viTriSwagger,
  },
};