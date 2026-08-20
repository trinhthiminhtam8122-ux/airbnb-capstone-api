import { prisma } from "./connect.prisma.js";

const seed = async () => {
  console.log("Bắt đầu chèn dữ liệu mẫu...");

  // 1. Tạo vị trí (ViTri)
  const vt1 = await prisma.viTri.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      ten_vi_tri: "Quận 1",
      tinh_thanh: "Hồ Chí Minh",
      quoc_gia: "Việt Nam",
      hinh_anh: "images/vitri-q1.jpg"
    }
  });

  const vt2 = await prisma.viTri.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      ten_vi_tri: "Phú Quốc",
      tinh_thanh: "Kiên Giang",
      quoc_gia: "Việt Nam",
      hinh_anh: "images/vitri-pq.jpg"
    }
  });

  console.log("-> Đã tạo xong Vị trí (ViTri).");

  // 2. Tạo phòng (Phong)
  await prisma.phong.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      ten_phong: "Căn hộ Luxury Landmark 81 View Sông",
      khach: 4,
      phong_ngu: 2,
      giuong: 2,
      phong_tam: 2,
      mo_ta: "Căn hộ tuyệt đẹp nằm tại tòa nhà cao nhất Việt Nam.",
      gia_tien: 2500000,
      wifi: true,
      tivi: true,
      dieu_hoa: true,
      bep: true,
      ma_vi_tri: 1
    }
  });

  await prisma.phong.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      ten_phong: "Biệt thự sát biển Sunset Villa Phú Quốc",
      khach: 8,
      phong_ngu: 4,
      giuong: 4,
      phong_tam: 4,
      mo_ta: "Biệt thự sát biển có hồ bơi riêng biệt và view ngắm hoàng hôn tuyệt đỉnh.",
      gia_tien: 6000000,
      wifi: true,
      tivi: true,
      dieu_hoa: true,
      bep: true,
      ho_boi: true,
      ma_vi_tri: 2
    }
  });

  console.log("-> Đã tạo xong Phòng (Phong).");
  console.log("Chèn dữ liệu mẫu thành công!");
  process.exit(0);
};

seed().catch(err => {
  console.error("Lỗi khi chèn dữ liệu:", err);
  process.exit(1);
});
