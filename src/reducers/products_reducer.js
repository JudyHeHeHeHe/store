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

const products_reducer = (state, action) => {
  if (action.type === SIDEBAR_OPEN) {
    return { ...state, isSideBarOpen: true }
  }

  if (action.type === SIDEBAR_CLOSE) {
    return { ...state, isSideBarOpen: false }
  }

  if (action.type === GET_PRODUCTS_BEGIN) {
    return { ...state, productsLoading: true }
  }

  if (action.type === GET_PRODUCTS_BEGIN) {
    return { ...state, productsLoading: true }
  }

  if (action.type === GET_PRODUCTS_SUCCESS) {
    return { ...state, products: action.payload, productsLoading: false }
  }

  if (action.type === GET_PRODUCTS_ERROR) {
    return { ...state, productsError: true }
  }

  if (action.type === GET_SINGLE_PRODUCT_BEGIN) {
    return {
      ...state,
      singleProductLoading: true,
    }
  }

  if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
    return {
      ...state,
      singleProductLoading: false,
      singleProduct: action.payload,
    }
  }

  if (action.type === GET_SINGLE_PRODUCT_ERROR) {
    return {
      ...state,
      singleProductLoading: false,
      singleProductError: true,
    }
  }

  throw new Error("No matching action type")
}

export default products_reducer
