import * as yup from 'yup';

 export const registerSchema = yup.object().shape({
    email: yup.string().email().required('Email is required.'),
    password: yup.string().min(3, 'Password must be more than 3 symbols.').max(15, 'Password must be less than 15 symbols').required('Password is required.'),
    confirmPassword: yup.string().oneOf([yup.ref("password")], null).min(3).max(10).required('ConfirmP assword is required.')
});