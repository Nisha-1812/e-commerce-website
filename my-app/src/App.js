import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Signin from './pages/Loginpage/Signin';
import DashboardLayout from './components/DashboardLayout';
import Product from './components/products/Product';
import Signup from './components/Signup/Signup';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Cart from './components/Carts/Cart';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path='/products' element={<Product />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path='/cart' element={<Cart />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App


