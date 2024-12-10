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
import { UserOrdersPage } from './pages/UserOrdersPage';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserAsync, selectUserInfo } from './features/user/userSlice';
import LogOut from './features/auth/components/LogOut';
import ForgotPasswordPage from './pages/ForgotPasswordPage';



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
  },
  {
    path: "/orders",
    element: <Protected>
      <UserOrdersPage></UserOrdersPage>
    </Protected>
  },
  {
    path: "/profile",
    element: <Protected>
      <UserProfilePage></UserProfilePage>
    </Protected>
  },
  {
    path: "/logout",
    element: <LogOut></LogOut>
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage></ForgotPasswordPage>
  }
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userInfo = useSelector(selectUserInfo);
  
  // dispatch for fatch user cart items 
  useEffect(()=>{
    if(user){
      dispatch(fetchCartItemsByUserIdAsync(user.id))
      dispatch(fetchLoggedInUserAsync(user.id))
    }
  }, [dispatch, user, userInfo])
  


  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
