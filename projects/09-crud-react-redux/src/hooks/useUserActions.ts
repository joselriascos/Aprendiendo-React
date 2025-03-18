import { useAppDispatch } from './store'
import { deleteUserById } from '../store/users/slice'
import { UserId } from '../store/users/slice'

export const useUserActions = () => {
  const dispatch = useAppDispatch()

  const removeUser = (id: UserId) => {
    dispatch(deleteUserById(id))
  }

  return { removeUser }
}
