import * as Yup from 'yup';

export const loginSchema = Yup.object({
    email:Yup.string().email().required("Please enter Email"),
    password:Yup.string().min(8,"Please enter a strong password").required("Please enter Password"),
    confirmPassword:Yup.string().required("Please enter Confirm Password").oneOf([Yup.ref("password"),"","Password must match"]),
})

export const signUpSchema = Yup.object({
    firstName:Yup.string().required("Please enter First Name"),
    lastName:Yup.string().required("Please enter Last Name"),
    email:Yup.string().email().required("Please enter Email"),
    password:Yup.string().min(8,"Please enter a strong password").required("Please enter Password"),
    confirmPassword:Yup.string().required("Please enter Confirm Password").oneOf([Yup.ref("password"),"","Password must match"]),
    address:Yup.string().required("Please enter Address"),
    website:Yup.string().required("Please enter Website"),
    image:Yup.string().required("Please select an Image"),
    role:Yup.string().required("Please select a Role"),
})