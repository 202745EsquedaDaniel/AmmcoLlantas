import { useRoutes, BrowserRouter } from 'react-router-dom'
import './App.css'
import { Home } from '../Home'
import { NavBar } from '../../components/navbar'
import { Sidebar } from '../../components/sidebar'
import { InventorySystemProvider } from '../../context'

const AppRoutes = () => {
  let routes = useRoutes([
    {path:"/", element:<Home/>}
  ])
  return routes
}

function App() {
  return(
    <InventorySystemProvider>
      <BrowserRouter>
      <AppRoutes></AppRoutes>
      <NavBar></NavBar>
      <Sidebar></Sidebar>
      </BrowserRouter>
    </InventorySystemProvider>

  )

  
}

export default App
