import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Cart from "./pages/Cart"
import Products from "./pages/Products.js"
import SingleProduct from "./pages/SingleProduct"
import Checkout from "./pages/Checkout"
import Error from "./pages/Error"
import { NavBar, Footer, SideBar } from "./components"

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <SideBar />
      <Routes>
        <Route index path='/' element={<Home />}></Route>
        <Route path='about' element={<About />}></Route>
        <Route path='cart' element={<Cart />}></Route>
        <Route path='products' element={<Products />}></Route>
        <Route path='products/:id' element={<SingleProduct />}></Route>
        <Route path='/checkout' element={<Checkout />}></Route>
        <Route path='*' element={<Error />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
