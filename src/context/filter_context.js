import { createContext, useContext, useEffect, useReducer } from "react"
import reducer from "../reducers/filter_reducer"

import {
  LOAD_PRODUCTS,
  TOGGLE_VIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions"
import { useProductContext } from "./product_context"
const FilterContext = createContext()

const initialState = {
  isGridView: false,
  products: [],
  filteredProducts: [],
  sort: "price-lowest",
  filter: {
    color: "all",
    category: "all",
    company: "all",
    price: 0,
    minValue: 0,
    maxValue: 0,
    shipping: false,
    text: "",
  },
}

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { products } = useProductContext()

  const toggleView = () => {
    dispatch({ type: TOGGLE_VIEW })
  }

  const handleSort = (type) => {
    dispatch({ type: UPDATE_SORT, payload: type })
  }

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTERS, payload: initialState.filter })
  }

  const updateFilter = (e) => {
    const name = e.target.name
    let value = e.target.value
    const buttonValue = e.target.dataset.value

    if (e.target.name === "shipping") {
      value = e.target.checked
    }

    if (e.target.name === "price") {
      value = +value
    }

    dispatch({
      type: UPDATE_FILTERS,
      payload: { name, value: value || buttonValue },
    })
  }

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products })
  }, [products])

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS })
    dispatch({ type: SORT_PRODUCTS })
  }, [state.sort, products, state.filter])

  return (
    <FilterContext.Provider
      value={{
        ...state,
        toggleView,
        handleSort,
        updateFilter,
        clearFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export const useFilterContext = () => {
  return useContext(FilterContext)
}
