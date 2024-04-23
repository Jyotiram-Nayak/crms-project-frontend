import * as Yup from 'yup';

export const loginSchema = Yup.object({
    Email:Yup.string().email().required("Please enter Email"),
    Password:Yup.string().min(8,"Please enter a strong password").required("Please enter Password"),
})

export const signUpSchema = Yup.object({
    FirstName:Yup.string().required("Please enter First Name"),
    LastName:Yup.string().required("Please enter Last Name"),
    Email:Yup.string().email().required("Please enter Email"),
    Password:Yup.string().min(8,"Please enter a strong password").required("Please enter Password"),
    ConfirmPassword:Yup.string().required("Please enter Confirm Password").oneOf([Yup.ref("Password"),"","Password must match"]),
    Address:Yup.string().required("Please enter Address"),
    // Website:Yup.string().required("Please enter Website"),
    // image:Yup.string().required("Please select an Image"),
    Role:Yup.string().required("Please select a Role"),
})