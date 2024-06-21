import { UserView } from "../views/UserView"
import { RevenueView } from "../views/RevenueView"

import inquirer from "inquirer"

async function main() {
  console.clear()
  await inquirer
    .prompt([
      {
        type: "list",
        name: "opcaoMenu",
        message: "Seleciona a opção desejada:",
        choices: ["Usuários", "Receitas"],
      },
    ])
    .then((opcao: any) => {
      switch (opcao.opcaoMenu) {
        case "Usuários":
          UserView.menuUsuario()
        case "Receitas":
          RevenueView.menuReceita()
          break
      }
    })
}

main().catch(console.error)