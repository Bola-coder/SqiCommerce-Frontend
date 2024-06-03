import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import AppButton from "../components/AppButton";
import { useAuth } from "../contexts/AuthContext";
import UseShowPassword from "../hooks/UseShowPassword";
const Signup = () => {
  const { signup } = useAuth();
  const { showPassword, handleShowPassword } = UseShowPassword();

  const formik = useFormik({
    // Initial values
    initialValues: {
      email: "",
      firstname: "",
      lastname: "",
      password: "",
    },
    // form Validations
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      firstname: Yup.string().required("Firstname is required"),
      lastname: Yup.string().required("Lastname is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Minimum of 6 characters"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      await signup(values);
    },
  });

  return (
    <div className="w-[80%] max-w-[500px] mx-[auto] mt-[5%] shadow-2xl p-3 bg-blue-200">
      <div className="px-5">
        <h2 className="text-black text-xl font-bold">Welcome to Sqicommerce</h2>
        <p className="text-neutral-700 text-sm font-medium ">
          Please sign up to get started
        </p>
      </div>
      <div className="p-5">
        <label
          htmlFor="email"
          className="block text-xl text-black font-semibold"
        >
          Email
        </label>
        <input
          className="border-2 border-blue-500 rounded-lg focus:outline-none w-[100%] p-2 mt-2"
          type="email"
          placeholder="johndoe@gmail.com"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500">{formik.errors.email}</p>
        )}
      </div>
      <div className="p-5">
        <label
          htmlFor="firstname"
          className="block text-xl text-black font-semibold"
        >
          Firstname
        </label>
        <input
          className="border-2 border-blue-500 rounded-lg focus:outline-none w-[100%] p-2 mt-2"
          type="text"
          placeholder="John"
          name="firstname"
          value={formik.values.firstname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.firstname && formik.errors.firstname && (
          <p className="text-red-500">{formik.errors.firstname}</p>
        )}
      </div>
      <div className="p-5">
        <label
          htmlFor="lastname"
          className="block text-xl text-black font-semibold"
        >
          Lastname
        </label>
        <input
          className="border-2 border-blue-500 rounded-lg focus:outline-none w-[100%] p-2 mt-2"
          type="text"
          placeholder="Doe"
          name="lastname"
          value={formik.values.lastname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.lastname && formik.errors.lastname && (
          <p className="text-red-500">{formik.errors.lastname}</p>
        )}
      </div>
      <div className="p-5 relative">
        <label
          htmlFor="password"
          className="block text-xl text-black font-semibold"
        >
          Password
        </label>
        <input
          className="border-2 border-blue-500 rounded-lg focus:outline-none w-[100%] p-2 mt-2"
          type={`${showPassword ? "text" : "password"}`}
          placeholder="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <span className="absolute top-[70px] right-[30px] cursor-pointer">
          {showPassword ? (
            <FaEyeSlash color="grey" size={20} onClick={handleShowPassword} />
          ) : (
            <FaEye color="grey" size={20} onClick={handleShowPassword} />
          )}
        </span>
        {formik.touched.password && formik.errors.password && (
          <p className="text-red-500">{formik.errors.password}</p>
        )}
      </div>
      <div className="p-5 flex justify-end ">
        <div className="w-[200px]">
          <AppButton
            text={"Signup"}
            bgColor={"blue"}
            textColor={"#FFF"}
            handleClick={formik.handleSubmit}
            type={"submit"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
