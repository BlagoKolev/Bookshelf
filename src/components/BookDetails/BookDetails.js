import { useState, useEffect, useContext } from 'react';
import { db } from '../../firebase-config.js'
import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import style from './BookDetails.module.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/Context.js';
import { onSuccessNotify, onErrorNotify } from '../../Notifications/Notifications';

function BookDetails({ match, history }) {
    // console.log(match.params);
    let bookId = match.params.id;
    let {user} = useContext(UserContext);

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
            setCurrentBook(data.docs.map(x => ({ ...x.data(), id: x.id, key: x.id })).find(x => x.id == bookId))
            setLikedUsersList(data.docs.map(x => ({ ...x.data(), id: x.id, key: x.id })).find(x => x.id == bookId).likedByUsers);
            setUnlikedUsersList(data.docs.map(x => ({ ...x.data(), id: x.id, key: x.id })).find(x => x.id == bookId).unlikedByUsers);
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
      
        setLike(like + 1);
    };

    const unlikeBook = async (e) => {
        e.preventDefault();

        let bookDoc = doc(db, "Books", bookId);
        let fieldsToUpdate = {
            unlikedByUsers: [...currentBook.unlikedByUsers, user.email],
            likedByUsers: currentBook.likedByUsers.filter(x => x != user.email)
        }
        await updateDoc(bookDoc, fieldsToUpdate);
        setLike(like + 1)
    };

    const deleteBook = async() => {

        const bookDoc = doc(db, 'Books', bookId);
       try{
        await deleteDoc(bookDoc);
        history.push('/myBooks');
        onSuccessNotify("The book has been successfully removed !");
       } catch (error) {
        onErrorNotify("Removing the book has fail !");
    }
    };

    return (
        <div className={style.wrapper}>
            <title>Details</title>
            {
                books.filter(x => x.id == match.params.id).map(x => {

                    return (
                        <div className={style.detailsContainer}>
                            <div className={style.leftSide}>
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
                                        {x.likedByUsers.length} <i className="far fa-thumbs-up fa-2x"></i>
                                    </button>
                                    <button className={style.unlikeBtn} onClick={unlikeBook}
                                        style={{
                                            pointerEvents: (unlikedUsersList.includes(user?.email) || !user)
                                                ? 'none'
                                                : 'visible'
                                        }}>
                                        {x.unlikedByUsers.length} <i className="far fa-thumbs-down  fa-2x" ></i>
                                    </button>
                                </div>
                                <div className={style.buttonWrapper}>
                                    <a href={x.downloadFileUrl} className={style.downloadBtn} target="_blank" style={{ pointerEvents: user ? 'visible' : 'none' }}><i className="far fa-eye fa-lg"></i>
                                    </a>
                                    {
                                        user?.uid === x.creatorId && user
                                            ?
                                            <div className={style.userSpecialBtn}>
                                                <Link to={`/editBook/${match.params.id}`} className={style.editBtn} bookid={match.params.id} style={{ pointerEvents: user ? 'visible' : 'none' }}><i className="fas fa-edit fa-lg"></i>
                                                </Link>
                                                <button className={style.deleteBtn} onClick={ () => {deleteBook()}} style={{ pointerEvents: user ? 'visible' : 'none' }}>
                                                    <i className="fas fa-trash-alt fa-lg"></i>
                                                </button>
                                            </div>
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