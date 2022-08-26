import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions"

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, quantity, product, mainColor } = action.payload

    const item = state.cart.find((el) => el.id === id + mainColor)
    let tempCart = [...state.cart]

    if (item) {
      tempCart.map((el) =>
        el.id === id + mainColor
          ? {
              ...el,
              quantity:
                el.quantity + quantity > product.stock
                  ? el.max
                  : el.quantity + quantity,
            }
          : el
      )
    } else {
      const tempItem = {
        id: id + mainColor,
        name: product.name,
        color: mainColor,
        quantity,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      }

      tempCart = [...tempCart, tempItem]
    }

    return {
      ...state,
      cart: tempCart,
    }
  }

  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { type, id } = action.payload
    let tempCart

    if (type === "increase") {
      tempCart = state.cart.map((el) =>
        el.id === id
          ? {
              ...el,
              quantity: el.quantity + 1 > el.max ? el.max : el.quantity + 1,
            }
          : el
      )
    }

    if (type === "decrease") {
      tempCart = state.cart.map((el) =>
        el.id === id
          ? {
              ...el,
              quantity: el.quantity - 1 < 1 ? 1 : el.quantity - 1,
            }
          : el
      )
    }

    return {
      ...state,
      cart: tempCart,
    }
  }

  if (action.type === CLEAR_CART) {
    return {
      cart: [],
      totalAmount: 0,
      quantity: 0,
    }
  }

  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((el) => el.id !== action.payload)
    return { ...state, cart: tempCart }
  }

  if (action.type === COUNT_CART_TOTALS) {
    const newTotal = state.cart.reduce(
      (acc, cur) => {
        acc.totalAmount += cur.quantity * cur.price
        acc.quantity += cur.quantity

        return acc
      },
      { totalAmount: 0, quantity: 0 }
    )

    return {
      ...state,
      totalAmount: newTotal.totalAmount,
      quantity: newTotal.quantity,
    }
  }

  throw new Error("no matching action")
}

export default cart_reducer
