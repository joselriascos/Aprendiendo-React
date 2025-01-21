import { createContext, useEffect, useReducer, useState } from 'react'
import { cartReducer, cartInitialState } from '../reducers/cart'

export const CartContext = createContext()

function useCartProvider () {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    //guardar en localStorage
    window.localStorage.setItem("cart", JSON.stringify(state))

    // Calcular total
    const newTotal = Number(state.reduce((acc, el) => acc + el.quantity * el.price, 0).toFixed(2))
    setTotal(newTotal)

  }, [state])

  const addToCart = (product) => dispatch ({
    type: "ADD_TO_CART",
    payload: product
  })

  const reduceFromCart = (product) => dispatch ({
    type: "REDUCE_FROM_CART",
    payload: product
  })

  const removeFromCart = (product) => dispatch ({
    type: "REMOVE_FROM_CART",
    payload: product
  })

  const clearCart = () => dispatch ({
    type: "CLEAR_CART"
  })

  return {state, addToCart, reduceFromCart, removeFromCart, clearCart, total}
}

export function CartProvider({ children }) {
  const { state, addToCart, reduceFromCart, removeFromCart, clearCart, total } = useCartProvider()
  
  return (
    <CartContext.Provider
      value={{
        cart: state,
        addToCart,
        reduceFromCart,
        clearCart,
        removeFromCart,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
