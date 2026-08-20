export const viTriSwagger = {
  "/api/vi-tri": {
    // 1. Lấy toàn bộ danh sách vị trí
    get: {
      tags: ["ViTri"],
      summary: "",
      responses: {
        200: {
          description: "Success"
        }
      }
    },
    // 2. Tạo vị trí mới
    post: {
      tags: ["ViTri"],
      summary: "",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ViTriViewModel"
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
  "/api/vi-tri/phan-trang-tim-kiem": {
    // 3. Phân trang tìm kiếm vị trí
    get: {
      tags: ["ViTri"],
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
  "/api/vi-tri/{id}": {
    // 4. Lấy thông tin vị trí theo ID
    get: {
      tags: ["ViTri"],
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
    // 5. Cập nhật vị trí
    put: {
      tags: ["ViTri"],
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
              $ref: "#/components/schemas/ViTriViewModel"
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
    // 6. Xóa vị trí
    delete: {
      tags: ["ViTri"],
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
  "/api/vi-tri/upload-hinh-vitri": {
    // 7. Tải lên hình ảnh cho vị trí
    post: {
      tags: ["ViTri"],
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