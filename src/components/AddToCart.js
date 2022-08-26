import React, { useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import AmountButtons from "./AmountButtons"
import { FaCheck } from "react-icons/fa"
import { useCartContext } from "../context/cart_context"

const AddToCart = ({ product }) => {
  const { colors, stock, id } = product
  const [mainColor, setMainColor] = useState(colors[0])
  const [quantity, setQuantity] = useState(1)

  const { addToCart } = useCartContext()

  const increaseAmount = () => {
    setQuantity((prevState) => {
      let temp = prevState + 1
      if (temp > stock) {
        temp = stock
      }
      return temp
    })
  }
  const decreaseAmount = () => {
    setQuantity((prevState) => {
      let temp = prevState - 1
      if (temp < 1) {
        temp = 1
      }
      return temp
    })
  }

  return (
    <Wrapper>
      <div className='colors'>
        <span>colors:</span>
        <div>
          {colors.map((el, index) => (
            <button
              onClick={() => setMainColor(el)}
              className={el === mainColor ? "color-btn active" : "color-btn"}
              key={index}
              style={{ backgroundColor: el }}
            >
              {el === mainColor && <FaCheck />}
            </button>
          ))}
        </div>
      </div>
      <div className='btn-container'>
        <AmountButtons
          quantity={quantity}
          increase={increaseAmount}
          decrease={decreaseAmount}
        />
        <Link
          onClick={() => addToCart(id, quantity, product, mainColor)}
          to='/cart'
          className='btn'
        >
          Add to cart
        </Link>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`

export default AddToCart
