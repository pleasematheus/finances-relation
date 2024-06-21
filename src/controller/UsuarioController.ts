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
}
