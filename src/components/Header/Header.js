import style from './Header.module.css';
import { Route, Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { onSuccessNotify } from '../../Notifications/Notifications';
import HeaderSearchBar from '../Search/HeaderSearchBar';
import { UserContext } from '../../Context/Context';
import { useContext } from 'react';


function Header() {

    const onSignOut = async (e) => {
        await signOut(auth)
        onSuccessNotify("Successfully Signed-out !");
    };

    let { user } = useContext(UserContext)
    //console.log(user)

    return (
        <header className={style.header}>
            <Link to="/" className={style.headerLogo}>BookShelf</Link>

            <HeaderSearchBar style={{ zIndex: 1 }} className={style.navbarSearch} />

            <nav className={style.headerNav}>
                <ul className={style.headerNavUl}>

                    { user &&
                        <li className={style.headerNavElement}>
                            Hello: <span className={style.username}> {user.email}</span>
                        </li>}

                    {user &&
                        <li className={style.headerNavElement}>
                            <Link to="/uploadFile" className={style.headerNavLink}>Upload Book</Link>
                        </li>}

                    {!user &&
                        <li className={style.headerNavElement}>
                            <Link to="/login" className={style.headerNavLink}>Login</Link>
                        </li>}

                    {!user &&
                        <li className={style.headerNavElement}>
                            <Link to="/register" className={style.headerNavLink}>Register</Link>
                        </li>}

                    {user &&
                        <li className={style.headerNavElement}>
                            <Link to="/myBooks" className={style.headerNavLink}>My Books</Link>
                        </li>}

                    {user &&
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