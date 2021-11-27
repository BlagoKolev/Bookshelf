import * as bookService from '../../services/bookServices.js'
import { useState, useEffect } from 'react';
import { db } from '../../firebase-config.js'
import { collection, getDocs } from 'firebase/firestore';
import style from './BookDetails.module.css'

function BookDetails({ match }) {
    console.log(match.params.id)

    let [book, setBook] = useState({});

    let booksRef = collection(db, 'Books');

    useEffect(() => {
        const GetBookById = async (id) => {
            const data = await getDocs(booksRef);
            console.log(data.docs.params)
            setBook(data.docs.map(x => ({ ...x.data(), id: x.id })).find(x => x.id == id));
            // setBook(data.docs.filter(x => x.id == id).map(x => ({ ...x.data(), id: x.id })));

        };
        GetBookById(match.params.id);
    }, [])
    console.log(book)

    return (
        <div className={style.details}>
            <div className={style.detailsContainer}>
                <div className={style.imageContainer}> <img className={style.image} src={book.image} /> </div>
                <div className={style.infoContainer}>
                    <div className={style.author}>
                        <h2 className={style.text}>Author: <span className={style.span}>{book.author}</span></h2>
                    </div>
                    <div className={style.title}>
                        <h2 className={style.text}>Title: <span className={style.span}>{book.title}</span></h2>
                    </div>
                    <div className={style.rewiew}>
                        <h3 className={style.text}>Review:</h3> <span className={style.span}>{book.review}</span>
                    </div>
                </div>
            </div>
            <button className={style.downloadBtn}>Download</button>
        </div>
    )
}

export default BookDetails;