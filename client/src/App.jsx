
import { Route, Routes } from 'react-router-dom'
import './App.css'
import AuthLayout from './components/auth/layout'
import AuthLogin from './pages/auth/Login'
import AuthRegister from './pages/auth/register'
import AdminLayout from './components/admin-view/layout'
import AdminDashboard from './pages/admin-view/dashboard'
import AdminFeauters from './pages/admin-view/feauters'
import AdminOrders from './pages/admin-view/orders'
import AdminProducts from './pages/admin-view/products'
import ShoppingLayout from './components/shopping-view/layout'
import NotFound from './pages/not-found'
import ShoppingAccount from './pages/shopping-view/account'
import ShoppingCheckout from './pages/shopping-view/checkout'
import ShoppingHome from './pages/shopping-view/home'
import ShoppingListing from './pages/shopping-view/listing'
import CheckAuth from './components/common/check-auth'
import { use } from 'react'
import UnauthPage from './pages/unauth-page'


function App() {

  /* const isAuthentucated = false;
  const user = null */

  const isAuthentucated = true;
  const user = {
    name:"Samsung",
    role: "user",
  }

  return (
    <>
      <div className='flex flex-col overflow-hidden bg-white'>
        
        <Routes>
          <Route path='/auth' element={<CheckAuth isAuthentucated={isAuthentucated} user={user}><AuthLayout /></CheckAuth>}>
            <Route path='login' element= {<AuthLogin />}></Route>
            <Route path='register' element= {<AuthRegister/>}></Route>
          </Route>
          <Route path='/admin' element={<CheckAuth isAuthentucated={isAuthentucated} user={user}><AdminLayout /></CheckAuth>}>
            <Route path='dashboard' element= {<AdminDashboard />}></Route>
            <Route path='products' element= {<AdminProducts />}></Route>
            <Route path='orders' element= {<AdminOrders />}></Route>
            <Route path='feauters' element= {<AdminFeauters />}></Route>
          </Route>
          <Route path='/shop' element={<CheckAuth isAuthentucated={isAuthentucated} user={user}><ShoppingLayout/></CheckAuth>}>
            <Route path='account' element={<ShoppingAccount></ShoppingAccount>}></Route>
            <Route path='checkout' element={<ShoppingCheckout></ShoppingCheckout>}></Route>
            <Route path='home' element={<ShoppingHome></ShoppingHome>}></Route>
            <Route path='listing' element={<ShoppingListing></ShoppingListing>}></Route>
          </Route>
          <Route path='*' element={<NotFound></NotFound>}></Route>
          <Route path='/unauth-page' element={<UnauthPage></UnauthPage>}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App
