import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email().required("Please enter Email"),
  password: Yup.string()
    .min(8, "Please enter a strong password")
    .required("Please enter Password"),
});

export const signUpSchema = Yup.object({
  firstName: Yup.string().required("Please enter First Name"),
  lastName: Yup.string().required("Please enter Last Name"),
  email: Yup.string().email().required("Please enter Email"),
  phoneNumber: Yup.string().required("Please enter Phone Number"),
  password: Yup.string()
    .min(8, "Please enter a strong password")
    .required("Please enter Password"),
  confirmPassword: Yup.string()
    .required("Please enter Confirm Password")
    .oneOf([Yup.ref("password"), "", "Password must match"]),
  address: Yup.string().required("Please enter Address"),
  city: Yup.string().required("Please enter Address"),
  state: Yup.string().required("Please enter Address"),
  website: Yup.string().nullable(),
  bio: Yup.string().nullable(),
  image: Yup.string().nullable(),
  role: Yup.string().required("Please select a Role"),
});

export const updateUserSchema = Yup.object({
  firstName: Yup.string().required("Please enter First Name"),
  lastName: Yup.string().required("Please enter Last Name"),
  email: Yup.string().email().required("Please enter Email"),
  address: Yup.string().required("Please enter Address"),
  city: Yup.string().required("Please enter Address"),
  state: Yup.string().required("Please enter Address"),
  website: Yup.string().nullable(),
  bio: Yup.string().nullable(),
  image: Yup.string().nullable(),
});

export const studentSchema = Yup.object({
  firstName: Yup.string().required("Please enter First Name"),
  lastName: Yup.string().required("Please enter Last Name"),
  email: Yup.string().email().required("Please enter Email"),
  password: Yup.string()
    .min(8, "Please enter a strong password")
    .required("Please enter Password"),
  confirmPassword: Yup.string()
    .required("Please enter Confirm Password")
    .oneOf([Yup.ref("password"), "", "Password must match"]),
  rollNo: Yup.string().required("Please enter Roll number"),
  dob: Yup.string().nullable(),
  gender: Yup.string().required("Please select Gender"),
  maritalStatus: Yup.string().required("Please select Marital status"),
  address: Yup.string().required("Please enter Address"),
  joiningDate: Yup.string().required("Please select Joining date"),
  graduationDate: Yup.string().nullable(),
});

export const jobSchema = Yup.object({
  universityId: Yup.string().required("Please enter University ID"),
  title: Yup.string().required("Please enter Title"),
  description: Yup.string().required("Please enter Description"),
  deadline: Yup.string().required("Please enter Deadline"),
  document: Yup.string().required("Please enter Document"),
});
