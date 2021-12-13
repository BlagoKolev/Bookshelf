import style from './Header.module.css';
import { Route, Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { onSuccessNotify } from '../../Notifications/Notifications';
//import 'react-toastify/dist/ReactToastify.css';
import HeaderSearchBar from '../Search/HeaderSearchBar';

function Header({ username, isAuthenticated }) {

    const onSignOut = async (e) => {
        await signOut(auth)
        onSuccessNotify("Successfully Signed-out !");
    };

    return (
        <header className={style.header}>
            <Link to="/" className={style.headerLogo}>BookShelf</Link>               
          
                <HeaderSearchBar style={{ zIndex: 1 }} className={style.navbar} />

            <nav className={style.headerNav}>
                <ul className={style.headerNavUl}>

                    {isAuthenticated &&
                        <li className={style.headerNavElement}>
                            Hello: <span className={style.username}> {username}</span>
                        </li>}

                    {isAuthenticated &&
                        <li className={style.headerNavElement}>
                            <Link to="/uploadFile" className={style.headerNavLink}>Upload Book</Link>
                        </li>}

                    {!isAuthenticated &&
                        <li className={style.headerNavElement}>
                            <Link to="/login" className={style.headerNavLink}>Login</Link>
                        </li>}

                    {!isAuthenticated &&
                        <li className={style.headerNavElement}>
                            <Link to="/register" className={style.headerNavLink}>Register</Link>
                        </li>}

                    {isAuthenticated &&
                        <li className={style.headerNavElement}>
                            <Link to="/myBooks" className={style.headerNavLink}>My Books</Link>
                        </li>}

                    {isAuthenticated &&
                        <li className={style.headerNavElement}>
                            <Link to="/"
                                className={style.headerNavLink}
                                onClick={onSignOut}>Logout</Link>
                        </li>}

                </ul>
            </nav>
        </header>
    )
}

export default Header;