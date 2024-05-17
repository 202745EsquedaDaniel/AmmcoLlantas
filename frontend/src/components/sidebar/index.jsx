import { NavLink } from 'react-router-dom';
import { HomeIcon, OrdersIcon, ProductsIcon, ProvidersIcon, StoreIcon } from '../icons';
import { PiTireDuotone } from "react-icons/pi";
import { UsersIcon } from '@heroicons/react/24/solid';

const Sidebar = () => {
    return (
        <nav className='fixed inset-y-0 left-0 z-10 bg-white w-44'>
            <div className='flex items-center justify-center h-20 shadow-md'>
                <StoreIcon className='text-blue-500' />
                <span className='ml-2 text-blue-500 text-xl font-bold'>AMM.CO</span>
            </div>
            <ul className='text-gray-700'>
                <li className='mt-5'>
                    <NavLink to="/" className={({ isActive }) => isActive ? 'flex items-center gap-2 p-2 text-blue-500' : 'flex items-center gap-2 p-2 hover:bg-gray-100'}>
                        <HomeIcon />
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/orders" className={({ isActive }) => isActive ? 'flex items-center gap-2 p-2 text-blue-500' : 'flex items-center gap-2 p-2 hover:bg-gray-100'}>
                        <OrdersIcon />
                        Orders
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/products" className={({ isActive }) => isActive ? 'flex items-center gap-2 p-2 text-blue-500' : 'flex items-center gap-2 p-2 hover:bg-gray-100'}>
                    <PiTireDuotone />
                        Products
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/customers" className={({ isActive }) => isActive ? 'flex items-center gap-2 p-2 text-blue-500' : 'flex items-center gap-2 p-2 hover:bg-gray-100'}>
                        <ProvidersIcon />
                        Customers
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/analytics" className={({ isActive }) => isActive ? 'flex items-center gap-2 p-2 text-blue-500' : 'flex items-center gap-2 p-2 hover:bg-gray-100'}>
                        Analytics
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export { Sidebar };
