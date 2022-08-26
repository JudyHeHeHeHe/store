export const formatPrice = (price) => {
  const newPrice = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price / 100)

  return newPrice
}

export const getUnique = (products, type) => {
  let unique = products.reduce((acc, cur) => {
    acc.push(cur[type])
    return acc
  }, [])

  return ["all", ...new Set(unique)]
}
