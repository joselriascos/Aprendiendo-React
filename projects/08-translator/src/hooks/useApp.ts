import {
  type Language,
  type Action,
  type State,
  fromLanguage,
} from '../types.d'
import { useReducer } from 'react'

const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false,
}

export function reducer(state: State, action: Action) {
  const { type } = action

  if (type === 'INTERCHANGE_LANGUAGES') {
    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage,
    }
  }

  if (type === 'SET_FROM_LANGUAGE') {
    return {
      ...state,
      loading: true,
      fromLanguage: action.payload,
    }
  }

  if (type === 'SET_TO_LANGUAGE') {
    return {
      ...state,
      toLanguage: action.payload,
    }
  }

  if (type === 'SET_FROM_TEXT') {
    return {
      ...state,
      fromText: action.payload,
      result: '',
    }
  }

  if (type === 'SET_RESULT') {
    return {
      ...state,
      loading: false,
      result: action.payload,
    }
  }

  return state
}

export function useApp() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { fromLanguage, toLanguage, fromText, result, loading } = state

  const interchangeLanguages = () => dispatch({ type: 'INTERCHANGE_LANGUAGES' })
  const setFromLenguage = (payload: fromLanguage) =>
    dispatch({ type: 'SET_FROM_LANGUAGE', payload })
  const setToLanguage = (payload: Language) =>
    dispatch({ type: 'SET_TO_LANGUAGE', payload })
  const setFromText = (payload: string) =>
    dispatch({ type: 'SET_FROM_TEXT', payload })
  const setResult = (payload: string) =>
    dispatch({ type: 'SET_RESULT', payload })

  return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguages,
    setFromLenguage,
    setToLanguage,
    setFromText,
    setResult,
  }
}
