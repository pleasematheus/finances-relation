import { Usuarios } from "@prisma/client"
import { UsuarioController } from "../controller/UsuarioController"
import * as readLineSync from "readline-sync"
import { RevenueView } from "../views/RevenueView"

export class UserView {
  static async menuUsuario() {
    let continuar = true
    let login

    while (continuar) {
      console.log("\t===== Menu usuário ====")
      console.log("Selecione a opção desejada:")
      const menu = [
        "[1] - Cadastrar usuário",
        "[2] - Atualizar usuário",
        "[3] - Remover usuário",
        "[4] - Buscar usuário por Id",
        "[5] - Listar todos os usuários",
        "[6] - Login",
        "[0] - Sair",
      ]

      menu.forEach((e) => {
        console.log(e)
      })

      let opcao: string = readLineSync.question(">> ")

      switch (opcao) {
        //Cadastrar usuário
        case "1":
          const novoUsuario: Usuarios = await this.cadastrar()
          const novoUsuarioId = await UsuarioController.cadastrarUsuario(
            novoUsuario
          )
          console.log(`Usuario ID ${novoUsuarioId} cadastrado`)
          break
        //Atualizar usuário
        case "2":
          const idAt: string = readLineSync.question(
            "Entre com o ID do usuário: "
          )

          const usuarioAt: Usuarios | null =
            await UsuarioController.buscarUsuarioPorId(Number(idAt))

          if (usuarioAt != null) {
            const usuarioAtualizar = await this.cadastrar(parseInt(idAt))
            await UsuarioController.atualizarUsuario(usuarioAtualizar)
            console.log("Usuário atualizado com sucesso!")
          } else {
            console.log("Usuário inexistente")
          }

          break
        case "3":
          console.log(
            "\n===== AVISO: AO APAGAR UM USUÁRIO TODAS AS RECEITAS DELE SERÃO EXCLUÍDAS =====\n"
          )
          const idRemocao: string = readLineSync.question(
            "Digite o id do usuário: "
          )
          const usuarioRemocao: Usuarios | null =
            await UsuarioController.buscarUsuarioPorId(Number(idRemocao))

          console.log("Deseja realmente apagar este usuário?")
          console.log("[S] Sim [N] Nao")
          const confirmacao: string = readLineSync.question(">> ")

          if (confirmacao === "S") {
            if (usuarioRemocao != null) {
              await UsuarioController.removerUsuario(parseInt(idRemocao))
              console.log(`Usuário ID ${idRemocao} removido!`)
            } else console.log("Usuário inexistente")
          }
          break
        case "4":
          const id: string = readLineSync.question("Digite o ID do usuário: ")
          const user: Usuarios | null =
            await UsuarioController.buscarUsuarioPorId(Number(id))
          this.listar(user)
          break
        case "5":
          const usuarios: Usuarios[] =
            await UsuarioController.listarTodosOsUsuarios()
          this.listar(usuarios)
          break
        case "6":
          const email: string = readLineSync.question("Digite o email: ")
          const passw: string = readLineSync.question("Digite a senha: ")

          login = await UsuarioController.login(email, passw)
          if (login !== null) {
            await RevenueView.menuReceita(login.id)
          } else {
            console.log("Login incorreto!\n")
          }
          break
        case "0":
          console.log("Saindo...")
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
    const email: string = readLineSync.question("Digite o email: ")
    const passw: string = readLineSync.question("Digite a senha: ")

    const usuario: Usuarios = {
      id: id ?? 0,
      nome: nome,
      saldo: parseFloat(saldo),
      email: email,
      passw: passw,
    }
    return usuario
  }

  static listar(usuarios: Usuarios[] | Usuarios | null) {
    console.table(usuarios)
  }
}