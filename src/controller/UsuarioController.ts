import { PrismaClient, Usuarios } from "@prisma/client"
const prisma = new PrismaClient()

export class UsuarioController {
  static async cadastrarUsuario(usuario: Usuarios): Promise<number> {
    const createdUser = await prisma.usuarios.create({
      data: {
        nome: usuario.nome,
        saldo: usuario.saldo,
        email: usuario.email,
        passw: usuario.passw
      }
    })
    return createdUser.id
  }

  static async atualizarUsuario(usuario: Usuarios): Promise<void> {
    await prisma.usuarios.update({
      where: { id: usuario.id },
      data: usuario,
    })
  }

  static async removerUsuario(usuarioId: number): Promise<void> {
    await prisma.usuarios.delete({
      where: { id: usuarioId },
    })
  }

  static async buscarUsuarioPorId(usuarioId: number): Promise<Usuarios | null> {
    return await prisma.usuarios.findUnique({
      where: { id: usuarioId },
    })
  }

  static async listarTodosOsUsuarios(): Promise<Usuarios[]> {
    const usuarios: Usuarios[] = await prisma.usuarios.findMany()
    return usuarios
  }

  static async login(email: string, passw: string): Promise<Usuarios | null> {
    const user = await prisma.usuarios.findFirst({
      where: { email: email, passw: passw },
    })

    return user || null
  }
}