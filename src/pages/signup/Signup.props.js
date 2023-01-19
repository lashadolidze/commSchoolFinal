import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    fullname: Yup.string().required('Full name is a required field').min(1, 'Too Short!'),
    email: Yup.string().email('Invalid email').required(),
    password: Yup.string().required().min(6, 'Password is too short - should be 6 chars minimum.')
});

export const initialValues = {
    fullname: '',
    email: '',
    password: '',
};