import {
  type Language,
  type Action,
  type State,
  FromLanguage,
} from '../types.d'
import { useReducer } from 'react'

const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false,
}

// TODO: llevar reducer a carpeta reducers
export function reducer(state: State, action: Action) {
  const { type } = action

  if (type === 'INTERCHANGE_LANGUAGES') {
    if (state.fromLanguage === 'auto') return state

    const loading = state.fromText !== ''

    return {
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage,
      fromText: state.result,
      result: '',
      loading,
    }
  }

  if (type === 'SET_FROM_LANGUAGE') {
    if (state.fromLanguage === action.payload) return state

    const loading = state.fromText !== ''

    return {
      ...state,
      fromLanguage: action.payload,
      result: '',
      loading,
    }
  }

  if (type === 'SET_TO_LANGUAGE') {
    if (state.fromLanguage === action.payload) return state

    const loading = state.fromText !== ''

    return {
      ...state,
      toLanguage: action.payload,
      loading,
      result: '',
    }
  }

  if (type === 'SET_FROM_TEXT') {
    const loading = action.payload !== ''

    return {
      ...state,
      fromText: action.payload,
      loading,
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
  const setFromLanguage = (payload: FromLanguage) =>
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
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
  }
}
