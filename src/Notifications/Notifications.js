import { ToastContainer, toast } from 'react-toastify';

toast.configure();

export const onSuccessNotify = (notifyMessage) => toast.success(notifyMessage, {
    position: toast.POSITION.TOP_CENTER
});

export const onErrorNotify = (notifyMessage) => toast.error(notifyMessage, {
    position: toast.POSITION.TOP_CENTER
});


