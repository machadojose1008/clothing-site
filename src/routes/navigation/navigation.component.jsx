import { Link, Outlet } from "react-router-dom";
import { Fragment, useContext } from "react";
import { ReactComponent as SneakerLogo } from '../../assets/sneaker.svg'
import './navigation.styles.scss';
import { UserContext } from '../../contexts/user.context'
import { signOutUser } from "../../utils/firebase/firebase.utils";

const NavigationBar = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);

    const signOutHandler = async () => {
        await signOutUser();
        setCurrentUser(null);
        
    }

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
                            <span className="nav-link" onClick={signOutHandler}> 
                                SAIR
                            </span>

                        ) : (
                            <Link className="nav-link" to='/auth'>
                                ENTRAR
                            </Link>
                        )

                    }


                </div>
            </div>
            <Outlet />
        </Fragment>
    )

};

export default NavigationBar;