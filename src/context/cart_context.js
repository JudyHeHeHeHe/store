import { createContext, useContext, useEffect, useReducer } from "react"
import reducer from "../reducers/cart_reducer"
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from "../actions"

const CartContext = createContext()
const initialState = {
  cart: [],
  totalAmount: 0,
  quantity: 0,
  shipping: 990,
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const addToCart = (id, quantity, product, mainColor) => {
    dispatch({
      type: ADD_TO_CART,
      payload: { id, quantity, product, mainColor },
    })
  }

  const toggleCartItemAmount = (type, id) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { type, id } })
  }

  const clearCart = () => {
    dispatch({ type: CLEAR_CART })
  }

  const removeCartItem = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id })
  }

  useEffect(() => {
    dispatch({ type: COUNT_CART_TOTALS })
  }, [state.cart])

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        toggleCartItemAmount,
        clearCart,
        removeCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => {
  return useContext(CartContext)
}
