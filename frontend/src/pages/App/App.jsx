import { useRoutes, BrowserRouter } from 'react-router-dom'
import './App.css'
import { Home } from '../Home'
import { NavBar } from '../../components/navbar'
import { Sidebar } from '../../components/sidebar'

const AppRoutes = () => {
  let routes = useRoutes([
    {path:"/", element:<Home/>}
  ])
  return routes
}

function App() {
  return(
    <BrowserRouter>
    <AppRoutes></AppRoutes>
    <NavBar></NavBar>
    <Sidebar></Sidebar>
    </BrowserRouter>
  )

  
}

export default App
