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
    Website:Yup.string().nullable(),
    image:Yup.string().nullable(),
    Role:Yup.string().required("Please select a Role"),
})

export const studentSchema = Yup.object({
    FirstName:Yup.string().required("Please enter First Name"),
    LastName:Yup.string().required("Please enter Last Name"),
    Email:Yup.string().email().required("Please enter Email"),
    Password:Yup.string().min(8,"Please enter a strong password").required("Please enter Password"),
    ConfirmPassword:Yup.string().required("Please enter Confirm Password").oneOf([Yup.ref("Password"),"","Password must match"]),
    RollNo: Yup.string().required('Please enter Roll number'),
    // Dob: Yup.string().nullable(),
    Gender: Yup.string().required('Please select Gender').oneOf(['Male', 'Female', 'Other']),
    MaritalStatus: Yup.string().required('Please select Marital status').oneOf(['Married', 'Unmarried']),
    Address: Yup.string().required('Please select Address'),
    // JoiningDate: Yup.string().required('Please select Joining date'),
    // GraduationDate: Yup.string().nullable()
  });