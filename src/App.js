import React, { useEffect } from 'react';
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProductDetailPage from './pages/ProductDetailPage';
import { Protected } from './features/auth/components/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from './features/auth/authSlice';
import { fetchCartItemsByUserIdAsync } from './features/cart/cartSlice';
import { OrderSuccessPage } from './pages/OrderSuccessPage';



const router = createBrowserRouter([
  {
    path: "/",
    element:
      <Protected>
        <Home></Home>
      </Protected>

  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>
  },
  {
    path: "/cart",
    element: <Protected>
      <CartPage></CartPage>
    </Protected>

  },
  {
    path: "/checkout",
    element: <Protected>
      <CheckoutPage></CheckoutPage>
    </Protected>
  },
  {
    path: "/product-detail/:id",
    element: <Protected>
      <ProductDetailPage></ProductDetailPage>
    </Protected>
  },
  {
    path: "/order-success/:id",
    element: <Protected>
      <OrderSuccessPage></OrderSuccessPage>
    </Protected>
  }
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  // dispatch for fatch user cart items 
  useEffect(()=>{
    if(user){
      dispatch(
        fetchCartItemsByUserIdAsync(user.id)
      )
    }
  }, [dispatch, user])
  


  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
