import React from 'react';
import NavBar from '../features/navbar/NavBar';
import ProductList from '../features/product-list/ProductList';
const Home = () => {
  return (
    <div>
      <NavBar>
        <ProductList></ProductList>
      </NavBar>
    </div>
  )
}

export default Home
