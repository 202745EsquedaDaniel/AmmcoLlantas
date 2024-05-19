import { useRoutes, BrowserRouter } from 'react-router-dom'
import './App.css'
import { Home } from '../Home'
import { NavBar } from '../../components/navbar'
import { Sidebar } from '../../components/sidebar'
import { InventorySystemProvider } from '../../context'
import { Manage_User } from '../manage user'
import { Orders } from '../order'
import { Products } from '../product'
import { Providers } from '../provider'
import { CheckoutSideMenu } from '../../components/checkoutSideMenu'



const AppRoutes = () => {
  let routes = useRoutes([
    {path:"/", element:<Home/>},
    {path:"/products", element:<Products/>},
    {path:"/providers", element:<Home/>},
    {path:"/orders", element:<Orders/>},
    {path:"/manage_user", element:<Manage_User/>},
    {path:"/providers", element:<Providers/>}

  ])
  return routes
}

function App() {
  return(
    <InventorySystemProvider>
      <BrowserRouter>
      <AppRoutes></AppRoutes>
      <NavBar></NavBar>
       <CheckoutSideMenu></CheckoutSideMenu>
      <Sidebar></Sidebar>
      </BrowserRouter>
    </InventorySystemProvider>

  )

  
}

export default App
