import style from './Upload.module.css';
import { db, storage } from '../../firebase-config.js';
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { addDoc, collection } from '@firebase/firestore';
import { UserContext } from '../../Helper/Context.js'

function Upload(props) {

    const [progress, setProgress] = useState(0);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [review, setReview] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [genre, setGenre] = useState("");
    const [downloadFileUrl, setDownloadFileUrl] = useState("");
    const [file, setFile] = useState({});

    console.log(props.currentUser);

    const booksRef = collection(db, "users");


    //Function to submit all data to Database (Firebase);
    const onSubmitUpload = (e) => {
        e.preventDefault();
        let fileToUpload = file;
        uploadFiles(fileToUpload);
        uploadBookInfo();
    };

    //Function to upload book info to Firebase firestore;
    const uploadBookInfo = async () => {
        let newBook = {
            title,
            author,
            review,
            imgUrl,
            genre,
            downloadFileUrl,
            creatorId: props.currentUser?.uid,
            creator: props.currentUser.email
        };

        await addDoc(booksRef, newBook)
    };

    //Function to upload *.pdf book file to Firebase Storage;
    const uploadFiles = (fileToUpload) => {

        if (!fileToUpload) { return };
        const storageRef = ref(storage, `/books/${fileToUpload.name}`);
        const uploadTask = uploadBytesResumable(storageRef, fileToUpload);

        uploadTask.on("state_changed", (snapshot) => {
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

            setProgress(prog);
        },
            (error) => onErrorUploadNotify(),
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((url) => setDownloadFileUrl(url))
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
            <h1>Upload your new book</h1>
            <form onSubmit={onSubmitUpload} className={style.form}>
                <label className={style.label}>Title
                    <input type="text" className={style.input} onChange={(e) => { setTitle(e.target.value) }} />
                </label>
                <label className={style.label}>Author
                    <input type="text" className={style.input} onChange={(e) => { setAuthor(e.target.value) }} />
                </label>
                <label className={style.label}>Review
                    <textarea type="textarea" rows="10" className={style.input} onChange={(e) => { setReview(e.target.value) }} />
                </label>
                <label className={style.label}>Book cover URL
                    <input type="text" className={style.input} onChange={(e) => { setImgUrl(e.target.value) }} />
                </label>
                <label>Genre:
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
                <input type="file" className={style.fileField} onChange={getFile} />
                <input type="submit" value="Upload" className={style.uploadBtn} />
            </form>
            <h3>Uploaded: {progress} %</h3>
            <progress value={0} max={100}></progress>
        </div>
    )
}

export default Upload;