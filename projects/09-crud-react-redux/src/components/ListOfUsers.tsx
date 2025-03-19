import { DeleteIcon, EditIcon } from './Icons'
import { useAppSelector } from '../hooks/store'
import { useUserActions } from '../hooks/useUserActions'
import {
  Badge,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title,
} from '@tremor/react'

export function ListOfUsers() {
  const users = useAppSelector((state) => state.users)
  const { removeUser } = useUserActions()

  return (
    <Card className="outline-none ring-gray-400 rounded-sm h-1/2 overflow-y-auto">
      <Title>
        Usuarios
        <Badge className="ml-2 mb-4 rounded-xl text-blue-600 bg-blue-100 ring-0">
          {users.length}
        </Badge>
      </Title>
      <Table className="text-gray-600">
        <TableHead>
          <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
            <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Id
            </TableHeaderCell>
            <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Nombre
            </TableHeaderCell>
            <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Email
            </TableHeaderCell>
            <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Acciones
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {user.id}
              </TableCell>
              <TableCell className="flex items-center gap-4 max-w-80">
                <img
                  className="w-8 h-8 rounded-full object-cover"
                  src={`https://unavatar.io/${user.github}`}
                  alt={user.name}
                />
                <p className="truncate">{user.name}</p>
              </TableCell>
              <TableCell className="max-w-80">
                <p className="truncate">{user.email}</p>
              </TableCell>
              <TableCell className="flex items-center gap-4 justify-left">
                <button
                  type="button"
                  className="hover:text-black transition"
                  onClick={() => removeUser(user.id)}
                >
                  <DeleteIcon />
                </button>
                <button type="button" className="hover:text-black transition">
                  <EditIcon />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
