import { NavLink } from 'react-router-dom';
import { HomeIcon, OrdersIcon, ProductsIcon, ProvidersIcon, StoreIcon } from '../icons';
import { UsersIcon } from '@heroicons/react/24/solid';

const Sidebar = () => {
    const activeStyle = "underline underline-offset-4 text-white";

    return (
<nav class='fixed inset-y-0 left-0 z-10 bg-gray-800 w-60 md:w-48 lg:w-40 xl:w-32 transition-width duration-300'>
    <div class='flex items-center justify-center h-20 shadow-md'>
        <StoreIcon></StoreIcon>
        <span class='ml-2 text-white text-xl font-bold'>Ammco</span>
    </div>
    <ul class='text-white'>
        <li class='mt-5'>
            <NavLink to="/" className={({ isActive }) => isActive ? 'flex items-center gap-2 p-2 rounded-lg bg-gray-900' : 'flex items-center gap-2 p-2 hover:bg-gray-700'}>
                <HomeIcon></HomeIcon>
                Dashboard
            </NavLink>
        </li>
        <li>
            <NavLink to="/products" className={({ isActive }) => isActive ? 'flex items-center gap-2 p-2 rounded-lg bg-gray-900' : 'flex items-center gap-2 p-2 hover:bg-gray-700'}>
                <ProductsIcon></ProductsIcon>
                Productos
            </NavLink>
        </li>
        <li>
            <NavLink to="/providers" className={({ isActive }) => isActive ? 'flex items-center gap-2 p-2 rounded-lg bg-gray-900' : 'flex items-center gap-2 p-2 hover:bg-gray-700'}>
                <ProvidersIcon></ProvidersIcon>
                Proveedores
            </NavLink>
        </li>
        <li>
            <NavLink to="/orders" className={({ isActive }) => isActive ? 'flex items-center gap-2 p-2 rounded-lg bg-gray-900' : 'flex items-center gap-2 p-2 hover:bg-gray-700'}>
                <OrdersIcon></OrdersIcon>
                Órdenes
            </NavLink>
        </li>
        <li>
            <NavLink to="/toys" className={({ isActive }) => isActive ? 'flex items-center gap-2 p-2 rounded-lg bg-gray-900' : 'flex items-center gap-2 p-2 hover:bg-gray-700'}>
                <UsersIcon></UsersIcon>
                Usuarios
            </NavLink>
        </li>
        <li>
            <NavLink to="/others" className={({ isActive }) => isActive ? 'flex items-center gap-2 p-2 rounded-lg bg-gray-900' : 'flex items-center gap-2 p-2 hover:bg-gray-700'}>
                Configuración
            </NavLink>
        </li>
    </ul>
</nav>

    );
}

export { Sidebar };
