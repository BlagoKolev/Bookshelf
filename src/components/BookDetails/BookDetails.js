import * as bookService from '../../services/bookServices.js'
import { useState, useEffect } from 'react';
import { db } from '../../firebase-config.js'
import { collection, getDocs } from 'firebase/firestore';
import style from './BookDetails.module.css'

function BookDetails({ match }) {
    //console.log(match.params.id)

    let [books, setBooks] = useState([{ title: "a", author: "b" }]);

    let booksRef = collection(db, 'Books');
    console.log('render')
    useEffect((e) => {
        const GetBookById = async (id) => {
            const data = await getDocs(booksRef);
            setBooks(data.docs.map(x => ({ ...x.data(), id: x.id })));


        };
        GetBookById(match.params.id);
    }, [])

    return (
        <div>
            {
                books.filter(x => x.id == match.params.id).map(x => {
                    return (
                        <div className={style.detailsContainer}>
                            <div className={style.imageContainer}> <img className={style.image} src={x.image} /> </div>
                            <div className={style.infoContainer}>
                                <div className={style.author}>
                                    <h2 className={style.text}>Author: <span className={style.span}>{x.author}</span></h2>
                                </div>
                                <div className={style.title}>
                                    <h2 className={style.text}>Title: <span className={style.span}>{x.title}</span></h2>
                                </div>
                                <div className={style.rewiew}>
                                    <h3 className={style.text}>Review:</h3> <span className={style.span}>{x.review}</span>
                                </div>
                            </div>
                            <button className={style.downloadBtn}>Download</button>
                        </div>
                    )
                })
            }
        </div>)
}

export default BookDetails;