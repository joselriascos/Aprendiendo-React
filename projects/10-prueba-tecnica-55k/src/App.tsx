import './App.css'
import { useMemo, useRef, useState } from 'react'
import { SortBy, type User } from './types.d'
import { UsersList } from './components/UsersList'
import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query'

interface Props {
  users: User[]
  nextPage: Number
}

const fetchUsers = async ({
  pageParam = 1,
}: QueryFunctionContext): Promise<Props> => {
  return await fetch(
    `https://randomuser.me/api/?results=10&seed=joselriascos&page=${pageParam}`
  )
    .then((res) => {
      if (!res.ok) throw new Error('Error en la petición')
      return res.json()
    })
    .then((res) => ({
      users: res.results,
      nextPage: Number(res.info.page) + 1,
    }))
}

function App() {
  const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery<Props>({
      queryKey: ['users'],
      queryFn: fetchUsers,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      initialPageParam: 1,
    })

  const users: User[] = data?.pages?.flatMap((page) => page.users) ?? []
  console.log(users)

  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [countryToFilter, setCountryToFilter] = useState('')

  const [currentPage, setCurrentPage] = useState(1)

  const originalUsers = useRef<User[]>([])

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const handleSorting = (sortBy: SortBy) => {
    if (sortBy === sorting) return setSorting(SortBy.NONE)

    if (sortBy === SortBy.NAME) return setSorting(SortBy.NAME)
    if (sortBy === SortBy.LAST) return setSorting(SortBy.LAST)
    if (sortBy === SortBy.COUNTRY) return setSorting(SortBy.COUNTRY)
  }

  const handleDelete = (user: User) => {
    // const filteredUsers = users.filter((u) => u !== user)
    // setUsers(filteredUsers)
  }

  const handleReset = () => {
    // setUsers(originalUsers.current)
    refetch()
  }

  const filteredUsers = useMemo(() => {
    if (countryToFilter.trim().length > 0) {
      return users.filter((user) =>
        user.location.country
          .toLowerCase()
          .includes(countryToFilter.trim().toLowerCase())
      )
    }
    return users
  }, [users, countryToFilter])

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NAME)
      return filteredUsers.toSorted((a, b) =>
        a.name.first.localeCompare(b.name.first)
      )
    if (sorting === SortBy.LAST)
      return filteredUsers.toSorted((a, b) =>
        a.name.last.localeCompare(b.name.last)
      )
    if (sorting === SortBy.COUNTRY)
      return filteredUsers.toSorted((a, b) =>
        a.location.country.localeCompare(b.location.country)
      )

    return filteredUsers
  }, [sorting, filteredUsers])

  return (
    <div className="App">
      <h1>Prueba técnica</h1>
      <header
        style={{
          marginBottom: '40px',
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
        }}
      >
        <button onClick={toggleColors}>Colorear filas</button>
        <button onClick={() => handleSorting(SortBy.COUNTRY)}>
          {sorting === SortBy.COUNTRY
            ? 'No ordenar por país'
            : 'Ordenar por país'}
        </button>
        <button onClick={handleReset}>Resetear usuarios</button>
        <input
          type="text"
          placeholder="Filtrar por país"
          onChange={(e) => setCountryToFilter(e.target.value)}
        />
      </header>
      <main>
        {users.length > 0 && (
          <UsersList
            deleteUser={handleDelete}
            users={sortedUsers}
            showColors={showColors}
            sortUsers={handleSorting}
          />
        )}
        {isLoading && <strong>Cargando...</strong>}
        {!isLoading && isError && <p>Error al cargar usuarios</p>}
        {!isLoading && !isError && users.length === 0 && <p>No hay usuarios</p>}
        {!isLoading && !isError && (
          <button onClick={async () => await fetchNextPage()}>
            Cargar más resultados
          </button>
        )}
      </main>
    </div>
  )
}

export default App
