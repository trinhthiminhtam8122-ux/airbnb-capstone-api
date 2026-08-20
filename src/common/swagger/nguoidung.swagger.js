export const nguoiDungSwagger = {
  "/api/users": {
    // 1. Lấy danh sách toàn bộ người dùng
    get: {
      tags: ["NguoiDung"],
      summary: "",
      responses: {
        200: {
          description: "Success"
        }
      }
    },
    // 2. Tạo người dùng mới
    post: {
      tags: ["NguoiDung"],
      summary: "",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ThongTinNguoiDung"
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
    // 3. Xóa người dùng (truyền ID qua query)
    delete: {
      tags: ["NguoiDung"],
      summary: "",
      parameters: [
        {
          name: "id",
          in: "query",
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
  "/api/users/phan-trang-tim-kiem": {
    // 4. Phân trang tìm kiếm người dùng
    get: {
      tags: ["NguoiDung"],
      summary: "",
      parameters: [
        {
          name: "pageIndex",
          in: "query",
          required: true,
          schema: {
            type: "integer"
          }
        },
        {
          name: "pageSize",
          in: "query",
          required: true,
          schema: {
            type: "integer"
          }
        },
        {
          name: "keyword",
          in: "query",
          required: false,
          schema: {
            type: "string"
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
  "/api/users/{id}": {
    // 5. Lấy thông tin người dùng theo ID
    get: {
      tags: ["NguoiDung"],
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
    // 6. Cập nhật thông tin người dùng 
    put: {
      tags: ["NguoiDung"],
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
              $ref: "#/components/schemas/CapNhatNguoiDung"
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
  "/api/users/search/{TenNguoiDung}": {
    // 7. Tìm kiếm người dùng theo tên
    get: {
      tags: ["NguoiDung"],
      summary: "",
      parameters: [
        {
          name: "TenNguoiDung",
          in: "path",
          required: true,
          schema: {
            type: "string"
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
  "/api/users/upload-avatar": {
    // 8. Tải lên ảnh đại diện (avatar)
    post: {
      tags: ["NguoiDung"],
      summary: "",
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                avatar: {
                  type: "string",
                  format: "binary"
                }
              }
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
  }
};