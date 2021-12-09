import * as yup from 'yup';

 export const registerSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(3).max(10).required(),
    confirmPassword: yup.string().min(3).max(10).required()
});