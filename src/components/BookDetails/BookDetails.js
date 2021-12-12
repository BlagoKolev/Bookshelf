import * as bookService from '../../services/bookServices.js'
import { useState, useEffect } from 'react';
import { db } from '../../firebase-config.js'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import style from './BookDetails.module.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../Helper/Context'
import Likes from '../Likes/Likes.js';


function BookDetails({ match }) {
    // console.log(match.params);
    let bookId = match.params.id;
    let context = useContext(UserContext);
    //console.log(context.user);
    let user = context.user;


    const [books, setBooks] = useState([]);
    const [currentBook, setCurrentBook] = useState({});
    const [likedUsersList, setLikedUsersList] = useState([]);
    const [unlikedUsersList, setUnlikedUsersList] = useState([]);
    const [like, setLike] = useState(0);

    let booksRef = collection(db, 'Books');

    useEffect((e) => {
        const GetBookById = async () => {
            const data = await getDocs(booksRef);
            setBooks(data.docs.map(x => ({ ...x.data(), id: x.id, key: x.id })));
            setCurrentBook(data.docs.map(x => ({ ...x.data(), id: x.id, key: x.id })).find(x => x.id == match.params.id))
            setLikedUsersList(data.docs.map(x => ({ ...x.data(), id: x.id, key: x.id })).find(x => x.id == match.params.id).likedByUsers);
            setUnlikedUsersList(data.docs.map(x => ({ ...x.data(), id: x.id, key: x.id })).find(x => x.id == match.params.id).unlikedByUsers);

        };
        GetBookById();
    }, [like]);

    const likeBook = async (e) => {
        e.preventDefault();

        let bookDoc = doc(db, "Books", bookId);
        let fieldsToUpdate = {
            likedByUsers: [...currentBook.likedByUsers, user.email],
            unlikedByUsers: currentBook.unlikedByUsers.filter(x => x != user.email)
        }
        await updateDoc(bookDoc, fieldsToUpdate);
        // setLikedUsersList(currentBook.likedByUsers);
        setLike(like + 1)

    }

    const unlikeBook = async (e) => {
        e.preventDefault();

        let bookDoc = doc(db, "Books", bookId);
        let fieldsToUpdate = {
            unlikedByUsers: [...currentBook.unlikedByUsers, user.email],
            likedByUsers: currentBook.likedByUsers.filter(x => x != user.email)
        }
        await updateDoc(bookDoc, fieldsToUpdate);
        //setUnlikedUsersList(currentBook.unlikedByUsers);
        setLike(like + 1)
    }

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
                                {/* <Likes likes={x.likes} unlikes={x.unlikes} book={x}/> */}
                                <div className={style.likesContainer}>
                                    <button type="submit" className={style.likeBtn} onClick={likeBook}
                                        style={{
                                            pointerEvents: (likedUsersList.includes(user?.email) || !user)
                                                ? 'none'
                                                : 'visible'
                                        }}>
                                        {x.likedByUsers.length} <i className="far fa-thumbs-up fa-3x"></i>
                                    </button>
                                    <button className={style.unlikeBtn} onClick={unlikeBook}
                                        style={{
                                            pointerEvents: (unlikedUsersList.includes(user?.email) || !user)
                                                ? 'none'
                                                : 'visible'
                                        }}>
                                        {x.unlikedByUsers.length} <i className="far fa-thumbs-down  fa-3x" ></i>
                                    </button>
                                </div>
                                <div className={style.buttonWrapper}>
                                    <a href={x.downloadFileUrl} className={style.downloadBtn} target="_blank" style={{ pointerEvents: user ? 'visible' : 'none' }}>Read Online
                                    </a>
                                    {
                                        user?.uid == x.creatorId
                                            ?
                                            <Link to={`/editBook/${match.params.id}`} className={style.editBtn} bookid={match.params.id} style={{ pointerEvents: user ? 'visible' : 'none' }}>Edit
                                            </Link>
                                            :
                                            <div></div>
                                    }
                                </div>
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