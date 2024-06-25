import { UserView } from "../views/UserView"

export default async function main() {
  console.clear()
  await UserView.menuUsuario()
}

main().catch(console.error)