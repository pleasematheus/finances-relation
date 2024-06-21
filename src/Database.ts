import mysql from 'mysql2/promise'
import { Usuario } from './model/UsuarioModel'
import { Receita } from './model/ReceitaModel'

const connectionConfig = {
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'financas'
}

async function connect() {
  const connection = await mysql.createConnection(connectionConfig)

  return connection
}

async function createUser(usuario: Usuario): Promise<number> {
  const connection = await connect()
  //@ts-ignore
  const [result] = await connection.execute(
    "insert into usuarios (nome, saldo, data) values (?, ?)",
    [usuario.nome, usuario.saldo, new Date()]
  )
  connection.end()
  //@ts-ignore
  return result.insertId
}

// Fix insertion
async function createRevenue(receita: Receita): Promise<number> {
  const connection = await connect()
  //@ts-ignore
  const [result] = await connection.execute(
    "insert into receitas (nome, valor, data) values (?, ?)",
    [receita.nome, receita.valor, receita.data]
  )
  connection.end()
  //@ts-ignore
  return result.insertId
}

async function getUserById(userId: number): Promise<Usuario | null> {
  const connection = await connect()
  // @ts-ignore
  const [rows] = await connection.execute(
    "select * from usuarios where id = ?",
    userId
  )
  connection.end()
  // @ts-ignore
  if (rows.length > 0) {
    // @ts-ignore
    const userData = rows[0] as Usuario
    return userData
  }
  return null
}

// Fix insertion
async function getRevenueById(revenueId: number): Promise<Receita | null> {
  const connection = await connect()
  // @ts-ignore
  const [rows] = await connection.execute(
    "select * from receitas where id = ?",
    revenueId
  )
  connection.end()
  // @ts-ignore
  if (rows.length > 0) {
    // @ts-ignore
    const revenuesData = rows[0] as Receita
    return revenuesData
  }
  return null
}

async function updateUser(user: Usuario): Promise<void> {
  const connection = await connect()
  //@ts-ignore
  await connection.execute(
    "UPDATE usuarios SET nome = ? WHERE id = ?",
    [user.nome, user.id]
  )
  connection.end()
}

// Fix insertion
async function updateRevenue(revenue: Receita): Promise<void> {
  const connection = await connect()
  //@ts-ignore
  await connection.execute("UPDATE receitas SET nome = ? WHERE id = ?", [
    revenue.nome,
    revenue.valor,
    revenue.data,
    revenue.id
  ])
  connection.end()
}

async function deleteUser(userId: number): Promise<void> {
  const connection = await connect()
  //@ts-ignore
  await connection.execute("DELETE FROM usuarios WHERE id = ?", [userId])
  connection.end()
}

// Fix insertion
async function deleteRevenue(revenueId: number): Promise<void> {
  const connection = await connect()
  //@ts-ignore
  await connection.execute("DELETE FROM receitas WHERE id = ?", [revenueId])
  connection.end()
}

async function listAllUsers(): Promise<Usuario[]> {
  const connection = await connect()
  //@ts-ignore
  const [rows] = await connection.execute("SELECT * FROM usuarios")
  connection.end()
  //@ts-ignore
  const userList: Usuario[] = rows.map((row: any) => ({
    id: row.id,
    nome: row.nome,
    saldo: row.saldo,
    somaReceitas: row.somaReceitas
  }))
  return userList
}

// Fix insertion
async function listAllRevenues(): Promise<Receita[]> {
  const connection = await connect()
  //@ts-ignore
  const [rows] = await connection.execute("SELECT * FROM usuarios")
  connection.end()
  //@ts-ignore
  const userList: Usuario[] = rows.map((row: any) => ({
    id: row.id,
    nome: row.nome,
    saldo: row.saldo,
    somaReceitas: row.somaReceitas,
  }))
  return userList
}

async function listUsersByName(user: string): Promise<Usuario[] | null> {
  const connection = await connect()
  //@ts-ignore
  const [rows] = await connection.execute(
    `select * from usuarios where lower(nome) like "${user}%"`
  )
  connection.end()
  //@ts-ignore
  const userList: Usuario[] = rows.map((row: any) => ({
    id: row.id,
    nome: row.nome,
    saldo: row.saldo,
    somaReceitas: row.somaReceitas,
  }))

  return userList
}

export {
  connect,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  listAllUsers,
  listUsersByName,
  createRevenue,
  getRevenueById,
  updateRevenue,
  listAllRevenues
}