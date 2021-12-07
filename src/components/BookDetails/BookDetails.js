import * as bookService from '../../services/bookServices.js'
import { useState, useEffect } from 'react';
import { db } from '../../firebase-config.js'
import { collection, getDocs } from 'firebase/firestore';
import style from './BookDetails.module.css';
import { Link } from 'react-router-dom';

function BookDetails({ match }) {
    console.log(match.params)

    let [books, setBooks] = useState([{ title: "a", author: "b" }]);

    let booksRef = collection(db, 'Books');

    useEffect((e) => {
        const GetBookById = async (id) => {
            const data = await getDocs(booksRef);
            setBooks(data.docs.map(x => ({ ...x.data(), id: x.id })));
        };
        GetBookById(match.params.id);
    }, [])

    return (
        <div className={style.wrapper}>
            {
                books.filter(x => x.id == match.params.id).map(x => {
                    return (
                        <div className={style.detailsContainer}>
                            <div className={style.buttonWraper}>
                                <div className={style.imageContainer}>
                                    <img className={style.image} src={x.bookCoverUrl} />
                                </div>
                                <a href={x.downloadFileUrl} className={style.downloadBtn} target="_blank">Read Online</a>
                            </div>
                            <div className={style.infoContainer}>
                                <div className={style.author}>
                                    <h2 className={style.text}>Author: <span className={style.span}>{x.author}</span></h2>
                                </div>
                                <div className={style.title}>
                                    <h2 className={style.text}>Title: <span className={style.span}>{x.title}</span></h2>
                                </div>
                                    <h3 className={style.text}>Review:</h3>
                                <div className={style.review}>
                                    <p className={style.reviewText}>
                                        <span className={style.span}>{x.review}</span>
                                    </p>
                                </div>

                            </div>
                        </div>
                    )
                })
            }
        </div>)
}

export default BookDetails;