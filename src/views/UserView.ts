import { Usuario } from "../model/UserModel"
import { UsuarioController } from "../controller/UsuarioController"
import main from "../executavel/Exec"
import inquirer from "inquirer"

export class UserView {
  static async menuUsuario() {
    console.clear()
    await inquirer
      .prompt([
        {
          type: "list",
          name: "opcao",
          message: "\t===== Menu usuário ==== \nSelecione a opção desejada:",
          choices: [
            "Cadastrar usuário",
            "Atualizar usuário",
            "Remover usuário",
            "Buscar usuário por Id",
            "Listar todos os usuários",
            "Buscar usuário por nome",
            "Voltar"
          ],
        },
      ])
      .then((opcao: any) => {
        switch (opcao.opcao) {
          case "Voltar":
            main()
            break

          default:
            return this.menuUsuario()
        }
      })
  }
}