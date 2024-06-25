import { Receitas } from "@prisma/client"
import { RevenueController } from "../controller/ReceitaController"
import * as readLineSync from "readline-sync"

export class RevenueView {
  static async menuReceita(userId: number) {
    let continuar = true

    while (continuar) {
      console.log("\t===== Menu receita =====")
      console.log("Selecione a opção desejada:")
      const menu = [
        "[1] - Cadastrar receita",
        "[2] - Atualizar receita",
        "[3] - Remover receita",
        "[4] - Listar todas as receitas",
        "[0] - Sair",
      ]

      menu.forEach((e) => {
        console.log(e)
      })

      let opcao: string = readLineSync.question(">> ")

      switch (opcao) {
        case "1":
          const novaReceita = this.cadastrar(0, userId)
          const novaReceitaId = await RevenueController.cadastrarReceita(
            novaReceita
          )
          console.log(`Receita com ID ${novaReceitaId} cadastrada`)
          break
        case "2":
          const idAt: string = readLineSync.question(
            "Entre com o ID da receita:"
          )
          const receitaAt: Receitas | null =
            await RevenueController.buscarReceitaPorId(Number(idAt))

          if (receitaAt != null) {
            const receitaAtualizar = this.cadastrar(
              parseInt(idAt),
              userId
            )
            await RevenueController.atualizarReceita(receitaAtualizar)
            console.log("Receita atualizada com sucesso!")
          } else {
            console.log("Receita inexistente")
          }
          break
        case "3":
          const idRemocao: string = readLineSync.question(
            "Digite o ID da receita: "
          )
          const receitaRemocao: Receitas | null =
            await RevenueController.buscarReceitaPorId(Number(idRemocao))

          if (receitaRemocao != null) {
            await RevenueController.removerReceita(parseInt(idRemocao))
            console.log("Receita removida com sucesso!")
          } else {
            console.log("Receita inexistente")
          }
          break
        case "4":
          const receitas: Receitas[] =
            await RevenueController.listarTodasAsReceitas()
          this.listar(receitas)
        case "0":
          console.log("Sair...")
          continuar = false
          break
        default:
          console.log("Opção inválida")
      }
    }
  }

  static cadastrar(id: number, userId: number) {
    const nome: string = readLineSync.question("Digite o nome: ")
    const valor: string = readLineSync.question("Digite o valor: ")

    const receita: Receitas = {
      id: id,
      nome: nome,
      valor: parseFloat(valor),
      usuarioId: userId,
    }
    return receita
  }

  static listar(receitas: Receitas[] | Receitas | null) {
    console.table(receitas)
  }
}