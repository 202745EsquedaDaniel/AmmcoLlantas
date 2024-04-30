import {NavLink} from 'react-router-dom' ;


const Sidebar = () => {
    const activeStyle = "underline underline-offset-4";

    return (
        <nav className='fixed left-0 top-20 h-full z-10 bg-red-400 w-1/5 md:w-1/4 lg:w-1/6'>
            <ul className='py-5 px-8 text-sm font-light'>
                <li className='font-semibold text-lg mb-5'>
                    <NavLink to="/" activeClassName={activeStyle} exact>
                        Shopi
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/" activeClassName={activeStyle} exact>
                        All
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/clothes" activeClassName={activeStyle}>
                        Clothes
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/electronics" activeClassName={activeStyle}>
                        Electronics
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/furnitures" activeClassName={activeStyle}>
                        Furnitures
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/toys" activeClassName={activeStyle}>
                        Toys
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/others" activeClassName={activeStyle}>
                        Others
                    </NavLink>
                </li>
                <li className='mt-auto'>
                    <NavLink to="/My-Orders" activeClassName={activeStyle}>
                        My Orders
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/My-Account" activeClassName={activeStyle}>
                        My Account
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/SignIn" activeClassName={activeStyle}>
                        Sign In
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export {Sidebar}