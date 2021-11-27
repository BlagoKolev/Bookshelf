import style from './Header.module.css';
import { Route, Link } from 'react-router-dom';

function Header({ username, isAuthenticated }) {
    return (
        <header className={style.header}>
            <Link to="/" className={style.headerLogo}>BookShelf</Link>
            <nav className={style.headerNav}>
                <ul className={style.headerNavUl}>
                    <li className={style.headerNavElement}>
                        <a>Upload book</a>
                    </li>
                    <li className={style.headerNavElement}>
                        <a >Archive</a>
                    </li>
                    <li className={style.headerNavElement}>
                        <Link to="/login" className={style.headerNavLink}>Login</Link>
                    </li>
                    <li className={style.headerNavElement}>
                        <Link to="/register" className={style.headerNavLink}>Register</Link>
                    </li>
                    <li className={style.headerNavElement}>
                        <a>Logout</a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;