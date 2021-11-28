import style from './Header.module.css';
import { Route, Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Header({ username, isAuthenticated }) {


    const signOutNotify = () => {
        toast.success("Successfully Signed-out !", { position: toast.POSITION.TOP_CENTER });
    };

    const onSignOut = async (e) => {
        await signOut(auth)
        signOutNotify();
    };

    return (
        <header className={style.header}>
            <Link to="/" className={style.headerLogo}>BookShelf</Link>
            <nav className={style.headerNav}>
                <ul className={style.headerNavUl}>

                    {isAuthenticated &&
                        <li className={style.headerNavElement}>
                            Hello: {username}
                        </li>}

                    {isAuthenticated &&
                        <li className={style.headerNavElement}>
                            <a >Upload Book</a>
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
                            <Link to="/register" className={style.headerNavLink}>My Books</Link>
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