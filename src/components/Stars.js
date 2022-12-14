import React from "react"
import styled from "styled-components"
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs"

const Stars = ({ stars, reviews }) => {
  const starRender = new Array(5).fill("").map((_, idx) => {
    let temp = idx + 0.5
    return (
      <span key={idx}>
        {idx < stars ? (
          <BsStarFill />
        ) : idx < temp ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
    )
  })

  return (
    <Wrapper>
      <div className='stars'>{starRender}</div>
      <p className='reviews'>{reviews} customer reviews</p>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`

export default Stars
