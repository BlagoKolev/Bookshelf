import { collection, doc, getDocs, updateDoc } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase-config';
import style from './EditBook.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { onSuccessNotify, onErrorNotify } from '../../Notifications/Notifications';

function EditBook({ match, history }) {

    // console.log(match.params.bookId)
    const [book, setBook] = useState({});

    let bookId = match.params.bookId;

    const booksRef = collection(db, "Books");

    useEffect(() => {
        const getBookById = async (bookId) => {
            let data = await getDocs(booksRef);
            setBook(data.docs.map(x => ({ ...x.data(), id: x.id })).find(x => x.id == bookId));

        };
        getBookById(bookId);
    }, [])

    // const onSuccessEditNotify = () => toast.success("The book has been updated successfully !", {
    //     position: toast.POSITION.TOP_CENTER
    // });

    // const onErrorEditNotify = () => toast.error("Book update fail !", {
    //     position: toast.POSITION.TOP_CENTER
    // });

    const initialValues = {
        title: '',
        author: '',
        bookCoverUrl: '',
        genre: '',
        review: ''
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required.'),
        author: Yup.string().required('Author is required.'),
        bookCoverUrl: Yup.string().required('Book cover Url is required.'),
        review: Yup.string().required('Review is required.'),
        genre: Yup.string().required('Genre is required'),
    })

    const onSubmit = async (values) => {

        let bookDoc = doc(db, "Books", book.id);

        let fieldsToUpdate = {
            title: values.title,
            author: values.author,
            genre: values.genre,
            bookCoverUrl: values.bookCoverUrl,
            review: values.review
        }

        try {
            await updateDoc(bookDoc, fieldsToUpdate);
            history.push('/myBooks');
            onSuccessNotify("The book has been updated successfully !")
        } catch (error) {
            onErrorNotify("Book update fail !");
        }
    };
    
    return (
        <Formik initialValues={book || initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize>
            <div className={style.editContainer}>
                <h3 className={style.text}>Edit your book</h3>
                <Form className={style.form} >
                    <label className={style.label} htmlFor="title">Title:
                        <Field name="title" type="text" className={style.input} />
                    </label>
                    <ErrorMessage name='title' className={style.errorMessage} >
                        {msg => <div style={{ color: 'red' }}>{msg}</div>}
                    </ErrorMessage>

                    <label className={style.label} htmlFor="author">Author:
                        <Field name="author" type="text" className={style.input} />
                    </label>
                    <ErrorMessage name='author' className={style.errorMessage} >
                        {msg => <div style={{ color: 'red' }}>{msg}</div>}
                    </ErrorMessage>

                    <label className={style.label} htmlFor="bookCoverUrl">Cover Url:
                        <Field name="bookCoverUrl" type="text" className={style.input} />
                    </label>
                    <ErrorMessage name='bookCoverUrl' className={style.errorMessage} >
                        {msg => <div style={{ color: 'red' }}>{msg}</div>}
                    </ErrorMessage>

                    <label className={style.label} htmlFor="genre">Genre:
                        <Field as="select" name="genre" className={style.genreList} >
                            <option >Please choose Genre...</option>
                            <option className={style.genreListItem} value="Action and Adventure">Action and Adventure</option>
                            <option className={style.genreListItem} value="Classics" >Classics</option>
                            <option className={style.genreListItem} value="Comic Book or Graphic Novel">Comic Book or Graphic Novel</option>
                            <option className={style.genreListItem} value="Detective and Mystery">Detective and Mystery</option>
                            <option className={style.genreListItem} value="Fantasy">Fantasy</option>
                            <option className={style.genreListItem} value="Science">Science</option>
                            <option className={style.genreListItem} value="Horror">Horror</option>
                            <option className={style.genreListItem} value="Literary Fiction">Literary Fiction</option>
                        </Field>
                    </label>
                    <ErrorMessage name='genre' className={style.errorMessage} >
                        {msg => <div style={{ color: 'red' }}>{msg}</div>}
                    </ErrorMessage>

                    <label className={style.input} className={style.label} htmlFor="review">Review:
                        <Field as="textarea" name="review" />
                    </label>
                    <ErrorMessage name='review' className={style.errorMessage} >
                        {msg => <div style={{ color: 'red' }}>{msg}</div>}
                    </ErrorMessage>

                    <input type="submit" value="Edit" />
                </Form>
            </div>
        </Formik>

    );
}

export default EditBook;