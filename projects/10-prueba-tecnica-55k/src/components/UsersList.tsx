import { SortBy, type User } from '../types.d'

interface Props {
  users: User[]
  showColors: boolean
  deleteUser: (user: User) => void
  sortUsers: (sortBy: SortBy) => void
}

export function UsersList({ users, showColors, deleteUser, sortUsers }: Props) {
  return (
    <table width="100%">
      <thead style={{ height: '4em' }}>
        <tr>
          <th>Foto</th>
          <th className="clickable" onClick={() => sortUsers(SortBy.NAME)}>
            Nombre
          </th>
          <th className="clickable" onClick={() => sortUsers(SortBy.LAST)}>
            Apellido
          </th>
          <th className="clickable" onClick={() => sortUsers(SortBy.COUNTRY)}>
            País
          </th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => {
          const backgroundColor = index % 2 === 0 ? '#333' : '#555'

          return (
            <tr
              key={user.email}
              style={{
                backgroundColor: showColors ? backgroundColor : 'transparent',
              }}
            >
              <td>
                <img
                  src={user.picture.thumbnail}
                  alt={`${user.name.first} ${user.name.last}`}
                />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button onClick={() => deleteUser(user)}>Borrar</button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
