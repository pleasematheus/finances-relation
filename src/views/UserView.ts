import { Usuario } from "../model/UserModel"
import { UsuarioController } from "../controller/UsuarioController"
import inquirer from "inquirer"

export class UserView {
  static async menuUsuario() {
    console.clear()
    console.log("===== Menu usuário =====")
  }
}