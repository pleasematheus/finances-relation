import { Receita } from "../model/RevenueModel"
import {
  createRevenue,
  getRevenueById,
  updateRevenue,
  listAllRevenues,
  deleteRevenue,
  listRevenueByUserId,
} from "../Database"

export class RevenueController {
  static async cadastrarReceita(receita: Receita): Promise<number> {
    const idInsercao: number = await createRevenue(receita)
    return idInsercao
  }

  static async buscarReceitaPorId(receitaId: number): Promise<Receita | null> {
    const receita = await getRevenueById(receitaId)
    return receita
  }

  static async atualizarReceita(receita: Receita): Promise<void> {
    await updateRevenue(receita)
  }

  static async listarTodasAsReceitas(): Promise<Receita[]> {
    const receitas = await listAllRevenues()
    return receitas
  }

  static async removerReceita(receitaId: number): Promise<void> {
    await deleteRevenue(receitaId)
  }

  static async listarReceitaPorUsuarioId(userId: number): Promise<Receita[] | null> {
    const receitas = await listRevenueByUserId(userId)
    return receitas
  }
}