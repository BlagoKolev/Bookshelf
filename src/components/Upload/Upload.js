import style from './Upload.module.css';
import { db, storage } from '../../firebase-config.js';
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import { useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { addDoc, collection } from '@firebase/firestore';
import { withRouter } from 'react-router-dom';
import { UserContext } from '../../Helper/Context';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';


function Upload({ history }) {

    const [progress, setProgress] = useState(0);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [review, setReview] = useState("");
    const [bookCoverUrl, setbookCoverUrl] = useState("");
    const [genre, setGenre] = useState("");
    const [file, setFile] = useState({});

    const context = useContext(UserContext);
    let user = context.user;

    console.log(user);

    const booksRef = collection(db, "Books");


    //Function to submit all data to Database (Firebase);
    const onSubmit = (values) => {
        //e.preventDefault();
        let fileToUpload = file;
        uploadFile(fileToUpload, values);
    };


    //Function to upload *.pdf book file to Firebase Storage;
    const uploadFile = (fileToUpload, values) => {

        if (!fileToUpload) { return };

        const storageRef = ref(storage, `/books/${fileToUpload.name}`);
        const uploadTask = uploadBytesResumable(storageRef, fileToUpload);

        uploadTask.on("state_changed", (snapshot) => {
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

            setProgress(prog);
        },
            (error) => onErrorUploadNotify(),
            () => {
                getDownloadURL(uploadTask.snapshot.ref) // Get download URL for uploaded file
                    .then((url) => {           //Create a book object and upload it to a Firebase
                        let newBook = {
                            title: values.title,
                            author: values.author,
                            review: values.review,
                            bookCoverUrl: values.bookCoverUrl,
                            genre,
                            downloadFileUrl: url,
                            creatorId: user.uid,
                            creator: user.email,
                            likedByUsers: [],
                            unlikedByUsers: []
                        };

                        addDoc(booksRef, newBook);
                    })
                    .then(resp => onSuccessUploadNotify())
                    .then(resp => history.push("/myBooks"));
            }
        );
    };

    toast.configure();

    const onSuccessUploadNotify = () => toast.success("File uploaded successfully !", {
        position: toast.POSITION.TOP_CENTER
    });

    const onErrorUploadNotify = () => toast.error("Upload fail !", {
        position: toast.POSITION.TOP_CENTER
    });

    const getFile = (e) => {
        setFile(e.target.files[0])
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required.'),
        author: Yup.string().required('Author is required.'),
        bookCoverUrl: Yup.string().required('Book cover Url is required.'),
        review: Yup.string().required('Review is required.'),
        genre: Yup.string().required('Genre is required'),
    });

    const initialValues = {
        title: '',
        author: '',
        bookCoverUrl: '',
        review: '',
        genre: '',
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            <div className={style.uploadContainer}>
                <Form className={style.form}>
                    <h1 className={style.header}>Upload your new book</h1>
                    <div className={style.fields}>
                        <div className={style.firstPart}>
                            <label className={style.label} htmlFor='title'>Title:
                                <Field name="title" type="text" className={style.input}  />
                            </label>
                            <ErrorMessage name='title' className={style.errorMessage} >
                                {msg => <div style={{ color: 'red' }}>{msg}</div>}
                            </ErrorMessage>

                            <label className={style.label}>Author:
                                <Field name="author" type="text" className={style.input} />
                            </label>
                            <ErrorMessage name='author' className={style.errorMessage} >
                                {msg => <div style={{ color: 'red' }}>{msg}</div>}
                            </ErrorMessage>

                            <label className={style.label}>Book cover URL:
                                <Field name="bookCoverUrl" type="text" className={style.input} />
                            </label>
                            <ErrorMessage name='bookCoverUrl' className={style.errorMessage} >
                                {msg => <div style={{ color: 'red' }}>{msg}</div>}
                            </ErrorMessage>

                            <label className={style.label}>Genre:
                                <Field as="select" name="genre" className={style.genreList} htmlFor="genre">
                                    <option>Please choose Genre...</option>
                                    <option className={style.genreListItem} value="Action and Adventure">Action and Adventure</option>
                                    <option className={style.genreListItem} value="Classics">Classics</option>
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
                        </div>

                        <div className={style.secondPart}>
                            <label className={style.label}>Review:
                                <Field as="textArea" name="review" rows="9" className={style.input} />
                            </label>
                            <ErrorMessage name='review' className={style.errorMessage} >
                                {msg => <div style={{ color: 'red' }}>{msg}</div>}
                            </ErrorMessage>

                            <input name="file" type="file" className={style.fileField} onChange={getFile} accept=".pdf,.doc" />
                        </div>
                    </div>
                    <input type="submit" value="Upload" className={style.uploadBtn} />
                    {/* <h3>Uploaded: {progress} %</h3> */}
                    <progress className={style.progressBar} value={progress} max={100}> {progress} </progress>
                </Form>
            </div>
        </Formik>
    )
}

export default withRouter(Upload);
