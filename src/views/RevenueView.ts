import { Receita } from "../model/RevenueModel"
import { RevenueController } from "../controller/ReceitaController"
import * as readLineSync from "readline-sync"

export class RevenueView {
  static async menuReceita() {
    let continuar = true

    while (continuar) {
      console.log("\t===== Menu receita =====")
      console.log("Selecione a opção desejada:")
      const menu = [
        "[1] - Cadastrar receita",
        "[2] - Atualizar receita",
        "[3] - Remover receita",
        "[4] - Listar receitas por usuário",
        "[5] - Listar todas as receitas",
        "[0] - Sair",
      ]

      menu.forEach((e) => {
        console.log(e)
      })

      let opcao: string = readLineSync.question(">> ")

      switch (opcao) {
        case "1":
          const novaReceita = await this.cadastrar()
          const novaReceitaId = await RevenueController.cadastrarReceita(
            novaReceita
          )
          console.log(`Receita com ID ${novaReceitaId} cadastrada`)
          break
        case "2":
          const idAt: string = readLineSync.question(
            "Entre com o ID da receita:"
          )
          const receitaAt: Receita | null =
            await RevenueController.buscarReceitaPorId(Number(idAt))

          if (receitaAt != null) {
            const receitaAtualizar = await this.cadastrar(parseInt(idAt))
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
          const receitaRemocao: Receita | null =
            await RevenueController.buscarReceitaPorId(Number(idRemocao))

          if (receitaRemocao != null) {
            await RevenueController.removerReceita(parseInt(idRemocao))
            console.log("Receita removida com sucesso!")
          } else {
            console.log("Receita inexistente")
          }
          break
        case "4":
          const id: string = readLineSync.question("Digite o ID do usuário: ")
          const receitasPerUser: Receita[] | null =
            await RevenueController.listarReceitaPorUsuarioId(Number(id))
          this.listar(receitasPerUser)
          break
        case "5":
          const receitas: Receita[] =
            await RevenueController.listarTodasAsReceitas()
          this.listar(receitas)
          break
        case "0":
          console.log("Voltando...")
          continuar = false
          break
        default:
          console.log("Opção inválida")
      }
    }
  }

  static async cadastrar(id?: number) {
    const nome: string = readLineSync.question("Digite o nome: ")
    const valor: string = readLineSync.question("Digite o valor: ")
    const usuario_id: string = readLineSync.question("Digite o ID do usuário: ")

    const receita: Receita = {
      id: id,
      nome: nome,
      valor: parseFloat(valor),
      usuario_id: Number(usuario_id),
    }
    return receita
  }

  static listar(receitas: Receita[] | Receita | null) {
    console.table(receitas)
  }
}