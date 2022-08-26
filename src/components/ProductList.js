import React from "react"
import { useProductContext } from "../context/product_context"
import ListView from "./ListView"
import GridView from "./GridView"
import Loading from "./Loading"
import Error from "./Error"
import { useFilterContext } from "../context/filter_context"

const ProductList = () => {
  const { productsLoading: loading, productsError: error } = useProductContext()

  const { filteredProducts: products } = useFilterContext()
  console.log(products)
  const { isGridView } = useFilterContext()

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }

  if (products.length === 0) {
    return <h5>no products were found...</h5>
  }

  return (
    <>
      {isGridView ? (
        <GridView products={products} />
      ) : (
        <ListView products={products} />
      )}
    </>
  )
}

export default ProductList
