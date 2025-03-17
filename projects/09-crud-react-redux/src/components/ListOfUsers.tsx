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
import { DeleteIcon, EditIcon } from './Icons'

// function classNames(...classes: string[]) {
//   return classes.filter(Boolean).join(' ')
// }

const users: {
  id: number
  name: string
  email: string
  github: string
}[] = [
  {
    id: 1,
    name: 'Jose Riascos',
    email: 'joseluis.riascos10@gmail.com',
    github: 'joselriascos',
  },
  {
    id: 2,
    name: 'Emily Jhonson',
    email: 'emily.jhonson@gmail.com',
    github: 'emilys',
  },
  {
    id: 3,
    name: 'Michael Williams',
    email: 'michael.williams@gmail.com',
    github: 'michaelw',
  },
  {
    id: 4,
    name: 'Sofia Rodriguez',
    email: 'sofia.rodriguez@gmail.com',
    github: 'sofiarod',
  },
  {
    id: 5,
    name: 'Emma Miller',
    email: 'emma.miller@gmail.com',
    github: 'emmaj',
  },
]

export default function ListOfUsers() {
  return (
    <Card className="outline-none ring-gray-400 rounded-sm">
      <Title>
        Usuarios
        <Badge className='ml-2 mb-4 rounded-xl text-blue-600 bg-blue-100 ring-0'>{users.length}</Badge>
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
              <TableCell className="flex items-center gap-4">
                <img
                  className="w-8 h-8 rounded-full object-cover"
                  src={`https://unavatar.io/github/${user.github}`}
                  alt={user.name}
                />
                {user.name}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="flex items-center gap-4 justify-left">
                <button type="button" className="hover:text-black transition">
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
