import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Signup from './components/Signup/Signup';
import Product from "../src/components/products/Product"

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/products" element={<Product/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
