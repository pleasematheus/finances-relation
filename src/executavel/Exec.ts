import { UserView } from "../views/UserView"
import { RevenueView } from "../views/RevenueView"
import * as readLineSync from "readline-sync"

export default async function main() {
  console.clear()
  while (true) {
    const menu = ["[1] - Usuários", "[2] - Receitas", "[0] - Sair"]

    menu.forEach((e) => {
      console.log(e)
    })

    let opcao: string = readLineSync.question(">> ")

    switch (opcao) {
      case "1":
        console.clear()
        await UserView.menuUsuario()
        break
      case "2":
        console.clear()
        await RevenueView.menuReceita()
        break
      case "0":
        console.log(`Saindo...`)
        return
      default:
        console.log("Opção inválida")
    }
  }
}

main().catch(console.error)