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

const initialState: UserWithId[] = [
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

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    deleteUserById: (state, action: PayloadAction<UserId>) => {
      const userId = action.payload
      return (state = state.filter((user) => user.id !== userId))
    },
  },
})

export default usersSlice.reducer

export const { deleteUserById } = usersSlice.actions
