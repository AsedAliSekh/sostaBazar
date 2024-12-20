import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLoggedInUserOrdersAsync, selectUserOrders } from '../userSlice';
import { selectLoggedInUser } from '../../auth/authSlice';
import { Link } from 'react-router-dom';


export default function UserOrders() {
  const orders = useSelector(selectUserOrders);
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync(user.id))
  }, [])

  return (
    <div>
      { orders.length> 0 ?
        orders.map((order) => (
          <div className="mx-auto mt-10 max-w-2xl px-4 py-6 sm:px-6 lg:px-8 bg-white max-h-full">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Order No #{order.id}</h1>
            <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
              Order Status : {order.status}
            </h3>
            <div className="mt-8">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          alt={item.title}
                          src={item.thumbnail}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href={item.href}>{item.title}</a>
                            </h3>
                            <p className="ml-4">${item.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="text-gray-500">
                            <label htmlFor="password" className="inline mr-5 text-sm font-medium leading-6 text-gray-900">
                              Qty: {item.quantity}
                            </label>
                          </div>


                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>$ {order.subTotalAmount.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total Item In this Order</p>
                <p>{order.totalCartItem} items</p>
              </div>

              <p className="mt-0.5 text-sm text-gray-500">Shipping Address:</p>
              <li
                className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200"
              >
                <div className="flex gap-x-4">

                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {order.selectedAddress.name}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {order.selectedAddress.street}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {order.selectedAddress.pinCode}
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    Phone: {order.selectedAddress.phone}
                  </p>
                  <p className="text-sm leading-6 text-gray-500">
                    {order.selectedAddress.city}
                  </p>
                </div>
              </li>
            </div>
          </div>
        )) :
        <div className='m-auto text-center bg-red-100 p-16'>
          <h2 className='text-red-600 text-center text-xl font-bold'>You Don't Have Any Order Rigth Now</h2>

                <Link to="/">
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </Link>

        </div>
        
      }
    </div>
  );
}



{/* <div className="mx-auto mt-10 max-w-2xl px-4 py-6 sm:px-6 lg:px-8 bg-white max-h-full">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Order #{order.id}</h1>
              <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
                Order Status : {order.status}
              </h3>
              <div className="mt-8">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {order.items.map((item) => (
                      <li key={item.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            alt={item.title}
                            src={item.thumbnail}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={item.href}>{item.title}</a>
                              </h3>
                              <p className="ml-4">${item.price}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="text-gray-500">
                              <label htmlFor="password" className="inline mr-5 text-sm font-medium leading-6 text-gray-900">
                                Qty: {item.quantity}
                              </label>
                            </div>


                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>$ {order.subTotalAmount.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total Item In this Order</p>
                  <p>{order.totalCartItem} items</p>
                </div>

                <p className="mt-0.5 text-sm text-gray-500">Shipping Address:</p>
                <li
                  className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200"
                >
                  <div className="flex gap-x-4">

                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {order.selectedAddress.name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {order.selectedAddress.street}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {order.selectedAddress.pinCode}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      Phone: {order.selectedAddress.phone}
                    </p>
                    <p className="text-sm leading-6 text-gray-500">
                      {order.selectedAddress.city}
                    </p>
                  </div>
                </li>
              </div>
            </div> */}