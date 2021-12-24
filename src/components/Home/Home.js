import style from './Home.module.css';
import Category from '../Category/Category.js';
import CategoryTitle from '../Category/CategoryTitle.js';
import { useState, useEffect } from 'react';
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
            <title>Home</title>
            <CategoryTitle>
                <Link to="/actionAndAdventure" className={style.categoryLink}>Action and Adventure</Link>
            </CategoryTitle>
            <Category books={books.filter(x => x.genre == 'Action and Adventure').slice(0, 5)} />

            <CategoryTitle>
                <Link to="/classics" className={style.categoryLink}>Classics</Link>
            </CategoryTitle>
            <Category books={books.filter(x => x.genre == 'Classics').slice(0, 5)} />

            <CategoryTitle>
                <Link to="/comics" className={style.categoryLink}>Comic Book or Graphic Novel</Link>
            </CategoryTitle>
            <Category books={books.filter(x => x.genre == 'Comic Book or Graphic Novel').slice(0, 5)} />

            <CategoryTitle>
                <Link to="/mystery"  className={style.categoryLink}>Detective and Mystery</Link>
            </CategoryTitle>
            <Category books={books.filter(x => x.genre == 'Detective and Mystery').slice(0, 5)} />

            <CategoryTitle>
                <Link to="/fantasy"  className={style.categoryLink}>Fantasy</Link>
            </CategoryTitle>
            <Category books={books.filter(x => x.genre == 'Fantasy').slice(0, 5)} />

            <CategoryTitle>
                <Link to="/science" className={style.categoryLink}>Science</Link>
            </CategoryTitle>
            <Category books={books.filter(x => x.genre == 'Science').slice(0, 5)} />

            <CategoryTitle>
                <Link to="/horror" className={style.categoryLink}>Horror</Link>
            </CategoryTitle>
            <Category books={books.filter(x => x.genre == 'Horror').slice(0, 5)} />

            <CategoryTitle>
                <Link to="/literaryFiction" className={style.categoryLink}>Literary Fiction</Link>
            </CategoryTitle>
            <Category books={books.filter(x => x.genre == 'Literary Fiction').slice(0, 5)} />
        </section>
    )
}

export default Home;