import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllOrdersAsync, selectOrders, updateOrderAsync } from '../../order/orderSlice';
import { discountedPrice } from '../../../app/constant'

export const AdminOrders = () => {
    const dispatch = useDispatch();
    const orders = useSelector(selectOrders);
    const [editableOrderId, setEditableOrderId] = useState(-1);


    const handleEdit = (order) => {
        setEditableOrderId(order.id);
    };
    const handleShow = () => {
        console.log('handleShow');
    };
    const handleUpdate = (e, order) => {
        const updatedOrder = { ...order, status: e.target.value };
        dispatch(updateOrderAsync(updatedOrder));
        setEditableOrderId(-1);
    };


    const chooseColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-purple-200 text-purple-600';
            case 'dispatched':
                return 'bg-yellow-200 text-yellow-600';
            case 'delivered':
                return 'bg-green-200 text-green-600';
            case 'cancelled':
                return 'bg-red-200 text-red-600';
            default:
                return 'bg-purple-200 text-purple-600';
        }
    };


    useEffect(() => {
        dispatch(fetchAllOrdersAsync())
    }, [dispatch])

    return (
        <>
            {/* component */}
            <div className="overflow-x-auto">
                <div className="min-w-screen flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
                    <div className="w-full">
                        <div className="bg-white shadow-md rounded my-6">
                            <table className="min-w-max w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 text-left">Order Id</th>
                                        <th className="py-3 px-6 text-left">Item</th>
                                        <th className="py-3 px-6 text-center">SubTotal</th>
                                        <th className="py-3 px-6 text-center">Shipping Address</th>
                                        <th className="py-3 px-6 text-center">Status</th>
                                        <th className="py-3 px-6 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light">
                                    {orders?.map((order) => (
                                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                                            {/* Order Id  */}
                                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="mr-2">
                                                        <img
                                                            className="w-6 h-6 rounded-full border-gray-200 border transform hover:scale-125"
                                                            src="https://randomuser.me/api/portraits/men/1.jpg"
                                                        />
                                                    </div>
                                                    <span className="font-medium">{order.id}</span>
                                                </div>
                                            </td>
                                            {/* Items in the Order  */}
                                            <td className="py-3 px-6 text-left">
                                                {order.items.map((item) => (
                                                    <div className="flex items-center">
                                                        <div className="mr-2">
                                                            <img
                                                                className="w-6 h-6 rounded-full transform hover:scale-150"
                                                                src={item.thumbnail}
                                                            />
                                                        </div>
                                                        <span>
                                                            {item.title} - #{item.quantity} - $
                                                            {discountedPrice(item)}
                                                        </span>
                                                    </div>
                                                ))}
                                            </td>
                                            {/* <td className="py-3 px-6 text-center">
                                                <div className="flex items-center justify-center">
                                                    <img
                                                        className="w-6 h-6 rounded-full border-gray-200 border transform hover:scale-125"
                                                        src="https://randomuser.me/api/portraits/men/1.jpg"
                                                    />
                                                    <img
                                                        className="w-6 h-6 rounded-full border-gray-200 border -m-1 transform hover:scale-125"
                                                        src="https://randomuser.me/api/portraits/women/2.jpg"
                                                    />
                                                    <img
                                                        className="w-6 h-6 rounded-full border-gray-200 border -m-1 transform hover:scale-125"
                                                        src="https://randomuser.me/api/portraits/men/3.jpg"
                                                    />
                                                </div>
                                            </td> */}
                                            {/* Total order Cost Column  */}
                                            <td className="py-3 px-6 text-center">
                                                <div className="flex items-center justify-center">
                                                    ${order.subTotalAmount.toFixed(2)}
                                                </div>
                                            </td>
                                            {/* Shipping Address Column  */}
                                            <td className="py-3 px-6 text-center">
                                                <div className="">
                                                    <div>
                                                        <strong>{order.selectedAddress.name}</strong>,
                                                    </div>
                                                    <div>{order.selectedAddress.street},</div>
                                                    <div>{order.selectedAddress.city}, </div>
                                                    <div>{order.selectedAddress.state}, </div>
                                                    <div>{order.selectedAddress.pinCode}, </div>
                                                    <div>{order.selectedAddress.phone}, </div>
                                                </div>
                                            </td>
                                            {/* Order Status column  */}
                                            <td className="py-3 px-6 text-center">
                                                {order.id === editableOrderId ? (
                                                    <select onChange={(e) => handleUpdate(e, order)}>
                                                        <option value="pending">Pending</option>
                                                        <option value="dispatched">Dispatched</option>
                                                        <option value="delivered">Delivered</option>
                                                        <option value="cancelled">Cancelled</option>
                                                    </select>
                                                ) : (
                                                    <span
                                                        className={`${chooseColor(
                                                            order.status
                                                        )} py-1 px-3 rounded-full text-xs`}
                                                    >
                                                        {order.status}
                                                    </span>
                                                )}
                                            </td>

                                            {/* Show & Edit Icon  */}
                                            <td className="py-3 px-6 text-center">
                                                <div className="flex item-center justify-center">
                                                    <div
                                                        onClick={(e) => handleShow(order)}
                                                        className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                            />
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <div
                                                        onClick={(e) => handleEdit(order)}
                                                        className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
