export const binhLuanSwagger = {
  "/api/binh-luan": {
    // 1. Lấy tất cả bình luận
    get: {
      tags: ["BinhLuan"],
      summary: "",
      responses: {
        200: {
          description: "Success"
        }
      }
    },
    // 2. Tạo bình luận mới
    post: {
      tags: ["BinhLuan"],
      summary: "",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/BinhLuanViewModel"
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
  "/api/binh-luan/{id}": {
    // 3. Cập nhật bình luận
    put: {
      tags: ["BinhLuan"],
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
              $ref: "#/components/schemas/BinhLuanViewModel"
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
    // 4. Xóa bình luận
    delete: {
      tags: ["BinhLuan"],
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
  "/api/binh-luan/lay-binh-luan-theo-phong/{MaPhong}": {
    // 5. Lấy bình luận theo mã phòng
    get: {
      tags: ["BinhLuan"],
      summary: "",
      parameters: [
        {
          name: "MaPhong",
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