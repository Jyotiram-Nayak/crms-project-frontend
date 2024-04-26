import * as Yup from 'yup';

export const loginSchema = Yup.object({
    email:Yup.string().email().required("Please enter Email"),
    password:Yup.string().min(8,"Please enter a strong password").required("Please enter Password"),
})

export const signUpSchema = Yup.object({
    FirstName:Yup.string().required("Please enter First Name"),
    LastName:Yup.string().required("Please enter Last Name"),
    Email:Yup.string().email().required("Please enter Email"),
    Password:Yup.string().min(8,"Please enter a strong password").required("Please enter Password"),
    ConfirmPassword:Yup.string().required("Please enter Confirm Password").oneOf([Yup.ref("Password"),"","Password must match"]),
    Address:Yup.string().required("Please enter Address"),
    Website:Yup.string().nullable(),
    image:Yup.string().nullable(),
    Role:Yup.string().required("Please select a Role"),
})

export const studentSchema = Yup.object({
    firstName: Yup.string().required("Please enter First Name"),
    lastName: Yup.string().required("Please enter Last Name"),
    email: Yup.string().email().required("Please enter Email"),
    password: Yup.string().min(8,"Please enter a strong password").required("Please enter Password"),
    confirmPassword: Yup.string().required("Please enter Confirm Password").oneOf([Yup.ref("password"),"","Password must match"]),
    rollNo: Yup.string().required('Please enter Roll number'),
    // dob: Yup.string().nullable(),
    gender: Yup.string().required('Please select Gender'),
    maritalStatus: Yup.string().required('Please select Marital status'),
    address: Yup.string().required('Please enter Address'),
    // joiningDate: Yup.string().required('Please select Joining date'),
    // graduationDate: Yup.string().nullable()
});
