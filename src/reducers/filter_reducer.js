import {
  TOGGLE_VIEW,
  LOAD_PRODUCTS,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  CLEAR_FILTERS,
  FILTER_PRODUCTS,
} from "../actions"

const filter_reducer = (state, action) => {
  if (action.type === TOGGLE_VIEW) {
    return {
      ...state,
      isGridView: !state.isGridView,
    }
  }

  if (action.type === LOAD_PRODUCTS) {
    let max = Number.MIN_SAFE_INTEGER
    let min = Number.MAX_SAFE_INTEGER

    action.payload.forEach((el) => {
      max = Math.max(el.price, max)
      min = Math.min(el.price, min)
    })
    return {
      ...state,
      products: action.payload,
      filteredProducts: action.payload,
      filter: {
        ...state.filter,
        price: max,
        maxValue: max,
        minValue: min,
      },
    }
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filter: {
        ...action.payload,
        price: state.filter.maxValue,
        maxValue: state.filter.maxValue,
        minValue: state.filter.minValue,
      },
    }
  }
  if (action.type === UPDATE_SORT) {
    return {
      ...state,
      sort: action.payload,
    }
  }

  if (action.type === SORT_PRODUCTS) {
    let temp = [...state.filteredProducts]
    if (state.sort === "price-lowest") {
      temp = temp.sort((a, b) => a.price - b.price)
    } else if (state.sort === "price-highest") {
      temp = temp.sort((a, b) => b.price - a.price)
    } else if (state.sort === "name-a") {
      temp = temp.sort((a, b) => a.name.localeCompare(b.name))
    } else if (state.sort === "name-z") {
      temp = temp.sort((a, b) => b.name.localeCompare(a.name))
    }

    return {
      ...state,
      filteredProducts: temp,
    }
  }

  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload

    return {
      ...state,
      filter: {
        ...state.filter,
        [name]: value,
      },
    }
  }

  if (action.type === FILTER_PRODUCTS) {
    let temp = [...state.products]

    const { color, category, company, price, shipping, text } = state.filter

    if (category !== "all") {
      temp = temp.filter((el) => el.category.toLowerCase() === category)
    }
    if (company !== "all") {
      temp = temp.filter((el) => el.company.toLowerCase() === company)
    }
    if (color !== "all") {
      temp = temp.filter((el) => el.colors.includes(color))
    }

    if (text !== "") {
      temp = temp.filter((el) => el.name.toLowerCase().includes(text))
    }

    if (shipping) {
      temp = temp.filter((el) => el.shipping)
    }

    temp = temp.filter((el) => el.price <= price)

    return {
      ...state,
      filteredProducts: temp,
    }
  }

  throw new Error("no matching actions")
}

export default filter_reducer
