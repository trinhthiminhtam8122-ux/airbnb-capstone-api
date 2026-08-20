import { prisma } from "./connect.prisma.js";
prisma.binhLuan.findMany().then(console.log).catch(console.error).finally(() => process.exit(0));
