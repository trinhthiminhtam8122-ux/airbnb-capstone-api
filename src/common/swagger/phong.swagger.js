export const phongSwagger = {
  "/api/phong-thue": {
    // 1. Lấy tất cả phòng thuê
    get: {
      tags: ["Phong"],
      summary: "",
      responses: {
        200: {
          description: "Success"
        }
      }
    },
    // 2. Tạo phòng thuê mới
    post: {
      tags: ["Phong"],
      summary: "",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/PhongViewModel"
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
  "/api/phong-thue/lay-phong-theo-vi-tri": {
    // 3. Lấy phòng theo mã vị trí
    get: {
      tags: ["Phong"],
      summary: "",
      parameters: [
        {
          name: "maViTri",
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
  "/api/phong-thue/phan-trang-tim-kiem": {
    // 4. Phân trang và tìm kiếm phòng
    get: {
      tags: ["Phong"],
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
  "/api/phong-thue/{id}": {
    // 5. Lấy phòng theo ID chi tiết
    get: {
      tags: ["Phong"],
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
    // 6. Cập nhật thông tin phòng
    put: {
      tags: ["Phong"],
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
              $ref: "#/components/schemas/PhongViewModel"
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
    // 7. Xóa phòng
    delete: {
      tags: ["Phong"],
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
  "/api/phong-thue/upload-hinh-phong": {
    // 8. Tải lên hình ảnh cho phòng
    post: {
      tags: ["Phong"],
      summary: "",
      parameters: [
        {
          name: "maPhong",
          in: "query",
          required: true,
          schema: {
            type: "integer"
          }
        }
      ],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                hinhAnh: {
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