import { object, string } from "yup";

export const loginValidationSchema = () => {
  return object({
    email: string().email().required("Email is required"),
    password: string().required("Password is required"),
  });
};

export const signupValidationSchema = () => {
  return object({
    firstName: string().required("First Name is required"),
    lastName: string().required("Last Name is required"),
    email: string().email().required("Email is required"),
    password: string().required("Password is required"),
  });
};
