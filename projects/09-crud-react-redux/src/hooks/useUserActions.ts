import { useAppDispatch } from './store'
import { addNewUser, deleteUserById } from '../store/users/slice'
import type { UserId, User } from '../store/users/slice'

export const useUserActions = () => {
  const dispatch = useAppDispatch()

  const addUser = ({ name, email, github }: User) => {
    dispatch(addNewUser({ name, email, github }))
  }

  const removeUser = (id: UserId) => {
    dispatch(deleteUserById(id))
  }

  return { addUser, removeUser }
}
