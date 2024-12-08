import react, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { selectUserInfo, updateUserAsync } from '../userSlice';
import { useForm } from 'react-hook-form';


const UserProfile = () => {
    const user = useSelector(selectUserInfo);
    const dispatch = useDispatch();
    // react hook from 
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm();
    const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
    const [showAddAddressForm, setShowAddAddressForm] = useState(false);

    const handleEditForm = (index) => {
        setSelectedEditIndex(index);
        const address = user.addresses[index];
        setValue('name', address.name);
        setValue('email', address.email);
        setValue('city', address.city);
        setValue('state', address.state);
        setValue('pinCode', address.pinCode);
        setValue('phone', address.phone);
        setValue('street', address.street);
    };

    const handleEdit = (updatedAddress, index) => {
        const newUser = { ...user, addresses: [...user.addresses] } // for shallow copy issu
        newUser.addresses.splice(index, 1, updatedAddress);
        dispatch(updateUserAsync(newUser));
        setSelectedEditIndex(-1);
    }

    const handleRemove = (e, index) => {
        const newUser = {
            ...user,
            addresses: user.addresses.filter((_, i) => i !== index)
        };
        dispatch(updateUserAsync(newUser));
    }
    const handleAdd = (address) => {
        const newUser = { ...user, addresses: [...user.addresses, address] };
        dispatch(updateUserAsync(newUser));
        setShowAddAddressForm(false);
    }

    return (
        <>
            <div className="mx-auto mt-10 max-w-4xl px-4 py-6 sm:px-6 lg:px-8 bg-white max-h-full">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    Name: {user.name ? user.name : "New User"}
                </h1>
                <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
                    Email Address : {user.email}
                </h3>



                {/* Seved Address Section  */}
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <button
                        onClick={e => { setShowAddAddressForm(true); setSelectedEditIndex(-1) }}
                        type="submit"
                        className="rounded-md my-5 bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Add New Address
                    </button>
                    {showAddAddressForm ? (
                        <form
                            className="bg-white px-5 py-12 mt-12"
                            noValidate
                            onSubmit={handleSubmit((data) => {
                                console.log(data);
                                handleAdd(data);
                                reset();
                            })}
                        >
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                                        Personal Information
                                    </h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                        Use a permanent address where you can receive mail.
                                    </p>

                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-4">
                                            <label
                                                htmlFor="name"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Full name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('name', {
                                                        required: 'name is required',
                                                    })}
                                                    id="name"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                {errors.name && (
                                                    <p className="text-red-500">
                                                        {errors.name.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="sm:col-span-4">
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Email address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="email"
                                                    {...register('email', {
                                                        required: 'email is required',
                                                    })}
                                                    type="email"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                {errors.email && (
                                                    <p className="text-red-500">
                                                        {errors.email.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label
                                                htmlFor="phone"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Phone
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="phone"
                                                    {...register('phone', {
                                                        required: 'phone is required',
                                                    })}
                                                    type="tel"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                {errors.phone && (
                                                    <p className="text-red-500">
                                                        {errors.phone.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-span-full">
                                            <label
                                                htmlFor="street-address"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Street address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('street', {
                                                        required: 'street is required',
                                                    })}
                                                    id="street"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                {errors.street && (
                                                    <p className="text-red-500">
                                                        {errors.street.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2 sm:col-start-1">
                                            <label
                                                htmlFor="city"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                City
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('city', {
                                                        required: 'city is required',
                                                    })}
                                                    id="city"
                                                    autoComplete="address-level2"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                {errors.city && (
                                                    <p className="text-red-500">
                                                        {errors.city.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label
                                                htmlFor="state"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                State / Province
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('state', {
                                                        required: 'state is required',
                                                    })}
                                                    id="state"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                {errors.state && (
                                                    <p className="text-red-500">
                                                        {errors.state.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label
                                                htmlFor="pinCode"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                ZIP / Postal code
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('pinCode', {
                                                        required: 'pinCode is required',
                                                    })}
                                                    id="pinCode"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                {errors.pinCode && (
                                                    <p className="text-red-500">
                                                        {errors.pinCode.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center justify-end gap-x-6">
                                    <button
                                        type="button"
                                        className="text-sm font-semibold leading-6 text-gray-900"
                                        onClick={() => {
                                            setShowAddAddressForm(false)
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Add Address
                                    </button>
                                </div>
                            </div>
                        </form>
                    ) : null}

                    <p className="mt-0.5 text-sm text-gray-500">Saved Address:</p>
                    {user.addresses.map((address, index) => (
                        <div key={index}>
                            {/* Address Edit From Section */}
                            {selectedEditIndex === index ? (
                                <form
                                    noValidate
                                    onSubmit={handleSubmit((data) => {
                                        // dispatch(updateUserAddressAsync({
                                        //     ...user,
                                        //     addresses: [...user.addresses, data]
                                        // }))
                                        // dispatch(createUserAsync({ email: data.email, password: data.password }))
                                        console.log(data);
                                        handleEdit(data, index)
                                        reset();
                                    })}
                                    className="bg-white px-5 py-12 mt-12"
                                >
                                    <div className="space-y-12">
                                        <div className="border-b border-gray-900/10 pb-12">
                                            <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                                                Shipping Address
                                            </h2>
                                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                                Use an address where you can receive delivary.
                                            </p>

                                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                                <div className="sm:col-span-3">
                                                    <label
                                                        htmlFor="name"
                                                        className="block text-sm font-medium leading-6 text-gray-900"
                                                    >
                                                        Full name
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            {...register('name', { required: "name is required" })}
                                                            id="name"
                                                            autoComplete="given-name"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>


                                                <div className="sm:col-span-4">
                                                    <label
                                                        htmlFor="email"
                                                        className="block text-sm font-medium leading-6 text-gray-900"
                                                    >
                                                        Email address
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            id="email"
                                                            {...register('email', { required: "email is required" })}
                                                            type="email"
                                                            autoComplete="email"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-3">
                                                    <label
                                                        htmlFor="phone"
                                                        className="block text-sm font-medium leading-6 text-gray-900"
                                                    >
                                                        Phone No
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            id="phone"
                                                            {...register('phone', { required: "phone no is required" })}
                                                            type="tel"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-span-full">
                                                    <label
                                                        htmlFor="street"
                                                        className="block text-sm font-medium leading-6 text-gray-900"
                                                    >
                                                        Street address
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            {...register('street', { required: "street is required" })}
                                                            id="street"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-2 sm:col-start-1">
                                                    <label
                                                        htmlFor="city"
                                                        className="block text-sm font-medium leading-6 text-gray-900"
                                                    >
                                                        City
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            {...register('city', { required: "city is required" })}
                                                            id="city"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-2">
                                                    <label
                                                        htmlFor="state"
                                                        className="block text-sm font-medium leading-6 text-gray-900"
                                                    >
                                                        State
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            {...register('state', { required: "state is required" })}
                                                            id="state"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-2">
                                                    <label
                                                        htmlFor="pinCode"
                                                        className="block text-sm font-medium leading-6 text-gray-900"
                                                    >
                                                        ZIP / Postal code
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            {...register('pinCode', { required: "pinCode is required" })}
                                                            id="pinCode"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex items-center justify-end gap-x-6">
                                            <button
                                                type="button"
                                                className="text-sm font-semibold leading-6 text-gray-900"
                                                onClick={() => {
                                                    setSelectedEditIndex(-1)
                                                }}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                Edit Address
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            ) : null}
                            {/* Showing saved Addresses  */}
                            <li
                                className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200"
                            >
                                <div className="flex gap-x-4">

                                    <div className="min-w-0 flex-auto">
                                        <p className="text-sm font-semibold leading-6 text-gray-900">
                                            {address.name}
                                        </p>
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                            {address.street}
                                        </p>
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                            {address.pinCode}
                                        </p>
                                    </div>
                                </div>
                                <div className="hidden sm:flex sm:flex-col sm:items-end">
                                    <p className="text-sm leading-6 text-gray-900">
                                        Phone: {address.phone}
                                    </p>
                                    <p className="text-sm leading-6 text-gray-500">
                                        {address.city}
                                    </p>
                                </div>
                                <div className="sm:flex sm:flex-col sm:items-end">
                                    <button
                                        onClick={(e) => handleEditForm(index)}
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={(e) => handleRemove(e, index)}
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </li>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default UserProfile
