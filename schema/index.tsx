import * as Yup from "yup";

const date = new Date();
const eighteenYearsAgo = new Date(date.getFullYear() - 18, date.getMonth(), date.getDate());

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
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  confirmPassword: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
    )
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
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Please enter Password"),
  confirmPassword: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .oneOf([Yup.ref("password"), "", "Password must match"]),
  rollNo: Yup.string().required("Please enter Roll number"),
  dob: Yup.date()
    .max(eighteenYearsAgo, 'Dob must be at least before 18 years old')
    .required('Date of Birth is required').nullable(),
  gender: Yup.string().required("Please select Gender"),
  course: Yup.string().required("Please select Course"),
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
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .nullable(),
  confirmPassword: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .nullable(),
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

export const jobApplicationSchema = Yup.object({
  resume: Yup.string().required("Please upload your Resume"),
});

export const changePasswordSchema = Yup.object({
  // currentPassword:Yup.string().required("Please enter Current Password"),
  currentPassword: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  newPassword: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  confirmPassword: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

export const forgotPasswordSchema = Yup.object({
  email: Yup.string().required("Please enter Email"),
});

export const resetPasswordSchema = Yup.object({
  newPassword: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .min(8, "Please enter a strong password"),
  confirmPassword: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
    ).oneOf([
      Yup.ref("newPassword"),
      "",
      "Password and Confirm Password must match",
    ]),
});

export const contactUsSchema = Yup.object({
  email: Yup.string().required("Please enter First Name"),
  firstName: Yup.string().required("Please enter Last Name"),
  lastName: Yup.string().required("Please enter Email address"),
  contact: Yup.number().required("Please enter phone number"),
  message: Yup.string().required("Please enter message"),
});
