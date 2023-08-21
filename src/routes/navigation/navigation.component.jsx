import { Link, Outlet } from "react-router-dom";
import { Fragment, useContext } from "react";
import { ReactComponent as SneakerLogo } from '../../assets/sneaker.svg'
import './navigation.styles.scss';
import { UserContext } from '../../contexts/user.context'
import { signOutUser } from "../../utils/firebase/firebase.utils";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

const NavigationBar = () => {
    const { currentUser } = useContext(UserContext);



    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <SneakerLogo className='logo' />
                </Link>

                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>
                        LOJA
                    </Link>
                    {
                        currentUser ? (
                            <span className="nav-link" onClick={signOutUser}> 
                                {' '}
                                SAIR {' '}
                            </span>

                        ) : (
                            <Link className="nav-link" to='/auth'>
                                ENTRAR
                            </Link>
                        )

                    }
                    <CartIcon />

                </div>
                <CartDropdown />
            </div>
            <Outlet />
        </Fragment>
    )

};

export default NavigationBar;