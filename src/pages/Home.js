import React from 'react';
import NavBar from '../features/navbar/NavBar';
import ProductList from '../features/product/components/ProductList';
import { Footer } from '../features/common/Footer';
const Home = () => {
  return (
    <div>
      <NavBar>
        <ProductList></ProductList>
      </NavBar>
      <Footer></Footer>
    </div>
  )
}

export default Home
