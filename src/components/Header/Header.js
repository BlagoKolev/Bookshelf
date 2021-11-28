import style from './Header.module.css';
import { Route, Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase-config';

function Header({ username, isAuthenticated }) {

    const onSignOut = async (e) => {
        await signOut(auth)
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
                    <li className={style.headerNavElement}>
                        <a >Upload book</a>
                    </li>
                    <li className={style.headerNavElement}>
                        <Link to="/login" className={style.headerNavLink}>Login</Link>
                    </li>
                    <li className={style.headerNavElement}>
                        <Link to="/register" className={style.headerNavLink}>Register</Link>
                    </li>
                    <li className={style.headerNavElement}>
                        <Link to="/"
                            className={style.headerNavLink}
                            onClick={onSignOut}>Logout</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;