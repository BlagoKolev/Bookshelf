import style from './Header.module.css';
import { useState } from 'react';
import { Route, Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { collection, getDocs } from '@firebase/firestore';
import { db } from '../../firebase-config.js'
import HeaderSearchBar from '../Search/HeaderSearchBar';

function Header({ username, isAuthenticated }) {

    //const [books, setBooks] = useState([]);
    // const [searchWord, setSearchWord] = useState([]);

    const signOutNotify = () => {
        toast.success("Successfully Signed-out !", { position: toast.POSITION.TOP_CENTER });
    };

    const onSignOut = async (e) => {
        await signOut(auth)
        signOutNotify();
    };

    // const searchBookByTitle = async (e) => {

    //     const booksRef = collection(db, "Books");
    //     const data = await getDocs(booksRef);

    //     setBooks(data.docs.map(x => ({ ...x.data(), id: x.id })).filter(x => x.title.toLowerCase().includes(searchWord)));


    //     console.log('in Header:' +books)
    // }

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