import mysql from "mysql2/promise"
import { Usuario } from "./model/UserModel"
import { Receita } from "./model/RevenueModel"

const connectionConfig = {
  host: "localhost",
  user: "root",
  password: "1234",
  database: "financas",
}

async function connect() {
  const connection = await mysql.createConnection(connectionConfig)

  return connection
}

async function createUser(usuario: Usuario): Promise<number> {
  const connection = await connect()
  //@ts-ignore
  const [result] = await connection.execute(
    "insert into usuarios (nome, saldo) values (?, ?)",
    [usuario.nome, usuario.saldo]
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
    "insert into receitas (nome, valor, usuario_id) values (?, ?, ?)",
    [receita.nome, receita.valor, receita.usuario_id]
  )
  connection.end()
  //@ts-ignore
  return result.insertId
}

async function getUserById(userId: number): Promise<Usuario | null> {
  const connection = await connect()
  // @ts-ignore
  const [rows] = await connection.execute(
    "SELECT * FROM usuarios WHERE id = ?",
    [userId]
  )
  return rows[0] || null
}

// Fix insertion
async function getRevenueById(revenueId: number): Promise<Receita | null> {
  const connection = await connect()
  // @ts-ignore
  const [rows] = await connection.execute(
    "select * from receitas where usuario_id = ?",
    [revenueId]
  )
  connection.end()
  // @ts-ignore
  return rows || null
}

async function updateUser(user: Usuario): Promise<void> {
  const connection = await connect()
  //@ts-ignore
  await connection.execute("UPDATE usuarios SET nome = ?, saldo = ? WHERE id = ?", [
    user.nome,
    user.saldo,
    user.id,
  ])
  connection.end()
}

// Fix insertion
async function updateRevenue(revenue: Receita): Promise<void> {
  const connection = await connect()
  //@ts-ignore
  await connection.execute("UPDATE receitas SET nome = ?, valor = ? WHERE id = ?", [
    revenue.nome,
    revenue.valor,
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
async function deleteRevenue(receitaId: number): Promise<void> {
  const connection = await connect()
  //@ts-ignore
  await connection.execute("DELETE FROM receitas WHERE id = ?", [receitaId])
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
    somaReceitas: row.somaReceitas,
  }))
  return userList
}

async function listAllRevenues(): Promise<Receita[]> {
  const connection = await connect()
  //@ts-ignore
  const [rows] = await connection.execute("SELECT * FROM receitas")
  connection.end()
  //@ts-ignore
  const userList: Receita[] = rows.map((row: any) => ({
    id: row.id,
    nome: row.nome,
    valor: row.valor,
    data: row.data,
    usuario_id: row.usuario_id
  }))
  return userList
}

async function listRevenueByUserId(userId: number): Promise<Receita[] | null> {
  const connection = await connect()
  // @ts-ignore
  const [rows] = await connection.execute(
    "SELECT r.id AS id, r.nome AS Receita, r.valor AS Valor, r.data AS Data FROM receitas r INNER JOIN usuarios u ON u.id = r.usuario_id WHERE u.id = ?",
    [userId]
  )
  connection.end()
  return rows || null
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
  listAllRevenues,
  deleteRevenue,
  listRevenueByUserId,
}