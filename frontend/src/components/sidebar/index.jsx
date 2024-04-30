import {NavLink} from 'react-router-dom' ;


const Sidebar = () => {
    const activeStyle = "underline underline-offset-4";

    return (
        <nav className='fixed left-0 top-20 h-full z-10 bg-red-400 w-1/5 md:w-1/4 lg:w-1/6'>
            <ul className='py-5 px-8 text-sm font-light'>
                <li className='font-semibold text-lg mb-5'>
                    <NavLink to="/" activeClassName={activeStyle} exact>
                        Ammco
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/products"   className={({isActive}) =>
                    isActive ? activeStyle : undefined 
                }>
                        Productos
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/providers"   className={({isActive}) =>
                    isActive ? activeStyle : undefined 
                }>
                        Proveedores
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/orders"   className={({isActive}) =>
                    isActive ? activeStyle : undefined 
                }>
                        Ordenes
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/toys"   className={({isActive}) =>
                    isActive ? activeStyle : undefined 
                }>
                        Usuarios
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/others"   className={({isActive}) =>
                    isActive ? activeStyle : undefined 
                }>
                        Configuracion
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export {Sidebar}