import { PrismaClient, Usuarios, Receitas } from "@prisma/client"
const prisma = new PrismaClient()

async function createUser(usuario: Usuarios): Promise<number> {
  const result = await prisma.usuarios.create({
    data: {
      id: 0,
      nome: usuario.nome,
      saldo: usuario.saldo,
      email: usuario.email,
      passw: usuario.passw,
    },
  })
  //@ts-ignore
  return result.insertId
}

async function createRevenue(receita: Receitas): Promise<number> {
  const result = await prisma.receitas.create({
    data: {
      id: 0,
      nome: receita.nome,
      valor: receita.valor,
      usuarioId: receita.usuarioId,
    },
  })
  //@ts-ignore
  return result.insertId
}

async function getUserById(userId: number): Promise<Usuarios | null> {
  const user = await prisma.usuarios.findUnique({
    where: { id: userId },
  })
  return user || null
}

async function getRevenueById(revenueId: number): Promise<Receitas | null> {
  const revenue = await prisma.receitas.findUnique({
    where: { id: revenueId },
  })
  return revenue || null
}

async function updateUser(user: Usuarios): Promise<void> {
  await prisma.usuarios.update({
    where: { id: user.id },
    data: user,
  })
}

async function updateRevenue(revenue: Receitas): Promise<void> {
  await prisma.receitas.update({
    where: { id: revenue.id },
    data: revenue,
  })
}

async function deleteUser(userId: number): Promise<void> {
  await prisma.$transaction([
    prisma.receitas.deleteMany({ where: { usuarioId: userId } }),
    prisma.usuarios.delete({ where: { id: userId } }),
  ])
}

async function deleteRevenue(receitaId: number): Promise<void> {
  await prisma.receitas.delete({
    where: { id: receitaId },
  })
}

async function listAllUsers(): Promise<Usuarios[]> {
  const users = await prisma.usuarios.findMany()
  return users
}

async function listAllRevenues(): Promise<Receitas[]> {
  const receitas = await prisma.receitas.findMany()
  return receitas
}

async function login(email: string, passw: string): Promise<Usuarios | null> {
  const user = await prisma.usuarios.findFirst({
    where: { email: email, passw: passw },
  })

  return user || null
}

export {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  listAllUsers,
  createRevenue,
  getRevenueById,
  updateRevenue,
  listAllRevenues,
  deleteRevenue,
  login,
}