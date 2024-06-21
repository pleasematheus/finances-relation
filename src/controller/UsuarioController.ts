import { Usuario } from "../model/UserModel"
import {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  listAllUsers,
  listUsersByName,
} from "../Database"

export class UsuarioController {
  static async cadastrarUsuario(usuario: Usuario): Promise<number> {
    const idInsercao: number = await createUser(usuario)
    return idInsercao
  }

  static async atualizarUsuario(usuario: Usuario): Promise<void> {
    await updateUser(usuario)
  }

  static async removerUsuario(usuarioId: number): Promise<void> {
    await deleteUser(usuarioId)
  }

  static async buscarUsuarioPorId(usuarioId: number): Promise<Usuario | null> {
    const usuario = await getUserById(usuarioId)
    return usuario
  }

  static async listarTodosOsUsuarios(): Promise<Usuario[]> {
    const usuarios = await listAllUsers()
    return usuarios
  }

  static async listarUsuariosPorNome(usuario: string): Promise<Usuario[] | null> {
    const usuarios = await listUsersByName(usuario)
    return usuarios
  }
}