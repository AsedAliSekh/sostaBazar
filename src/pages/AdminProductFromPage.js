import React from 'react';
import NavBar from '../features/navbar/NavBar';
import AdminProductFrom from '../features/admin/components/AdminProductFrom';
const AdminProductFromPage = () => {
  return (
    <div>
      <NavBar>
        <AdminProductFrom></AdminProductFrom>
      </NavBar>
    </div>
  )
}

export default AdminProductFromPage
