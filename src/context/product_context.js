import { createContext, useContext, useReducer, useEffect } from "react"
import reducer from "../reducers/products_reducer"
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions"
import { fetchUrl } from "../utils/constants"
const ProductsContext = createContext()
const initialState = {
  isSideBarOpen: false,
  products: [],
  productsLoading: false,
  productsError: false,
  singleProduct: {},
  singleProductLoading: false,
  singleProductError: false,
}

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const openSideBar = () => {
    dispatch({ type: SIDEBAR_OPEN })
  }

  const closeSideBar = () => {
    dispatch({ type: SIDEBAR_CLOSE })
  }

  const fetchProducts = async () => {
    dispatch({ type: GET_PRODUCTS_BEGIN })

    try {
      const res = await fetch(fetchUrl)
      const data = await res.json()
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR })
    }
  }

  const fetchSingleProduct = async (url) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN })

    try {
      const res = await fetch(url)
      const data = await res.json()
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR })
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <ProductsContext.Provider
      value={{ ...state, openSideBar, closeSideBar, fetchSingleProduct }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export const useProductContext = () => useContext(ProductsContext)
