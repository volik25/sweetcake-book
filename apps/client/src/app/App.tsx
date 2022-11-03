import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { Main } from './pages/main/Main';
import { OrderForm } from './pages/order-form/OrderForm';
import { Category } from './pages/category/Category';
import { AuthContextProvider } from './_contexts/AuthContext';

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route index element={<Main />} />
        <Route path="order-form" element={<OrderForm />} />
        <Route path="category/:id" element={<Category />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
