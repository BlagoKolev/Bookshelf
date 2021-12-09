import style from './Upload.module.css';
import { db, storage } from '../../firebase-config.js';
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import { useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { addDoc, collection } from '@firebase/firestore';
import { withRouter } from 'react-router-dom';
import { UserContext } from '../../Helper/Context';


function Upload() {

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
    const onSubmitUpload = (e) => {
        e.preventDefault();
        let fileToUpload = file;
        uploadFile(fileToUpload);
    };


    //Function to upload *.pdf book file to Firebase Storage;
    const uploadFile = (fileToUpload) => {

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
                            title,
                            author,
                            review,
                            bookCoverUrl,
                            genre,
                            downloadFileUrl: url,
                            creatorId: user.uid,
                            creator: user.email
                        };

                        addDoc(booksRef, newBook);
                    })
                    .then(resp => onSuccessUploadNotify());
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
    }

    return (
        <div className={style.uploadContainer}>
            <form onSubmit={onSubmitUpload} className={style.form}>
            <h1 className={style.header}>Upload your new book</h1>
               <div className={style.fields}>
               <div className={style.firstPart}>
                    <label className={style.label}>Title:
                        <input type="text" className={style.input} onChange={(e) => { setTitle(e.target.value) }} />
                    </label>
                    <label className={style.label}>Author:
                        <input type="text" className={style.input} onChange={(e) => { setAuthor(e.target.value) }} />
                    </label>

                    <label className={style.label}>Book cover URL:
                        <input type="text" className={style.input} onChange={(e) => { setbookCoverUrl(e.target.value) }} />
                    </label>
                    <label className={style.label}>Genre:
                        <select className={style.genreList} onChange={(e) => { setGenre(e.target.value); }}>
                            <option>Please choose Genre...</option>
                            <option className={style.genreListItem} value="Action and Adventure">Action and Adventure</option>
                            <option className={style.genreListItem} value="Classics">Classics</option>
                            <option className={style.genreListItem} value="Comic Book or Graphic Novel">Comic Book or Graphic Novel</option>
                            <option className={style.genreListItem} value="Detective and Mystery">Detective and Mystery</option>
                            <option className={style.genreListItem} value="Fantasy">Fantasy</option>
                            <option className={style.genreListItem} value="Science">Science</option>
                            <option className={style.genreListItem} value="Horror">Horror</option>
                            <option className={style.genreListItem} value="Literary Fiction">Literary Fiction</option>
                        </select>
                    </label>
                </div>
                <div className={style.secondPart}>
                    <label className={style.label}>Review:
                        <textarea type="textarea" rows="9" className={style.input} onChange={(e) => { setReview(e.target.value) }} />
                    </label>
                    <input type="file" className={style.fileField} onChange={getFile} />
                </div>
               </div>
                <input type="submit" value="Upload" className={style.uploadBtn} />
                {/* <h3>Uploaded: {progress} %</h3> */}
               <progress className={style.progressBar} value={0} max={100} /> 
            </form>
        </div>
    )
}

export default withRouter(Upload);
