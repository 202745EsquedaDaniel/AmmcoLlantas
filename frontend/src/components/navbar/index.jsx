import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { InventorySystemContext } from '../../context';
import { CartIcon } from '../icons';

const NavBar = () => { 
    const context = useContext(InventorySystemContext);

    return (
        <nav className='fixed top-0 left-56 w-[calc(100%-14rem)] z-10 py-5 px-8 text-sm font-light bg-black flex justify-between items-center'>
            <ul className='flex items-center gap-3'>
                <li className='font-semibold text-lg text-white'>
                    <NavLink to="/">
                        Amm.co Llantas
                    </NavLink>
                </li>
            </ul>
            <ul className='flex items-center gap-3 text-white'>
                <li className='flex items-center'>
                    <CartIcon />
                    <p className='ml-1'>{context.count}</p>
                </li>
            </ul>
        </nav>
    );
}

export { NavBar };
