import style from './Home.module.css';
import Category from '../Category/Category.js';
import CategoryTitle from '../Category/CategoryTitle.js';
import { useState, useEffect } from 'react';
//import * as BooksService from '../../services/bookServices.js'
import { db } from '../../firebase-config.js'
import { collection, getDocs } from 'firebase/firestore';
import { Link, Route } from 'react-router-dom';

function Home() {

    let [books, setBooks] = useState([]);
    let booksRef = collection(db, 'Books');

    useEffect(() => {
        const getBooks = async () => {
            let data = await getDocs(booksRef);
            setBooks(data.docs.map(x => ({ ...x.data(), id: x.id })));
        };
        getBooks();
    }, [])

    return (
        <section className={style.section}>
            <CategoryTitle><Link to="/actionAndAdventure" className={style.categoryLink}>Action and Adventure</Link></CategoryTitle>
            <Category books={books.filter(x => x.genre == 'Action and Adventure').slice(0, 5)} />
            <CategoryTitle>Classics</CategoryTitle>
            <Category books={books.filter(x => x.genre == 'Classics').slice(0, 5)} />
            <CategoryTitle>Comic Book or Graphic Novel</CategoryTitle>
            <Category books={books.filter(x => x.genre == 'Comic Book or Graphic Novel').slice(0, 5)} />
            <CategoryTitle>Detective and Mystery</CategoryTitle>
            <Category books={books.filter(x => x.genre == 'Detective and Mystery').slice(0, 5)} />
            <CategoryTitle>Fantasy</CategoryTitle>
            <Category books={books.filter(x => x.genre == 'Fantasy').slice(0, 5)} />
            <CategoryTitle>Science</CategoryTitle>
            <Category books={books.filter(x => x.genre == 'Science').slice(0, 5)} />
            <CategoryTitle>Horror</CategoryTitle>
            <Category books={books.filter(x => x.genre == 'Horror').slice(0, 5)} />
            <CategoryTitle>Literary Fiction</CategoryTitle>
            <Category books={books.filter(x => x.genre == 'Literary Fiction').slice(0, 5)} />
        </section>
    )
}

export default Home;