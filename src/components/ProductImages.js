import React, { useEffect, useState } from "react"
import Placeholder from "../assets/placeholder.png"
import styled from "styled-components"

const ProductImages = ({ images = [] }) => {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (idx > images.length - 1) {
      setIdx(0)
    }
  }, [idx, images])

  useEffect(() => {
    const timer = setInterval(() => {
      setIdx((prevState) => prevState + 1)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  let url, filename
  if (images.length) ({ url, filename } = images[idx] || images[0])

  return (
    <Wrapper>
      <img src={url || Placeholder} alt={filename || "furniture"} />
      <div className='gallery'>
        {images.map(({ url, filename }, index) => (
          <img
            className={idx === index ? "active" : null}
            key={index}
            src={url || Placeholder}
            alt={filename || "furniture"}
            onClick={() => setIdx(index)}
          />
        ))}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .main {
    height: 600px;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .active {
    box-shadow: 0px 0px 0px 2px var(--clr-primary-5);
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`
export default ProductImages
