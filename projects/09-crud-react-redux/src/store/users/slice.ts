import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type UserId = string

export interface User {
  name: string
  email: string
  github: string
}

export interface UserWithId extends User {
  id: UserId
}

const DEFAULT_STATE = [
  {
    id: '1',
    name: 'Jose Riascos',
    email: 'joseluis.riascos10@gmail.com',
    github: 'joselriascos',
  },
  {
    id: '2',
    name: 'Emily Jhonson',
    email: 'emily.jhonson@gmail.com',
    github: 'emilys',
  },
  {
    id: '3',
    name: 'Miguel Durán',
    email: 'midudev@gmail.com',
    github: 'midudev',
  },
  {
    id: '4',
    name: 'Sofia Rodriguez',
    email: 'sofia.rodriguez@gmail.com',
    github: 'sofiarod',
  },
  {
    id: '5',
    name: 'Emma Miller',
    email: 'emma.miller@gmail.com',
    github: 'emmaj',
  },
]

const initialState: UserWithId[] = (() => {
  const persistedState = localStorage.getItem('__redux_state__')
  return persistedState ? JSON.parse(persistedState).users : DEFAULT_STATE
})()

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addNewUser: (state, action: PayloadAction<User>) => {
      const id = crypto.randomUUID()
      const newUser = { ...action.payload, id }
      state.push(newUser)
    },
    deleteUserById: (state, action: PayloadAction<UserId>) => {
      const userId = action.payload
      return state.filter((user) => user.id !== userId)
    },
    rollbackUser: (state, action: PayloadAction<UserWithId>) => {
      const isUserAlreadyDefined = state.some(
        (user) => user.id === action.payload.id
      )
      if (!isUserAlreadyDefined) state.push(action.payload)
    },
  },
})

export default usersSlice.reducer

export const { addNewUser, deleteUserById, rollbackUser } = usersSlice.actions
