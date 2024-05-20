import { NavLink } from 'react-router-dom';
import { HomeIcon, OrdersIcon, ProductsIcon, ProvidersIcon, StoreIcon } from '../icons';
import { PiTireDuotone } from "react-icons/pi";

const Sidebar = () => {
    const activeStyle = "flex items-center gap-2 p-2 text-blueactive bg-bluebg hover:bg-gray-10 border-r-4 rounded-r-3xl font-bold"
    const inactiveStyle = 'flex items-center gap-2 p-2 hover:bg-gray-200 font-semibold '
    return (
        <nav className='fixed inset-y-0 left-0 z-10 bg-white w-56 pr-6 border-r-4'>
            <div className='flex items-center justify-center h-20 shadow-md'>
                <span className='ml-2 text-blueactive text-xl font-bold'>AMM.CO</span>
            </div>
            <ul className='text-gray-700'>
                <li className='mt-5'>
                    <NavLink to="/" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>
                        <HomeIcon />
                        Incio
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/orders" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>
                        <OrdersIcon />
                        Ordenes
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/products" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>
                    <PiTireDuotone />
                        Llantas
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/providers" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>
                        <ProvidersIcon />
                        Proveedores
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/customers" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>
                        Clientes
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export { Sidebar };
