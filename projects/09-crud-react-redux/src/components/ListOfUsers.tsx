import { DeleteIcon, EditIcon } from './Icons'
import { useAppSelector } from '../hooks/store'
import { useUserActions } from '../hooks/useUserActions'
import { CreateNewUser } from './CreateNewUser'
import { useState } from 'react'
import { UserWithId } from '../store/users/slice'
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
import { EditExistingUser } from './EditExistingUser'

interface ModalState {
  type: 'add' | 'edit' | null
  user: UserWithId | null
}

export function ListOfUsers() {
  const [modalState, setModalState] = useState<ModalState>({
    type: null,
    user: null,
  })

  const closeModal = () => setModalState({ type: null, user: null })
  const openAddModal = () => setModalState({ type: 'add', user: null })
  const openEditModal = (user: UserWithId) =>
    setModalState({ type: 'edit', user })

  const users = useAppSelector((state) => state.users)
  const { removeUser } = useUserActions()

  return (
    <>
      <Card className="outline-none ring-gray-400 rounded-sm h-full overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <Title className="flex items-center">
            <span>Usuarios</span>
            <Badge className="ml-2 rounded-xl text-blue-600 bg-blue-100 ring-0">
              {users.length}
            </Badge>
          </Title>
          <button
            type="button"
            className="px-4 py-2 flex align-top bg-blue-500 text-white rounded-lg hover:bg-blue-800 transition"
            onClick={openAddModal}
          >
            Añadir Usuario
          </button>
        </div>
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
                  <span className="truncate">{user.name}</span>
                </TableCell>
                <TableCell className="max-w-80">
                  <span className="truncate">{user.email}</span>
                </TableCell>
                <TableCell className="flex items-center gap-4 justify-left">
                  <button
                    type="button"
                    className="hover:text-black transition"
                    onClick={() => removeUser(user.id)}
                  >
                    <DeleteIcon />
                  </button>
                  <button
                    type="button"
                    className="hover:text-black transition"
                    onClick={() => openEditModal(user)}
                  >
                    <EditIcon />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {modalState.type === 'add' && (
        <CreateNewUser
          isOpen={modalState.type === 'add'}
          onClose={closeModal}
        />
      )}
      {modalState.type === 'edit' && modalState.user && (
        <EditExistingUser
          isOpen={modalState.type === 'edit'}
          onClose={closeModal}
          user={modalState.user}
        />
      )}
    </>
  )
}
