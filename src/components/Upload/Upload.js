import { storage } from '../../firebase-config.js';
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import style from './Upload.module.css';

function Upload() {

    const [progress, setProgress] = useState(0);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [review, setReview] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [file, setFile] = useState({});

    const onSubmitUpload = (e) => {
        e.preventDefault();
        let fileToUpload = file;
        uploadFiles(fileToUpload);
    };

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
                    //.then(url => console.log(url))
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
            <h1>Upload your new book here</h1>
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
                <input type="file" className={style.fileField} onChange={getFile} />
                <input type="submit" value="Upload" className={style.uploadBtn} />
            </form>
            <h3>Uploaded: {progress} %</h3>
        </div>
    )
}

export default Upload;