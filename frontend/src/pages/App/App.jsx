import { useRoutes, BrowserRouter } from 'react-router-dom'
import './App.css'
import { Home } from '../Home'
import { NavBar } from '../../components/navbar'

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
    </BrowserRouter>
  )

  
}

export default App
