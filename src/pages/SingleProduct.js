import React, { useEffect } from "react"
import { useProductContext } from "../context/product_context"
import { formatPrice } from "../utils/helpers"
import { singleProductUrl } from "../utils/constants"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { ProductImages, AddToCart, Loading, Error, Stars } from "../components"

const SingleProduct = () => {
  const {
    fetchSingleProduct,
    singleProduct,
    singleProductLoading: loading,
    singleProductError: error,
  } = useProductContext()

  const { id } = useParams()
  const formattedUrl = `${singleProductUrl}${id}`

  useEffect(() => {
    fetchSingleProduct(formattedUrl)
  }, [])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }

  console.log(singleProduct)
  const {
    name,
    price,
    description,
    stock,
    stars,
    reviews,
    id: sku,
    company,
    images,
  } = singleProduct

  return (
    <Wrapper>
      <div className='section section-center page'>
        <Link to='/products' className='btn'>
          Back to products
        </Link>
        <div className='product-center'>
          <ProductImages images={images} />
          <section className='content'>
            <h2>{name}</h2>
            <Stars stars={stars} reviews={reviews} />
            <h5 className='price'>{formatPrice(price)}</h5>
            <p className='desc'>{description}</p>
            <p className='info'>
              <span>Available: </span>
              {stock > 0 ? "In stock" : "Out of stock"}
            </p>
            <p className='info'>
              <span>SKU: </span>
              {sku}
            </p>
            <p className='info'>
              <span>Brand: </span>
              {company}
            </p>
            <hr />
            {stock > 0 && <AddToCart product={singleProduct} />}
          </section>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: start;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`

export default SingleProduct
