import { UserView } from "../views/UserView"
import { RevenueView } from "../views/RevenueView"

import inquirer from "inquirer"

export default async function main() {
  console.clear()
  await inquirer
    .prompt([
      {
        type: "list",
        name: "opcaoMenu",
        message: "Seleciona a opção desejada:",
        choices: ["Usuários", "Receitas", "Sair"],
      },
    ])
    .then((opcao: any) => {
      console.log(opcao.opcaoMenu)
      
      switch (opcao.opcaoMenu) {
        case "Usuários":
          UserView.menuUsuario()
          break
        case "Receitas":
          RevenueView.menuReceita()
          break
        case 'Sair':
          return
        default:
          console.log('Opção inválida')   
          return main()
      }
    })
    .catch((e) => {
      console.log(e)
    })
}

main().catch(console.error)