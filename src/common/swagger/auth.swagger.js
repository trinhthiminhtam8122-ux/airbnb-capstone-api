export const authSwagger = {
  "/api/auth/signup": {
    post: {
      tags: ["Auth"],
      summary: "",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              // Trỏ trực tiếp vào Model phẳng
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
    }
  },
  "/api/auth/signin": {
    post: {
      tags: ["Auth"],
      summary: "",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/DangNhapView"
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