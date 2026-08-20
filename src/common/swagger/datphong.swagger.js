export const datPhongSwagger = {
  "/api/dat-phong": {
    // 1. Lấy toàn bộ danh sách đặt phòng
    get: {
      tags: ["DatPhong"],
      summary: "",
      responses: {
        200: {
          description: "Success"
        }
      }
    },
    // 2. Đặt phòng mới
    post: {
      tags: ["DatPhong"],
      summary: "",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/DatPhongViewModel"
            }
          }
        }
      },
      responses: {
        200: {
          description: "Success"
        }
      }
    }
  },
  "/api/dat-phong/{id}": {
    // 3. Lấy thông tin đặt phòng theo ID
    get: {
      tags: ["DatPhong"],
      summary: "",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "integer"
          }
        }
      ],
      responses: {
        200: {
          description: "Success"
        }
      }
    },
    // 4. Cập nhật thông tin đặt phòng
    put: {
      tags: ["DatPhong"],
      summary: "",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "integer"
          }
        }
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/DatPhongViewModel"
            }
          }
        }
      },
      responses: {
        200: {
          description: "Success"
        }
      }
    },
    // 5. Xóa đặt phòng
    delete: {
      tags: ["DatPhong"],
      summary: "",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "integer"
          }
        }
      ],
      responses: {
        200: {
          description: "Success"
        }
      }
    }
  },
  "/api/dat-phong/lay-theo-nguoi-dung/{MaNguoiDung}": {
    // 6. Lấy danh sách đặt phòng theo mã người dùng
    get: {
      tags: ["DatPhong"],
      summary: "",
      parameters: [
        {
          name: "MaNguoiDung",
          in: "path",
          required: true,
          schema: {
            type: "integer"
          }
        }
      ],
      responses: {
        200: {
          description: "Success"
        }
      }
    }
  }
};