import { collection, doc, getDocs, updateDoc } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase-config';
import style from './EditBook.module.css';

function EditBook({ match }) {

    // console.log(match.params.bookId)
    const [book, setBook] = useState({});

    let bookId = match.params.bookId;

    const booksRef = collection(db, "Books");

    useEffect(() => {
        const getBookById = async (bookId) => {
            let data = await getDocs(booksRef);
            setBook(data.docs.map(x => ({ ...x.data(), id: x.id })).find(x => x.id == bookId))
        };
        getBookById(bookId);
    }, [])

    const onSubmitEdit = async (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);
      
        let title = formData.get("title");
        let author = formData.get("author");
        let genre = formData.get("genre");
        let bookCoverUrl = formData.get("coverUrl");
        let review = formData.get("review");
        
        let bookDoc = doc(db, "Books", book.id);
        let fieldsToUpdate = {
            title,
            author,
            //genre,
            bookCoverUrl,
            review
        }
        await updateDoc(bookDoc, fieldsToUpdate);  
    };

    return (
        <div className={style.editContainer}>
            <form className={style.form} onSubmit={onSubmitEdit}>
                <label className={style.label} htmlFor="title">Title:
                    <input className={style.input} name="title" defaultValue={book.title}></input>
                </label>
                <label className={style.label} htmlFor="author">Author:
                    <input className={style.input} name="author" defaultValue={book.author}></input>
                </label>
                <label className={style.label} htmlFor="coverUrl">Cover Url:
                    <input className={style.input} name="coverUrl" defaultValue={book.bookCoverUrl}></input>
                </label>
                <label className={style.label} htmlFor="genre">Genre:
                    <select className={style.genreList} name="genre" defaulValue={book.genre}>
                        <option disabled>Please choose Genre...</option>
                        <option className={style.genreListItem} value="Action and Adventure">Action and Adventure</option>
                        <option className={style.genreListItem} value="Classics" >Classics</option>
                        <option className={style.genreListItem} value="Comic Book or Graphic Novel">Comic Book or Graphic Novel</option>
                        <option className={style.genreListItem} value="Detective and Mystery">Detective and Mystery</option>
                        <option className={style.genreListItem} value="Fantasy">Fantasy</option>
                        <option className={style.genreListItem} value="Science">Science</option>
                        <option className={style.genreListItem} value="Horror">Horror</option>
                        <option className={style.genreListItem} value="Literary Fiction">Literary Fiction</option>
                    </select>
                </label>
                <label className={style.input} className={style.label} htmlFor="review">Review:
                    <textarea name="review" defaultValue={book.review}></textarea>
                </label>
                <input type="submit" value="Edit" />
            </form>
        </div>
    );
}

export default EditBook;