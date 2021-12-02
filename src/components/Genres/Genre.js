import style from './Genre.module.css'
import { db } from '../../firebase-config.js';
import { collection, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import BookCard from '../BookCard/BookCard.js'

function ActionAndAdventure({passedGenre}) {

    const [books, setBooks] = useState([]);
    const bookRef = collection(db, "Books");
   
    console.log([passedGenre])
    console.log("render")
    useEffect(() => {
        const getBooks = async () => {
            let data = await getDocs(bookRef);
            setBooks(data.docs.map(x => ({ ...x.data(), id: x.id })).filter(x => x.genre == passedGenre));console.log("Mount")
        }
        getBooks();
    }, []);
   

    return (
        <div className={style.wrapper}>
            <div className={style.category}>
                {books.map(x => <BookCard key={x.id} details={x} />)}
            </div>
        </div>
    )
}

export default ActionAndAdventure;