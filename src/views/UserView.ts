import { Usuario } from "../model/UserModel"
import { UsuarioController } from "../controller/UsuarioController"
import * as readLineSync from "readline-sync"

export class UserView {
  static async menuUsuario() {
    let continuar = true

    while (continuar) {
      console.log("\t===== Menu usuário ====")
      console.log("Selecione a opção desejada:")
      const menu = [
        "[1] - Cadastrar usuário",
        "[2] - Atualizar usuário",
        "[3] - Remover usuário",
        "[4] - Buscar usuário por Id",
        "[5] - Listar todos os usuários",
        "[6] - Buscar usuário por nome",
        "[0] - Sair",
      ]

      menu.forEach((e) => {
        console.log(e)
      })

      let opcao: string = readLineSync.question(">> ")

      switch (opcao) {
        case "1":
          const novoUsuario = await this.cadastrar()
          await UsuarioController.cadastrarUsuario(novoUsuario)
          break
        case "2":
          const idAtualizar = readLineSync.question("Digite o Id do usuário: ")
          console.log(idAtualizar)
          break
        case "3":
          const idRemocao: string = readLineSync.question(
            "Digite o id do usuário: "
          )
          const usuarioRemocao: Usuario | null =
            await UsuarioController.buscarUsuarioPorId(Number(idRemocao))

          usuarioRemocao != null
            ? await UsuarioController.removerUsuario(parseInt(idRemocao))
            : console.log("Usuário inexistente")
          break
        case "4":
          const id: string = readLineSync.question("Digite o ID do usuário: ")
          const user: Usuario | null =
            await UsuarioController.buscarUsuarioPorId(Number(id))
          this.listar(user)
          break
        case "5":
          const usuarios: Usuario[] =
            await UsuarioController.listarTodosOsUsuarios()
          this.listar(usuarios)
          break
        case "6":
          const nome: string = readLineSync.question('Digite o nome para pesquisar: ')
          const usuarioPesquisa: Usuario[] | null = await UsuarioController.listarUsuariosPorNome(nome)
          this.listar(usuarioPesquisa)
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
    const saldo: string = readLineSync.question("Digite o saldo: ")

    const usuario: Usuario = { id: id, nome: nome, saldo: parseFloat(saldo) }
    return usuario
  }

  static listar(usuarios: Usuario[] | Usuario | null) {
    console.table(usuarios)
  }
}