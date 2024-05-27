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
  phoneNumber: Yup.string().required("Please enter Phone Number"),
  password: Yup.string()
    .min(8, "Please enter a strong password")
    .required("Please enter Password"),
  confirmPassword: Yup.string()
    .required("Please enter Confirm Password")
    .oneOf([Yup.ref("password"), "", "Password must match"]),
  rollNo: Yup.string().required("Please enter Roll number"),
  dob: Yup.string().nullable(),
  gender: Yup.string().required("Please select Gender"),
  course:Yup.string().required("Please select Course"),
  maritalStatus: Yup.string().required("Please select Marital status"),
  address: Yup.string().required("Please enter Address"),
  city: Yup.string().required("Please enter City"),
  state: Yup.string().required("Please enter State"),
  joiningDate: Yup.string().required("Please select Joining date"),
  graduationDate: Yup.string().nullable(),
});

export const jobSchema = Yup.object({
  universityId: Yup.string().required("Please enter University ID"),
  title: Yup.string().required("Please enter Title"),
  description: Yup.string().required("Please enter Description"),
  deadline: Yup.string().required("Please select Deadline"),
  document: Yup.string().required("Please enter Document"),
  courses: Yup.array().required("Please select at least one course"),
});

export const updateStudentSchema = Yup.object({
  firstName: Yup.string().required("Please enter First Name"),
  lastName: Yup.string().required("Please enter Last Name"),
  email: Yup.string().email().required("Please enter Email"),
  phoneNumber: Yup.string().required("Please enter Phone Number"),
  password: Yup.string()
    .min(8, "Please enter a strong password").nullable(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), "", "Password must match"]).nullable(),
  rollNo: Yup.string().required("Please enter Roll number"),
  dob: Yup.string().nullable(),
  gender: Yup.string().required("Please select Gender"),
  maritalStatus: Yup.string().required("Please select Marital status"),
  address: Yup.string().required("Please enter Address"),
  city: Yup.string().required("Please enter City"),
  state: Yup.string().required("Please enter State"),
  joiningDate: Yup.string().required("Please select Joining date"),
  graduationDate: Yup.string().nullable(),
});

export const jobApplicationSchema=Yup.object({
  resume:Yup.string().required("Please upload your Resume")
})

export const changePasswordSchema=Yup.object({
  currentPassword:Yup.string().required("Please enter Current Password"),
  newPassword:Yup.string().required("Please enter New Password").min(8,"Please enter a strong password"),
  confirmPassword:Yup.string().required("Please enter Confirm Password")
  .oneOf([Yup.ref("newPassword"), "", "Password and Confirm Password must match"]),
})

export const forgotPasswordSchema=Yup.object({
  email:Yup.string().required("Please enter Email")
})

export const resetPasswordSchema=Yup.object({
  newPassword:Yup.string().required("Please enter New Password").min(8,"Please enter a strong password"),
  confirmPassword:Yup.string().required("Please enter Confirm Password")
  .oneOf([Yup.ref("newPassword"), "", "Password and Confirm Password must match"]),
})

export const contactUsSchema = Yup.object({
  email:Yup.string().required("Please enter First Name"),
  firstName:Yup.string().required("Please enter Last Name"),
  lastName:Yup.string().required("Please enter Email address"),
  contact:Yup.number().required("Please enter phone number"),
  message:Yup.string().required("Please enter message")
})