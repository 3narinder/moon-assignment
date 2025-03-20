"use client";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Country, State, City } from "country-state-city";
import InputField from "@/components/custom/InputField";
import Image from "next/image";
import Button from "@/components/custom/Button";
import * as yup from "yup";
import { useFormik } from "formik";
import SelectField from "@/components/custom/SelectFiled";
import { register } from "@/redux/authSlice";

const validationSchema = yup.object({
  firstName: yup.string().required("First name is required."),
  lastName: yup.string().required("Last name is required."),
  email: yup
    .string()
    .email("Invalid email format.")
    .required("Email is required."),
  country: yup.string().required("Please select a country."),
  state: yup.string().required("Please select a state."),
  city: yup.string().required("Please select a city."),
  pincode: yup
    .string()
    .matches(/\d{5,6}/, "Invalid pincode.")
    .required("Pincode is required."),
  isdCode: yup.string().required("Please select a country code."),
  contactNumber: yup
    .string()
    .matches(/\d{10}/, "Invalid contact number.")
    .required("Contact number is required."),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters.")
    .required("Password is required."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match.")
    .required("Confirm password is required."),
});

const Register = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      country: "",
      state: "",
      city: "",
      pincode: "",
      isdCode: "",
      contactNumber: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(register(values));
      router.push("/auth/login");
    },
  });

  return (
    <section className="flex items-center">
      <div className="lg:w-3/5 lg:block hidden">
        <div className="relative h-screen">
          <div className="absolute inset-0 bg-binge-peach opacity-5 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFDAB9] to-transparent mix-blend-multiply z-20" />
          <Image
            src="/images/register_image.jpg"
            alt="image"
            fill
            className="object-cover object-center"
          />
          <Image
            src="/images/logo-full.png"
            alt="Logo"
            width={145}
            height={39}
            className="z-50 relative top-10 left-10"
          />
        </div>
      </div>

      <div className="lg:w-2/5 w-full flex flex-col justify-center mx-20">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-6 px-6"
        >
          <div className="w-full flex items-center gap-4">
            <InputField
              type="text"
              name="firstName"
              placeholder="First Name"
              {...formik.getFieldProps("firstName")}
              errorMessage={formik.touched.firstName && formik.errors.firstName}
              floatingError
            />
            <InputField
              type="text"
              name="lastName"
              placeholder="Last Name"
              {...formik.getFieldProps("lastName")}
              errorMessage={formik.touched.lastName && formik.errors.lastName}
              floatingError
            />
          </div>

          <InputField
            type="email"
            name="email"
            placeholder="Email"
            {...formik.getFieldProps("email")}
            errorMessage={formik.touched.email && formik.errors.email}
            floatingError
          />

          <div className="w-full flex items-center gap-4">
            <SelectField
              name="country"
              {...formik.getFieldProps("country")}
              errorMessage={formik.touched.country && formik.errors.country}
            >
              <option value="">Select Country</option>
              {Country.getAllCountries().map((c) => (
                <option key={c.isoCode} value={c.isoCode}>
                  {c.name}
                </option>
              ))}
            </SelectField>
            <SelectField
              name="state"
              {...formik.getFieldProps("state")}
              errorMessage={formik.touched.state && formik.errors.state}
              disabled={!formik.values.country}
            >
              <option value="">Select State</option>
              {State.getStatesOfCountry(formik.values.country).map((s) => (
                <option key={s.isoCode} value={s.isoCode}>
                  {s.name}
                </option>
              ))}
            </SelectField>
          </div>

          <div className="w-full flex items-center gap-4">
            <SelectField
              name="city"
              {...formik.getFieldProps("city")}
              errorMessage={formik.touched.city && formik.errors.city}
              disabled={!formik.values.state}
            >
              <option value="">Select City</option>
              {City.getCitiesOfState(
                formik.values.country,
                formik.values.state
              ).map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </SelectField>
            <InputField
              type="text"
              name="pincode"
              placeholder="Pincode"
              {...formik.getFieldProps("pincode")}
              errorMessage={formik.touched.pincode && formik.errors.pincode}
              floatingError
            />
          </div>

          <div className="w-full flex items-center gap-2">
            <SelectField
              name="isdCode"
              {...formik.getFieldProps("isdCode")}
              errorMessage={formik.touched.isdCode && formik.errors.isdCode}
            >
              <option value="">Select Code</option>
              {Country.getAllCountries().map((c) => (
                <option key={c.isoCode} value={c.phonecode}>
                  {c.name} (+{c.phonecode})
                </option>
              ))}
            </SelectField>
            <InputField
              type="text"
              name="contactNumber"
              placeholder="Contact Number"
              {...formik.getFieldProps("contactNumber")}
              errorMessage={
                formik.touched.contactNumber && formik.errors.contactNumber
              }
              floatingError
            />
          </div>

          <div className="w-full flex items-center gap-4">
            <InputField
              type="password"
              name="password"
              placeholder="Password"
              {...formik.getFieldProps("password")}
              errorMessage={formik.touched.password && formik.errors.password}
              floatingError
            />
            <InputField
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              {...formik.getFieldProps("confirmPassword")}
              errorMessage={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              floatingError
            />
          </div>

          <div className="mt-8 w-full flex items-center justify-center">
            <Button text="Register" fill />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
