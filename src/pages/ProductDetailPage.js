import React from 'react'
import NavBar from '../features/navbar/NavBar';
import ProductDetail from '../features/product/components/ProductDetail';
import { Footer } from '../features/common/Footer';

export default function ProductDetailPage
  () {
  return (
    <div>
      <NavBar>
        <ProductDetail></ProductDetail>
      </NavBar>
      <Footer></Footer>
    </div>
  )
}
