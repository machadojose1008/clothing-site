import { Link, Outlet } from "react-router-dom";
import { Fragment, useContext } from "react";
import { ReactComponent as SneakerLogo } from '../../assets/sneaker.svg'
import { NavigationContainer, NavLink, NaviLinks, LogoContainer } from "./navigation.styles";


import { UserContext } from '../../contexts/user.context'
import { CartContext } from "../../contexts/cart.context";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

const NavigationBar = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);


    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <SneakerLogo className='logo' />
                </LogoContainer>

                <NaviLinks>
                    <NavLink to='/shop'>
                        LOJA
                    </NavLink>
                    {
                        currentUser ? (
                            <NavLink as='span' onClick={signOutUser}>
                                {' '}
                                SAIR {' '}
                            </NavLink>

                        ) : (
                            <NavLink to='/auth'>
                                ENTRAR
                            </NavLink>
                        )

                    }
                    <CartIcon />

                </NaviLinks>
                {isCartOpen && <CartDropdown />}


            </NavigationContainer>
            <Outlet />
        </Fragment >
    )

};

export default NavigationBar;