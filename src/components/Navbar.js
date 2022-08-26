import React from "react"
import { FaBars } from "react-icons/fa"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { Links } from "../utils/constants"
import CartButtons from "./CartButtons"
import { useProductContext } from "../context/product_context"

const NavBar = () => {
  const { openSideBar } = useProductContext()
  return (
    <NavContainer>
      <div className='nav-center'>
        <div className='nav-header'>
          <Link to='/'>
            <h3>Fun Store</h3>
          </Link>
          <button onClick={openSideBar} type='button' className='nav-toggle'>
            <FaBars />
          </button>
        </div>
        <ul className='nav-links'>
          {Links.map(({ id, text, path }) => (
            <li key={id}>
              <Link to={path}>{text}</Link>
            </li>
          ))}
        </ul>
        <CartButtons />
      </div>
    </NavContainer>
  )
}

const NavContainer = styled.nav`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
  }
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    h3 {
      margin-bottom: 0;
    }
  }
  .nav-toggle {
    background: transparent;
    border: transparent;
    color: var(--clr-primary-5);
    cursor: pointer;
    svg {
      font-size: 2rem;
    }
  }
  .nav-links {
    display: none;
  }
  .cart-btn-wrapper {
    display: none;
  }
  @media (min-width: 992px) {
    .nav-toggle {
      display: none;
    }
    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
    }
    .nav-links {
      display: flex;
      justify-content: center;
      li {
        margin: 0 0.5rem;
      }
      a {
        color: var(--clr-grey-3);
        font-size: 1rem;
        text-transform: capitalize;
        letter-spacing: var(--spacing);
        padding: 0.5rem;
        &:hover {
          border-bottom: 2px solid var(--clr-primary-7);
        }
      }
    }
    .cart-btn-wrapper {
      display: grid;
    }
  }
`

export default NavBar
