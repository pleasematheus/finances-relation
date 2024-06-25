import { PrismaClient, Receitas } from "@prisma/client"
const prisma = new PrismaClient()

export class RevenueController {
  static async cadastrarReceita(receita: Receitas): Promise<number> {
    const idInsercao = await prisma.receitas.create({
      data: {
        nome: receita.nome,
        valor: receita.valor,
        usuarioId: receita.usuarioId,
      },
    })
    return idInsercao.id
  }

  static async buscarReceitaPorId(receitaId: number): Promise<Receitas | null> {
    return await prisma.receitas.findUnique({
      where: { id: receitaId },
    })
  }

  static async atualizarReceita(receita: Receitas): Promise<void> {
    await prisma.receitas.update({
      where: { id: receita.id },
      data: receita,
    })
  }

  static async listarTodasAsReceitas(): Promise<Receitas[]> {
    const receitas: Receitas[] = await prisma.receitas.findMany()
    return receitas
  }

  static async removerReceita(receitaId: number): Promise<void> {
    await prisma.receitas.delete({
      where: { id: receitaId },
    })
  }

  static async listarReceitasPorUsuario(userId: number): Promise<Receitas[]> {
    return await prisma.receitas.findMany({
      where: {
        usuarioId: userId,
      },
    })
  }
}