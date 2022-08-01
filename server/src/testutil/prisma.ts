import { prisma } from "../utils/prisma/prisma";

const prismaAsAny = prisma as any;

export { prismaAsAny };