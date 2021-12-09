import style from './MyBooks.module.css';
import { collection, getDocs } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase-config';
import BookCard from '../BookCard/BookCard';
import { UserContext } from '../../Helper/Context.js';
import { useContext } from 'react';
import { withRouter } from 'react-router-dom';





function MyBooks(props) {

    const [books, setBooks] = useState([]);

    const booksRef = collection(db, "Books");
    const context = useContext(UserContext);
    const user = context.user;
    console.log(user.uid)

    useEffect(() => {
        const getBooks = async () => {
            let data = await getDocs(booksRef);
            setBooks(data.docs.map(x => ({ ...x.data(), id: x.id })).filter(x => x.creatorId === user.uid));
        };
        getBooks();
    }, [user])

    console.log(books)

    return (
        <div className={style.wrapper}>
            <div className={style.booksWrapper}>
                {books.map(x => <BookCard key={x.id} details={x} />)}
            </div>
        </div>

    )
}

export default withRouter(MyBooks);