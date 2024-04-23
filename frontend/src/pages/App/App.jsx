import { useRoutes, BrowserRouter } from 'react-router-dom'
import './App.css'
import { Home } from '../Home'

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
    </BrowserRouter>
  )

  
}

export default App
