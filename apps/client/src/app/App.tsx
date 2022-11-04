import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { Main } from './pages/main/Main';
import { OrderForm } from './pages/order-form/OrderForm';
import { Category } from './pages/category/Category';
import { LoginForm } from '@web/pages/login-form/LoginForm';
import { AuthContextProvider } from './_contexts/AuthContext';
import { Layout } from './layout/Layout';

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="order-form" element={<OrderForm />} />
          <Route path="category/:id" element={<Category />} />
          <Route path="admin" element={<LoginForm />} />
        </Route>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
