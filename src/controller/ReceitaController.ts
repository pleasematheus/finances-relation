import { Receita } from "../model/RevenueModel"
import {
  createRevenue,
  getRevenueById,
  updateRevenue,
  listAllRevenues,
} from '../Database'

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
}