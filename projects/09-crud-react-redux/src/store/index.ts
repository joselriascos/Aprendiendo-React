import { configureStore, Middleware } from '@reduxjs/toolkit'
import usersReducer, { rollbackUser, UserWithId } from './users/slice'
import { toast } from 'sonner'

const persistanceLocalStorageMiddleware: Middleware =
  (store) => (next) => (action) => {
    // fase 1
    next(action)
    // fase 2 -> Después de que se ejecuta la acción
    localStorage.setItem('__redux_state__', JSON.stringify(store.getState()))
  }

const syncWithDatabase: Middleware = (store) => (next) => (action: any) => {
  const { type, payload } = action
  const previusState = store.getState()

  next(action)

  if (type === 'users/deleteUserById') {
    const userIdToRemove = payload
    const userToDelete = previusState.users.find(
      (user: UserWithId) => user.id === userIdToRemove
    )
    // Simulamos una llamada a la base de datos
    fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          toast.success(`Usuario ${userIdToRemove} eliminado correctamente`)
          return
        }
        throw new Error('Error al eliminar el usuario')
      })
      .catch((err) => {
        toast.error(`Error al eliminar el usuario ${userIdToRemove}`)
        if (userToDelete) store.dispatch(rollbackUser(userToDelete))
        console.log(err)
      })
  }
}

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      persistanceLocalStorageMiddleware,
      syncWithDatabase
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
