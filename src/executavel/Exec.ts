import { UserView } from "../views/UserView"
import { RevenueView } from "../views/RevenueView"

import inquirer from "inquirer"

async function main() {
  UserView.menuUsuario()
  RevenueView.menuReceita()
}


main().catch(console.error)