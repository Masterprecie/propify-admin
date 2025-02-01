import Loader from "@/components/Loader";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { alert } from "@/utils/alert";
import { loginValidationSchema } from "@/utils/validations";
import { useLoginMutation } from "@/features/auth/api";
import { setCredentials } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { LoginPayload } from "@/features/auth/interfaces";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const [loginUser, { isLoading }] = useLoginMutation();

  const registerUser = (values: LoginPayload) => {
    console.log(values);

    loginUser(values)
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res?.error) {
          //   alert("error", res.error.message);
          console.log(res?.message);
          return;
        } else {
          dispatch(
            setCredentials({
              user: res.data.user,
              accessToken: res.data.accessToken,
              refreshToken: res.data.refreshToken,
              isAuthenticated: true,
            })
          );
        }
        resetForm();
        alert({
          type: "success",
          message: "Registration successfully",
          timer: 2000,
          cb: () => navigate(`/dashboard/home`),
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

  const { errors, touched, handleSubmit, resetForm, getFieldProps } = useFormik(
    {
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginValidationSchema,
      onSubmit: (values) => registerUser(values),
    }
  );
  return (
    <div className="bg-[url(./src/assets/images/authBg.jpg)] bg-cover bg-no-repeat min-h-screen flex flex-col justify-center items-center">
      <div className="relative flex flex-col justify-center items-center border-8 border-white rounded-3xl mx-auto w-[1000px] p-10">
        <div className="bg-white rounded-2xl shadow-lg w-[400px] p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                {...getFieldProps("email")}
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
                {...getFieldProps("password")}
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
                {isLoading ? <Loader /> : "Login"}
              </button>
            </div>
          </form>
          <p className="text-xs text-center mt-4">
            Already have an account?{" "}
            <Link to="/signup" className="text-blue-500">
              Signup
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

export default Login;
