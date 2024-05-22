import { useRoutes, BrowserRouter, useLocation } from 'react-router-dom';
import './App.css';
import { Home } from '../Home';
import { NavBar } from '../../components/navbar';
import { Sidebar } from '../../components/sidebar';
import { InventorySystemProvider } from '../../context';
import { Manage_User } from '../manage user';
import { Orders } from '../Orders';
import { Products } from '../product';
import { Providers } from '../provider';
import { CheckoutSideMenu } from '../../components/checkoutSideMenu';
import { MyOrder } from '../MyOrder';
import { Customers } from '../customers';
import { EditOrder } from '../editOrder';
import { Login } from '../login';
import useAuth from '../../components/useAth'; // Import the custom hook

const AppRoutes = () => {
  useAuth(); // Use the custom hook
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  let routes = useRoutes([
    {path:"/", element:<Home/>},
    {path:"/products", element:<Products/>},
    {path:"/orders", element:<Orders/>},
    {path: "/orders/last", element:<MyOrder/>},
    {path:"/orders/:id", element:<EditOrder/>},
    {path:"/manage_user", element:<Manage_User/>},
    {path:"/providers", element:<Providers/>},
    {path:"/customers", element:<Customers/>},
    {path:"/login", element:<Login/>}
  ]);

  return (
    <>
      {!isLoginPage && <NavBar />}
      {!isLoginPage && <Sidebar />}
      {routes}
      {!isLoginPage && <CheckoutSideMenu />}
    </>
  );
}

const App = () => {
  return (
    <InventorySystemProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </InventorySystemProvider>
  );
};

export default App;
