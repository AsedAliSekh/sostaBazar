import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOutAsync, selectLoggedInUser } from '../authSlice';
import { Navigate } from 'react-router-dom';

const LogOut = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser);

    useEffect(()=>{
        dispatch(logOutAsync())
    },[dispatch])
  return (
    <div>
      {!user && <Navigate to={'/login'} replace={true}></Navigate>}
    </div>
  )
}

export default LogOut
