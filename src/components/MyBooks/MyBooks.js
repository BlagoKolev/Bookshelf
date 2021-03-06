import style from './MyBooks.module.css';
import { collection, getDocs } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase-config';
import BookCard from '../BookCard/BookCard';
import { UserContext } from '../../Context/Context.js';
import { useContext } from 'react';
import { withRouter } from 'react-router-dom';

function MyBooks(props) {

    const [books, setBooks] = useState([]);

    const booksRef = collection(db, "Books");
    const {user} = useContext(UserContext);

    useEffect(() => {
        const getBooks = async () => {
            let data = await getDocs(booksRef);
            setBooks(data.docs.map(x => ({ ...x.data(), id: x.id })).filter(x => x.creatorId === user.uid));
        };
        getBooks();
    }, [user]);

    return (
        <div className={style.wrapper}>
            <title>My books</title>
            <div className={style.booksWrapper}>
                {
                    books.length > 0
                        ? books.map(x => <BookCard key={x.id} details={x} />)
                        : <div className={style.emptyBookshelf}>You have no books in your Bookshelf.</div>
                }
            </div>
        </div>

    )
}

export default withRouter(MyBooks);