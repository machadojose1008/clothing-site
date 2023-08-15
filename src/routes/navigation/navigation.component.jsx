import { Link, Outlet } from "react-router-dom";
import { Fragment } from "react";
import { ReactComponent as SneakerLogo } from '../../assets/sneaker.svg'
import './navigation.styles.scss';

const NavigationBar = () => {
    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <SneakerLogo className='logo'/>
                </Link>

                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>
                        SHOP
                    </Link>
                    <Link className="nav-link" to='/auth'>
                        ENTRAR
                    </Link>
                </div>
            </div>
            <Outlet />
        </Fragment>
    )

};

export default NavigationBar;