import React from "react"
import styled from "styled-components"
import aboutImg from "../assets/hero-bcg.jpeg"

const AboutPage = () => {
  return (
    <main>
      <Wrapper className='page section section-center'>
        <img src={aboutImg} alt='about' />
        <article>
          <div className='title'>
            <h2>our history</h2>
          </div>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam
            aperiam debitis, modi eveniet repellat fugiat temporibus
            consequuntur ratione molestiae repellendus sed ut nobis cumque sunt
            laboriosam dignissimos tempora at id.
          </p>
        </article>
      </Wrapper>
    </main>
  )
}

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }

  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`
export default AboutPage
