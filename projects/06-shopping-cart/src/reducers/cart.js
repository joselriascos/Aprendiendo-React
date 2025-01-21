const savedCart = window.localStorage.getItem("cart")
export const cartInitialState = JSON.parse(savedCart) || []

export const cartReducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action

  if (actionType === "ADD_TO_CART"){
    const productInCartIndex = state.findIndex(item => item.id === actionPayload.id)

      if (productInCartIndex >= 0) {
        // Más legible:
        // const newState = structuredClone(state)
        // newState[productInCartIndex].quantity += 1
        // return newState
        

        // Más fácil:
        // const newState = state.map(item => {
        //     if (item.id === actionPayload.id) {
        //         return (
        //             {
        //                 ...item,
        //                 quantity: item.quantity + 1
        //             }
        //         )
        //     }
        //     return item
        // })
        // return newState

        //Probablemente más rápida:
        const newState = [
            ...state.slice(0, productInCartIndex),
            {...state[productInCartIndex], quantity: state[productInCartIndex].quantity + 1},
            ...state.slice(productInCartIndex+1)
        ]
        return newState
      }

      return (
        [
          ...state,
          {
            ...actionPayload,
            quantity: 1
          }
        ]
      )
  }

  if (actionType === "REDUCE_FROM_CART"){
    const productInCartIndex = state.findIndex(item => item.id === actionPayload.id)

    if (productInCartIndex >= 0) {
      if (state[productInCartIndex].quantity > 1){
        const newState = [
          ...state.slice(0, productInCartIndex),
          {...state[productInCartIndex], quantity: state[productInCartIndex].quantity - 1},
          ...state.slice(productInCartIndex+1)
        ]
        return newState
      }
    }
    return state.filter(item => item.id !== actionPayload.id)

  }

  if (actionType === "REMOVE_FROM_CART"){
    return state.filter(item => item.id !== actionPayload.id)
  }

  if (actionType === "CLEAR_CART"){
    return []
  }

}