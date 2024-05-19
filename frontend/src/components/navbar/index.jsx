import { useContext } from 'react';
import {NavLink} from 'react-router-dom' ;
import { InventorySystemContext } from '../../context';
import { CartIcon } from '../icons';


const NavBar = () => { 
    const context = useContext(InventorySystemContext)

    return(
        <nav className='w-full flex justify-between items-center fixed z-10 py-5 px-8 top-0 left-64 text-sm font-light bg-red-400'>
            <ul className='flex items-center gap-3'>
                <li className=' font-semibold text-lg'>
                    <NavLink
                    to="/">
                        Shopi
                    </NavLink>
                </li>
            </ul>
            <ul className='flex items-center gap-3'>
                <li className='flex'>
                 <CartIcon />
                    <div className='flex items-center'>
                        <p> aqui va un context punto count entre escorchos</p>
                    </div>
                </li>
            </ul>
        </nav>
    )
}

export {NavBar}