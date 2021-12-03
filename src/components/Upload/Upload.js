import { storage } from '../../firebase-config.js';
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

function Upload() {

    const [progress, setProgress] = useState(0);

    const onSubmitUpload = (e) => {
        e.preventDefault();
        let file = e.target[0].files[0];
        uploadFiles(file);
    };

    const uploadFiles = (file) => {

        if (!file) { return };
        const storageRef = ref(storage, `/books/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

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

    const onSuccessUploadNotify = () => toast.success("File uploaded successfully !",{
        position: toast.POSITION.TOP_CENTER
      });

      const onErrorUploadNotify = () => toast.error("Upload fail !",{
        position: toast.POSITION.TOP_CENTER
      });


    return (
        <div>
            <form onSubmit={onSubmitUpload}>
                
                <input type="file" />
                <input type="submit" value="Upload" />
            </form>
            <h3>Uploaded: {progress} %</h3>
        </div>
    )
}

export default Upload;