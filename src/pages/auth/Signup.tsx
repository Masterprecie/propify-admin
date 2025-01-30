import Loader from "@/components/Loader";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useRegisterMutation } from "@/features/auth/api";
import { alert } from "@/utils/alert";
import { signupValidationSchema } from "@/utils/validations";

const Signup = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const [register, { isLoading }] = useRegisterMutation();

  const registerUser = (values) => {
    console.log(values);
    const payload = {
      ...values,
      role: "admin",
    };
    console.log(payload);

    register(payload)
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res?.error) {
          //   alert("error", res.error.message);
          console.log(res?.message);
          return;
        }
        resetForm();
        alert({
          type: "success",
          message: "Registration successfully",
          timer: 2000,
          cb: () => navigate(`/login`),
        });
      })
      .catch((err) => {
        console.log(err);
        alert({
          type: "error",
          message: err?.data?.message || "An error occurred",
          timer: 3000,
        });
      });
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: signupValidationSchema,
    onSubmit: (values) => registerUser(values),
  });
  return (
    <div className="bg-[url(./src/assets/images/authBg.jpg)] bg-cover bg-no-repeat min-h-screen flex flex-col justify-center items-center">
      <div className="relative flex flex-col justify-center items-center border-8 border-white rounded-3xl mx-auto w-[1000px] p-10">
        <div className="bg-white rounded-2xl shadow-lg w-[400px] p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                name="firstName"
                type="text"
                id="username"
                className="w-full outline-none text-sm bg-gray-200 px-3 py-2 rounded-2xl"
                placeholder="First Name"
              />
              {errors.firstName && touched.firstName && (
                <div className="text-red-500 text-xs">{errors.firstName}</div>
              )}
            </div>
            <div className="mb-4">
              <input
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                name="lastName"
                type="text"
                id="lastName"
                className="w-full outline-none text-sm bg-gray-200 px-3 py-2 rounded-2xl"
                placeholder="Last Name"
              />
              {errors.lastName && touched.lastName && (
                <div className="text-red-500 text-xs">{errors.lastName}</div>
              )}
            </div>
            <div className="mb-4">
              <input
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                name="email"
                type="email"
                id="email"
                className="w-full outline-none text-sm bg-gray-200 px-3 py-2 rounded-2xl"
                placeholder="Email"
              />
              {errors.email && touched.email && (
                <div className="text-red-500 text-xs">{errors.email}</div>
              )}
            </div>
            <div className="mb-4 relative">
              <input
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                name="password"
                type={passwordVisible ? "text" : "password"}
                id="password"
                className="w-full outline-none text-sm bg-gray-200 px-3 py-2 rounded-2xl"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute text-xs cursor-pointer text-gray-800 right-3 top-3"
              >
                {passwordVisible ? "Hide" : "Show"}
              </button>
              {errors.password && touched.password && (
                <div className="text-red-500 text-xs">{errors.password}</div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl w-full cursor-pointer "
              >
                {isLoading ? <Loader /> : "Sign Up"}
              </button>
            </div>
          </form>
          <p className="text-xs text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </div>

        <div className="text-white absolute left-10 bottom-3">
          <h1 className="font-bold text-2xl">Propify</h1>
          <p className="font-medium text-sm">
            ©{new Date().getFullYear()} Propify. All rights reserved. <br />
            Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
