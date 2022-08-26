import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

const Error = () => {
  return (
    <Wrapper>
      <h1>404</h1>
      <p>Page not found</p>
      <Link to='/'>Go home</Link>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  text-align: center;
  h1 {
    font-size: 10rem;
  }
  h3 {
    text-transform: none;
    margin-bottom: 2rem;
  }
`

export default Error
