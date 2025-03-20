"use client";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import InputField from "@/components/custom/InputField";
import Image from "next/image";
import Button from "@/components/custom/Button";
import * as yup from "yup";
import { useFormik } from "formik";
import { login } from "@/redux/authSlice";
import Link from "next/link";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format.")
    .required("Email is required."),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters.")
    .required("Password is required."),
});

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(login(values));

      if (localStorage.getItem("loggedIn") === "true") {
        router.push("/");
      } else {
        alert("Invalid credentials! Please try again.");
      }
    },
  });

  return (
    <section className="flex items-center">
      {/* Left Side: Image Section */}
      <div className="lg:w-3/5 lg:block hidden">
        <div className="relative h-screen">
          {/* Shadow Overlay */}
          <div className="absolute inset-0 bg-binge-peach opacity-5 z-10" />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFDAB9] to-transparent mix-blend-multiply z-20" />

          {/* Background Image */}
          <Image
            src="/images/login-image.jpg"
            alt="image"
            fill
            className="object-cover object-center"
          />

          {/* Logo */}
          <Image
            src="/images/logo-full.png"
            alt="Logo"
            width={145}
            height={39}
            className="z-50 relative top-10 left-10"
          />
        </div>
      </div>

      {/* Right Side: Form Section */}
      <div className="lg:w-2/5 w-full flex flex-col justify-center mx-20">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-2 px-6"
        >
          <div className="flex flex-col items-center gap-4">
            <InputField
              type="email"
              placeholder="Email"
              {...formik.getFieldProps("email")}
              errorMessage={formik?.touched?.email && formik?.errors?.email}
              floatingError
            />
            <InputField
              type="password"
              placeholder="Password"
              {...formik.getFieldProps("password")}
              errorMessage={
                formik?.touched?.password && formik?.errors?.password
              }
              floatingError
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input type="checkbox" className="accent-warm-black" />
              <div className="text-display-1">Remember me</div>
            </div>

            <Link href="/auth/forgotPassword">
              <div className="text-display-1 cursor-pointer">
                Forgot password?
              </div>
            </Link>
          </div>

          {/* Submit Button */}
          <div className="mt-4 flex flex-col items-center gap-4">
            <Button text="Login" variant="fill" />

            <button className=" px-3 py-2 flex items-center justify-center gap-2  w-full border border-neutral-8 text-neutral-8 cursor-pointer">
              <Image
                src="/icons/Google.png"
                alt="google"
                width={18}
                height={18}
              />

              <span className="text-display-2 font-semibold">
                Login with Google
              </span>
            </button>
          </div>
        </form>

        <div className="mt-4 text-display-2 font-semibold text-neutral-6 mr-2 px-6">
          <span className="">New user? </span>{" "}
          <Link href="/auth/register">
            <span className="text-blue-400 cursor-pointer">Register here</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
