import React from "react"
import { useCartContext } from "../context/cart_context"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { CartContent } from "../components"

const Cart = ({}) => {
  const { cart } = useCartContext()
  console.log(cart)
  if (!cart.length) {
    return (
      <Wrapper>
        <div className='empty'>
          <h2>Your cart is empty</h2>
          <Link to='/products'>Fill it</Link>
        </div>
      </Wrapper>
    )
  }

  return (
    <main>
      <Wrapper>
        <CartContent />
      </Wrapper>
    </main>
  )
}

const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`

export default Cart
